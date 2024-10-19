import React, { useEffect, useMemo, useState } from 'react'
import { Cache, uuid as getUuid } from '@ambilight-taro/core'
import { root } from '../components/bem'
import { AlPageViewProps } from '../components/view/type'

export interface AlInteractControllerRenderDetail {
  /**
   * render react element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FunctionComponent<any> | React.ComponentClass<any>
  /**
   * component props
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  /**
   * target interact controller
   */
  targetId?: string
}

export interface InQueueRenderDetail extends AlInteractControllerRenderDetail {
  /**
   * render node id
   */
  id: string
}

export type AlInteractControllerRenderFunction = (
  detail: AlInteractControllerRenderDetail,
) => {
  /**
   * change props（shallow coverage merge）
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeProps: (newProps: any) => void
  /**
   * remove current node
   * @returns void
   */
  remove: () => void
}

type Observer = (queue: InQueueRenderDetail[]) => void

interface Controller {
  /**
   * user set id
   */
  id?: string
  /**
   * system set uuid
   */
  uuid: string
  queue: InQueueRenderDetail[]
  observer: Observer
}

interface ErrorRender {
  detail: AlInteractControllerRenderDetail
  removeRef: {
    current: () => void
  }
  changePropsRef: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current: (newProps: any) => void
  }
  sort: number
}

const PageShareCacheKey = `${root.className}/exist`
const AppShareCacheKey = root.className

const cache = Cache.app.getOrCreate(AppShareCacheKey, {
  controller: [] as Controller[],
  errorRender: new Map<string, ErrorRender>(),
  errorRenderSortCounter: 0,
})

export const getControllerByUuid = (uuid: string) => {
  return cache.controller.find((item) => item.uuid === uuid)!
}

export const getControllerById = (id: string) => {
  return cache.controller.find((item) => item.id === id)!
}

export const changeControllerId = (uuid: string, id: string) => {
  const controller = getControllerByUuid(uuid)
  controller.id = id
  // try to resolve error render in this case
  resolveErrorRender(id)
}

const removeController = (uuid: string) => {
  const matchIndex = cache.controller.findIndex((item) => item.uuid === uuid)
  if (matchIndex >= 0) {
    cache.controller.splice(matchIndex, 1)
  }
}

const resolveErrorRender = (id?: string) => {
  const resolvedKeys: string[] = []
  const renderList: ErrorRender[] = []

  for (const [key, value] of cache.errorRender.entries()) {
    // if targetId is empty, it should be rendered in the latest controller
    // or it should be rendered in the specific controller
    if (!value.detail.targetId || (id && value.detail.targetId === id)) {
      renderList.push(value)
      resolvedKeys.push(key)
    }
  }

  for (const value of renderList.sort((a, b) => a.sort - b.sort)) {
    const action = safeRenderToController(value.detail)
    value.changePropsRef.current = action.changeProps
    value.removeRef.current = action.remove
  }

  for (const item of resolvedKeys) cache.errorRender.delete(item)
}

export const createController = (uuid: string, observer: Observer) => {
  cache.controller.push({
    uuid,
    observer,
    queue: [],
  })

  // set cache flag to true
  // represent current page env is valid
  Cache.page.set(PageShareCacheKey, true)

  resolveErrorRender()

  return () => removeController(uuid)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeProps = (props: any, controller: Controller, nodeId: string) => {
  const renderInfo = controller.queue.find((item) => item.id === nodeId)
  if (renderInfo) {
    renderInfo.props = props
    controller.observer([...controller.queue])
  }
}

const remove = (controller: Controller, nodeId: string) => {
  const matchIndex = controller.queue.findIndex((item) => item.id === nodeId)
  if (matchIndex >= 0) {
    controller.queue.splice(matchIndex, 1)
    controller.observer([...controller.queue])
  }
}

export const renderToController: AlInteractControllerRenderFunction = (
  detail,
) => {
  const { targetId } = detail
  // at least, it should have one controller
  if (cache.controller.length === 0) {
    throw new Error('please use <AlPageView /> to wrap page')
  }

  // render to current page
  // check env valid
  if (!targetId && !Cache.page.get(PageShareCacheKey)) {
    throw new Error(
      'current page has not wrapped by <AlPageView /> or component has not mounted',
    )
  }

  const controller = targetId
    ? getControllerById(targetId)
    : cache.controller.at(-1)

  if (!controller) {
    throw new Error(`targetId ${targetId} not exist`)
  }

  const nodeId = getUuid(root.className)

  const inQueueRenderDetail = {
    id: nodeId,
    ...detail,
  }
  controller.queue.push(inQueueRenderDetail)
  // notify render queue has changed
  controller.observer([...controller.queue])

  return {
    changeProps: (newProps) =>
      changeProps(
        { ...inQueueRenderDetail.props, ...newProps },
        controller,
        nodeId,
      ),
    remove: () => remove(controller, nodeId),
  }
}

/**
 * system will catch all error, and add this render to error queue, wait another chance to resolve it
 */
export const safeRenderToController: AlInteractControllerRenderFunction = (
  detail,
) => {
  try {
    return renderToController(detail)
  } catch {
    // add to error render queue, wait another chance to resolve
    const id = getUuid(root.className)
    const removeReference = {
      current: () => {
        cache.errorRender.delete(id)
      },
    }
    const changePropsReference = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      current: (newProps: any) => {
        if (cache.errorRender.has(id)) {
          const cacheInfo = cache.errorRender.get(id)!.detail
          cacheInfo.props = { ...cacheInfo.props, ...newProps }
        }
      },
    }

    // keep the render sort
    cache.errorRenderSortCounter++
    cache.errorRender.set(id, {
      changePropsRef: changePropsReference,
      detail,
      removeRef: removeReference,
      sort: cache.errorRenderSortCounter,
    })

    return {
      changeProps: (newProps) => {
        changePropsReference.current(newProps)
      },
      remove: () => {
        removeReference.current()
      },
    }
  }
}

export const useInteractController = (props: AlPageViewProps) => {
  const { interactControllerId } = props
  const defaultId = useMemo(() => getUuid(root.className), [])
  // system uuid
  const uuid = useMemo(() => getUuid(root.className), [])
  // 渲render queue
  const [queue, setQueue] = useState<InQueueRenderDetail[]>([])

  useEffect(() => {
    const deleteDel = createController(uuid, setQueue)

    return deleteDel
  }, [uuid])

  useEffect(() => {
    changeControllerId(uuid, interactControllerId || defaultId)
  }, [defaultId, uuid, interactControllerId])

  return { renderQueue: queue }
}

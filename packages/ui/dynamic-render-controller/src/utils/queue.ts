import { Cache, uuid as getUuid, Bem } from '@ambilight-taro/core'

export const Namespace = new Bem('dynamic-render-controller').className

export interface RenderDetail {
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

export interface InQueueRenderDetail extends RenderDetail {
  /**
   * render node id
   */
  uuid: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Render = <P = any>(
  detail: RenderDetail
) => {
  /**
   * change props（shallow coverage merge）
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeProps: (newProps: Partial<P>) => void
  /**
   * remove current node
   * @returns void
   */
  remove: () => void
}

type Observer = (queue: InQueueRenderDetail[]) => void

interface Controller {
  /**
   * 用户配置 id
   */
  id?: string
  /**
   * 系统自动生成唯一 id
   */
  uuid: string
  queue: InQueueRenderDetail[]
  observer: Observer
}

interface ErrorRender {
  uuid: string
  detail: RenderDetail
  removeRef: {
    current: () => void
  }
  changePropsRef: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current: (newProps: any) => void
  }
  sort: number
}

const AppShareCacheKey = Namespace

const cache = Cache.app.getOrCreate(AppShareCacheKey, {
  controller: [] as Controller[],
  errorRender: new Map<string, ErrorRender>(),
  errorRenderSortCounter: 0
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
  resolveErrorRender()
}

const removeController = (uuid: string) => {
  const matchIndex = cache.controller.findIndex((item) => item.uuid === uuid)
  if (matchIndex >= 0) {
    cache.controller.splice(matchIndex, 1)
  }
}

const resolveErrorRender = () => {
  for (const value of [...cache.errorRender.values()].sort((a, b) => a.sort - b.sort)) {
    try {
      const action = render(value.detail)
      value.changePropsRef.current = action.changeProps
      value.removeRef.current = action.remove

      cache.errorRender.delete(value.uuid)
    } catch {
      // 再次出现错误，则忽略，等待下一次“时机”再次尝试
    }
  }
}

export const createController = (uuid: string, observer: Observer) => {
  cache.controller.push({
    uuid,
    observer,
    queue: []
  })

  resolveErrorRender()

  return () => {
    removeController(uuid)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeProps = (props: any, controller: Controller, nodeId: string) => {
  const renderInfo = controller.queue.find((item) => item.uuid === nodeId)
  if (renderInfo) {
    renderInfo.props = props
    controller.observer([...controller.queue])
  }
}

const remove = (controller: Controller, nodeId: string) => {
  const matchIndex = controller.queue.findIndex((item) => item.uuid === nodeId)
  if (matchIndex >= 0) {
    controller.queue.splice(matchIndex, 1)
    controller.observer([...controller.queue])
  }
}

export const render: Render = (detail) => {
  const { targetId } = detail

  // 至少需要有一个控制节点在整个应用中
  if (cache.controller.length === 0) {
    throw new Error('整个应用中没有找到任何可用的控制器')
  }

  const controller = targetId ? getControllerById(targetId) : cache.controller.at(-1)

  if (!controller) {
    throw new Error(`没有与目标id ${targetId} 匹配的控制器`)
  }

  const nodeId = getUuid(Namespace)

  const inQueueRenderDetail = {
    uuid: nodeId,
    ...detail
  }
  controller.queue.push(inQueueRenderDetail)
  // notify render queue has changed
  controller.observer([...controller.queue])

  return {
    changeProps: (newProps) =>
      changeProps({ ...inQueueRenderDetail.props, ...newProps }, controller, nodeId),
    remove: () => remove(controller, nodeId)
  }
}

/**
 * system will catch all error, and add this render to error queue, wait another chance to resolve it
 */
export const safeRender: Render = (detail: RenderDetail) => {
  try {
    return render(detail)
  } catch {
    const uuid = getUuid(Namespace)

    const removeReference = {
      current: () => {
        cache.errorRender.delete(uuid)
      }
    }

    const changePropsReference = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      current: (newProps: any) => {
        if (cache.errorRender.has(uuid)) {
          const cacheInfo = cache.errorRender.get(uuid)!.detail
          cacheInfo.props = { ...cacheInfo.props, ...newProps }
        }
      }
    }

    // keep the render sort
    cache.errorRenderSortCounter++
    cache.errorRender.set(uuid, {
      changePropsRef: changePropsReference,
      detail,
      removeRef: removeReference,
      sort: cache.errorRenderSortCounter,
      uuid
    })

    return {
      changeProps: (newProps) => {
        changePropsReference.current(newProps)
      },
      remove: () => {
        removeReference.current()
      }
    }
  }
}

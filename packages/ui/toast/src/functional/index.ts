import { FC } from 'react'
import { uuid as _uuid, Cache } from '@ambilight-taro/core'
import { safeRender } from '@ambilight-taro/dynamic-render-controller'
import { AlToastProps } from '../type'
import { root } from '../component/bem'
import { AlToast } from '../component'

export interface AlToastFunctionalConfig {
  /**
   * 目标渲染控制器 id，具体可以参考 `AlDynamicRenderController`
   * @default 不配置则会默认渲染到当前应用中“最新”（存在且最后出现）创建的控制器上
   */
  controllerId?: string
  /**
   * 是否阻塞渲染队列，直至此 toast 渲染结束
   */
  isBlocked?: boolean
}

export interface AlToastStatic {
  show: (props: Omit<AlToastProps, 'visible'>, config?: AlToastFunctionalConfig) => () => void
}

interface RenderDetail {
  uuid: string
  props: AlToastProps
  config: AlToastFunctionalConfig
  rendered: boolean
  destroy: () => void
}

const renderQueue = Cache.app.getOrCreate<RenderDetail[]>(`${root.className}/render-queue`, [])

const removeFromQueue = (uuid: string) => {
  const index = renderQueue.findIndex((item) => item.uuid === uuid)

  if (index >= 0) {
    // if match toast is rendered, destroy the component
    if (renderQueue[index].rendered) {
      renderQueue[index].destroy()
    }

    renderQueue.splice(index, 1)
  }
}

const tryToRenderNext = () => {
  const oldest = renderQueue[0]

  if (!oldest) {
    return
  }

  if (
    // current oldest one is block toast and it is rendered
    // system should stop other toast render util it is removed
    oldest.config.isBlocked &&
    oldest.rendered
  ) {
    return
  }

  // if current exist rendered one, remove it
  if (oldest.rendered) {
    removeFromQueue(oldest.uuid)
  }

  const nextBlockedIndex = renderQueue.findIndex((item) => item.config.isBlocked)
  // if we find a blocked toast in the render queue  by timeline
  // we should render it first and blocked the queue
  // or we just render the latest one
  const nextRenderIndex = nextBlockedIndex >= 0 ? nextBlockedIndex : renderQueue.length - 1

  renderQueue.splice(0, nextRenderIndex)

  const next = renderQueue[0]

  const controller = safeRender({
    component: AlToast,
    props: next.props,
    targetId: next.config.controllerId
  })

  next.destroy = controller.remove
  next.rendered = true
}

export const functionalWrapper = (component: FC<AlToastProps>) => {
  const wrappedComponent = component as FC<AlToastProps> & AlToastStatic
  wrappedComponent.show = (props, config) => {
    const uuid = _uuid(root.className)

    renderQueue.push({
      uuid,
      props: {
        ...props,
        visible: true,
        onClose: () => {
          props?.onClose?.()
          removeFromQueue(uuid)
          tryToRenderNext()
        }
      },
      rendered: false,
      config: config || {},
      destroy: () => {
        // default
      }
    })

    tryToRenderNext()

    return () => {
      removeFromQueue(uuid)
      tryToRenderNext()
    }
  }

  return wrappedComponent
}

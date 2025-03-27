// eslint-disable-next-line import/default
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { uuid } from '@ambilight-taro/core'
import { AlDynamicRenderControllerProps } from '../type'
import { changeControllerId, createController, InQueueRenderDetail } from '../queue'
import { Namespace } from '../namespace'

export const AlDynamicRenderController = (props: AlDynamicRenderControllerProps) => {
  const { controllerId } = props

  // 默认控制器 id
  const defaultControllerId = useMemo(() => uuid(Namespace), [])
  // 控制器 uuid
  const controllerUuid = useMemo(() => uuid(Namespace), [])
  // 渲染队列
  const [queue, setQueue] = useState<InQueueRenderDetail[]>([])

  useEffect(() => {
    const deleteDel = createController(controllerUuid, setQueue)

    return deleteDel
  }, [controllerUuid])

  useEffect(() => {
    changeControllerId(controllerUuid, controllerId || defaultControllerId)
  }, [defaultControllerId, controllerUuid, controllerId])

  return (
    <Fragment>
      {queue.map((item) => {
        const Component = item.component
        return <Component {...item.props} key={item.uuid} />
      })}
    </Fragment>
  )
}

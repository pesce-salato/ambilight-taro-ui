import { NodesRef, useDidHide, useDidShow } from '@tarojs/taro'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { View } from '@tarojs/components'
import { useShadowState } from '@ambilight-taro/use-shadow-state'
import { uuid, classnames, query, formatMessage } from '@ambilight-taro/core'
import { AlNavBarPopProps, AlNavBarPopReference } from '../../type'
import { AlNavBarBasic } from '../basic'
import { popRoot, root } from '../../utils/bem'
import './index.scss'

export const AlNavBarPop = forwardRef(
  (props: AlNavBarPopProps, reference: React.Ref<AlNavBarPopReference>) => {
    const {
      autoObserve = true,
      observeElementId,
      trigger,
      period = 240,
      className,
      style,
      children,
      basicProps = {},
    } = props

    const [pageVisible, setPageVisible] = useState(true)
    const [navBarRect, setNavBarRect, getSyncNavBarRect] = useShadowState<
      NodesRef.BoundingClientRectCallbackResult | undefined
    >()
    const [isPopped, setIsPopped] = useState(false)

    useDidHide(() => setPageVisible(false))
    useDidShow(() => setPageVisible(true))

    const rectGagerId = useMemo(() => uuid(root.className), [])

    const queryNavBar = useCallback(async () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setNavBarRect(undefined)

      try {
        setNavBarRect(await query(rectGagerId))
      } catch (error) {
        throw new Error(
          formatMessage(`无法查询到 nav bar rect 信息，${error.toString()}`),
        )
      }
    }, [rectGagerId, setNavBarRect])

    useEffect(() => {
      queryNavBar()
    }, [queryNavBar])

    useEffect(() => {
      if (
        pageVisible &&
        observeElementId &&
        autoObserve &&
        navBarRect &&
        trigger
      ) {
        let timeoutHandler: number = 0
        let abandoned = false

        const loopQuery = async () => {
          try {
            const rect = await query(observeElementId)

            const realtimeNavBarRect = getSyncNavBarRect()

            // 避免脏数据进入计算
            if (realtimeNavBarRect && !abandoned) {
              setIsPopped(trigger(rect, realtimeNavBarRect))
            }
            // 查询不到 当前 nav bar 的信息，存在以下两种情况
            // 初次查询还未完成
            // 用户手动外部驱使重新查询
            // 在这两种情况下，对于 observeElement 的查询都可以停止了
            // 直到 nav bar 获得新的值，再次发起查询
            else {
              return
            }
          } catch {
            // ignore error
          }

          // 结束 loop，避免出现意料之外的多重 loop 循环情况
          if (abandoned) {
            return
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          timeoutHandler = setTimeout(loopQuery, period) as any
        }

        loopQuery()

        return () => {
          abandoned = true
          clearTimeout(timeoutHandler)
        }
      }
    }, [
      observeElementId,
      autoObserve,
      period,
      navBarRect,
      trigger,
      pageVisible,
      getSyncNavBarRect,
    ])

    useImperativeHandle(
      reference,
      () => ({
        requeryComponent: async () => {
          const rect = await query(observeElementId)

          const realtimeNavBarRect = getSyncNavBarRect()

          if (realtimeNavBarRect) {
            setIsPopped(trigger(rect, realtimeNavBarRect))
          } else {
            throw new Error(
              formatMessage('nav bar rect 信息还未初始化或重查询完成'),
            )
          }
        },
        queryObserveElement: queryNavBar,
      }),
      [observeElementId, trigger, queryNavBar, getSyncNavBarRect],
    )

    return (
      <View
        className={classnames(className, popRoot.className, {
          [popRoot.status('visible').className]: isPopped,
        })}
        style={style}
      >
        <View
          className={popRoot.hierarchies('gager').className}
          id={rectGagerId}
        />
        <View className={popRoot.hierarchies('content').className}>
          <AlNavBarBasic {...basicProps}>{children}</AlNavBarBasic>
        </View>
      </View>
    )
  },
)

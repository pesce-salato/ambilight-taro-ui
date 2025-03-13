// eslint-disable-next-line import/default
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Bem,
  withDefaultProps,
  classnames,
  uuid,
  query,
  EnumValueUnion
} from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { NodesRef } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { useShadowState } from '@ambilight-taro/use-shadow-state'
import { useCompatibleUncontrolledValue } from '@ambilight-taro/use-compatible-uncontrolled-value'
import {
  AlCarouselDirection,
  AlCarouselIndicatorPosition,
  AlCarouselIndicatorVariant,
  AlCarouselProps
} from '../type'
import './index.scss'

const root = new Bem('carousel')

const defaultProps = {
  direction: AlCarouselDirection.horizontal as EnumValueUnion<AlCarouselDirection>,
  indicatorVariant: AlCarouselIndicatorVariant.dot as EnumValueUnion<AlCarouselIndicatorVariant>,
  indicatorPosition:
    AlCarouselIndicatorPosition.bottom as EnumValueUnion<AlCarouselIndicatorPosition>,
  indicatorDisabled: false,
  duration: 0,
  defaultValue: 0
}

export const AlCarousel = (originalProps: AlCarouselProps) => {
  const props = withDefaultProps<AlCarouselProps, typeof defaultProps>(originalProps)
  const {
    className,
    style,
    direction,
    value,
    defaultValue,
    onChange,
    children,
    duration,
    indicatorDisabled,
    indicatorPosition,
    indicatorVariant
  } = props

  const [compatibleValue, onChangeWrapperOriginal] = useCompatibleUncontrolledValue(
    defaultValue,
    value,
    onChange
  )
  const systemSetValueReference = useRef<number>(compatibleValue)
  const realIndexReference = useRef(compatibleValue)
  const [isInTouching, setIsInTouching] = useState(false)
  const count = useMemo(() => React.Children.count(children), [children])
  const translateFunction = useMemo(
    () => (direction === AlCarouselDirection.horizontal ? 'translateX' : 'translateY'),
    [direction]
  )

  const [isInTranslating, setIsInTranslating, getSyncIsInTranslating] = useShadowState(false)

  const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties>({
    transform: `${translateFunction}(${-compatibleValue * 100}%)`,
    transition: 'none'
  })

  const isHorizontal = useMemo(() => direction === AlCarouselDirection.horizontal, [direction])
  const rootId = useMemo(() => uuid(root.className), [])
  const wrapperId = useMemo(() => uuid(root.className), [])

  const [rootRect, setRootRect] = useState<NodesRef.BoundingClientRectCallbackResult>()
  const moveStartFrom = useRef<number>()
  const moveStartOffset = useRef<number>()
  const latestMultipleReference = useRef<number>()

  const onChangeWrapper = useCallback(
    (v: number) => {
      systemSetValueReference.current = v
      onChangeWrapperOriginal(v)
    },
    [onChangeWrapperOriginal]
  )

  const updateRootRect = useCallback(async () => {
    const [rect] = await query(rootId)
    setRootRect(rect)
  }, [rootId])

  useEffect(() => {
    updateRootRect()
  }, [updateRootRect])

  // 计算跳转到对应下标索引所需百分比位移
  const calcMoveToIndexNeedPercentage = useCallback(
    (targetIndex: number) => `${-targetIndex * 100}%`,
    []
  )

  /**
   * 计算偏移量对应倍数
   * 必须要在 touch start 查询了组件 rect 信息之后调用
   */
  const calcMultiple = useCallback(
    (diff: number) => {
      if (rootRect) {
        return diff / (isHorizontal ? rootRect.width : rootRect.height)
      }

      return 0
    },
    [isHorizontal, rootRect]
  )

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      if (!rootRect) {
        return
      }

      moveStartFrom.current = isHorizontal ? event.touches[0].clientX : event.touches[0].clientY
      moveStartOffset.current = compatibleValue * (isHorizontal ? rootRect.width : rootRect.height)
      latestMultipleReference.current = undefined

      realIndexReference.current = -1

      setIsInTouching(true)
    },
    [rootRect, isHorizontal, compatibleValue]
  )

  const onTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (
        moveStartFrom.current !== undefined &&
        moveStartOffset.current !== undefined &&
        rootRect &&
        !getSyncIsInTranslating()
      ) {
        // 计算位移相对于整个元素的倍数
        const multiple = calcMultiple(
          moveStartOffset.current -
            (isHorizontal ? event.touches[0].clientX : event.touches[0].clientY) +
            moveStartFrom.current
        )
        // 处理在第一个元素左滑的case，直接将其置换到最后一个在末尾多渲染的“第一个元素”
        const toPositiveMultiple = multiple < 0 ? count + multiple : multiple
        // 处理突然出现的极大滑动距离的极限情况，将位移约束在安全范围内
        const safeMultiple = toPositiveMultiple - Math.floor(toPositiveMultiple / count) * count

        realIndexReference.current = Math.round(safeMultiple)

        onChangeWrapper(
          realIndexReference.current >= count
            ? realIndexReference.current - count
            : realIndexReference.current
        )

        latestMultipleReference.current = safeMultiple

        setWrapperStyle({
          transform: `${translateFunction}(${
            -safeMultiple * (isHorizontal ? rootRect.width : rootRect.height)
          }px)`,
          transition: 'none'
        })
      }
    },
    [
      calcMultiple,
      count,
      rootRect,
      isHorizontal,
      translateFunction,
      onChangeWrapper,
      getSyncIsInTranslating
    ]
  )

  const onTouchEnd = useCallback(() => {
    if (!getSyncIsInTranslating() && latestMultipleReference.current !== undefined) {
      // 超过 5% 的位移，则视作会触发动画
      // 阻止后续 move 响应，直至动画结束，位置正确
      // 小于 5%，则视作不触发动画
      // 后续 move 直接位移到对应位置，用户无较大感知
      setIsInTranslating(
        Math.abs(latestMultipleReference.current - realIndexReference.current) > 0.05
      )

      if (realIndexReference.current >= 0) {
        setWrapperStyle({
          transform: `${translateFunction}(${calcMoveToIndexNeedPercentage(realIndexReference.current)})`
        })
      }
    }

    setIsInTouching(false)
  }, [calcMoveToIndexNeedPercentage, translateFunction, getSyncIsInTranslating, setIsInTranslating])

  const onTransitionEnd = useCallback(() => {
    if (realIndexReference.current === count && systemSetValueReference.current == 0) {
      setWrapperStyle({
        transform: `${translateFunction}(0px)`,
        transition: 'none'
      })
    }

    setIsInTranslating(false)
  }, [count, translateFunction, setIsInTranslating])

  useEffect(() => {
    // 没有在任何动作态中
    // 并且 当前值 与 系统内部设置值没有对齐，则代表需要更新位移
    if (!isInTouching && systemSetValueReference.current !== compatibleValue) {
      // 避免在刚刚同步完状态之后，onTransitionEnd 随即响应，导致 isInTranslating 错误
      setTimeout(() => {
        setIsInTranslating(true)
        systemSetValueReference.current = compatibleValue
        setWrapperStyle({
          transform: `${translateFunction}(${calcMoveToIndexNeedPercentage(compatibleValue)})`
        })
      }, 0)
    }
  }, [
    isInTouching,
    compatibleValue,
    calcMoveToIndexNeedPercentage,
    translateFunction,
    setIsInTranslating
  ])

  // 自动定时轮播
  useEffect(() => {
    let handler = -1
    if (duration && !isInTouching && !isInTranslating) {
      handler = setTimeout(() => {
        const newIndex = compatibleValue === count - 1 ? 0 : compatibleValue + 1
        if (newIndex !== compatibleValue) {
          // 实现无缝轮博效果
          realIndexReference.current = compatibleValue + 1
          setIsInTranslating(true)
          setWrapperStyle({
            transform: `${translateFunction}(${calcMoveToIndexNeedPercentage(realIndexReference.current)})`
          })
          onChangeWrapper(newIndex)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, duration) as any
    }
    return () => clearTimeout(handler)
  }, [
    compatibleValue,
    calcMoveToIndexNeedPercentage,
    count,
    duration,
    isInTouching,
    translateFunction,
    onChangeWrapper,
    setIsInTranslating,
    isInTranslating
  ])

  const items = useMemo(() => {
    const childArray = React.Children.toArray(children)
    // 第一个元素在末尾多渲染一个，以实现无缝轮播效果
    return [...childArray, childArray[0]].map((item: React.ReactNode, index: number) => {
      return (
        <View key={index} className={root.hierarchies(['item']).className}>
          {item}
        </View>
      )
    })
  }, [children])

  const indicator = useMemo(() => {
    if (indicatorDisabled) {
      return
    } else {
      const result: React.ReactNode[] = []
      for (let counter = 0; counter < count; counter++) {
        result.push(
          <View
            key={counter}
            className={classnames(root.hierarchies('indicator-item').className, {
              [root.hierarchies('indicator-item').status('active').className]:
                counter === compatibleValue
            })}
          />
        )
      }

      return (
        <View
          className={classnames(
            root.hierarchies('indicator').className,
            root.hierarchies('indicator').status(`position-${indicatorPosition}`).className,
            root.hierarchies('indicator').status(`variant-${indicatorVariant}`).className
          )}
        >
          <View className={root.hierarchies(['indicator-wrapper']).className}>
            {indicatorVariant === AlCarouselIndicatorVariant.slider && (
              <View
                className={root.hierarchies(['indicator-slider']).className}
                style={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  transform: `translateX(${compatibleValue * 100}%)`
                }}
              />
            )}
            {result}
          </View>
        </View>
      )
    }
  }, [compatibleValue, count, indicatorVariant, indicatorDisabled, indicatorPosition])

  return (
    <AlBasicView
      className={classnames(className, root.className, root.status(direction).className)}
      style={style}
      id={rootId}
      catchMove
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onTouchStart={onTouchStart as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onTouchMove={onTouchMove as any}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <View
        className={root.hierarchies('wrapper').className}
        id={wrapperId}
        onTransitionEnd={onTransitionEnd}
        style={wrapperStyle}
      >
        {items}
      </View>
      {indicator}
    </AlBasicView>
  )
}

AlCarousel.defaultProps = defaultProps

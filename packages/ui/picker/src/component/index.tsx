// eslint-disable-next-line import/default
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { classnames, query, uuid } from '@ambilight-taro/core'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { useCompatibleUncontrolledValue } from '@ambilight-taro/use-compatible-uncontrolled-value'
import { NodesRef } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { AlPickerOption, AlPickerProps } from '../type'
import { bem } from './bem'
import './index.scss'

export const AlPicker = (props: AlPickerProps) => {
  const { className, style, options, value, defaultValue, onChange } = props

  const [compatibleValue, onChangeWrapper] = useCompatibleUncontrolledValue(
    defaultValue || options[0].id,
    value,
    onChange
  )

  const [rootRect, setRootRect] = useState<NodesRef.BoundingClientRectCallbackResult>()
  const [optionRect, setOptionRect] = useState<NodesRef.BoundingClientRectCallbackResult>()
  const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties>({})
  const rootId = useMemo(() => uuid(bem.root.className), [])
  const optionHeightGagerId = useMemo(() => uuid(bem.root.className), [])
  const isInTranslatingReference = useRef<boolean>(false)
  const moveStartFromReference = useRef(0)
  const moveStartOffsetReference = useRef(0)
  const latestTranslateMultipleReference = useRef<number>()

  const updateRects = useCallback(async () => {
    try {
      const rects = await query([rootId, optionHeightGagerId])
      setRootRect(rects.find((item) => item.id === rootId))
      setOptionRect(rects.find((item) => item.id === optionHeightGagerId))
    } catch (error) {
      throw new Error(`@ambilight-taro/picker: 查询组件本身以及行高信息失败，${error.toString()}`)
    }
  }, [rootId, optionHeightGagerId])

  useEffect(() => {
    updateRects()
  }, [updateRects])

  const currentIndex = useMemo(() => {
    return options.findIndex((item) => item.id === compatibleValue) || 0
  }, [options, compatibleValue])

  const optionCount = useMemo(() => options.length, [options.length])

  useEffect(() => {
    if (optionRect) {
      setWrapperStyle((pre) => ({
        ...pre,
        transform: `translateY(${-currentIndex * optionRect.height}px)`
      }))
    }
  }, [currentIndex, optionRect])

  const onTouchStart = useCallback(
    (event: ITouchEvent) => {
      moveStartFromReference.current = event.touches[0].clientY
      moveStartOffsetReference.current = currentIndex * optionRect!.height
      latestTranslateMultipleReference.current = undefined
    },
    [optionRect, currentIndex]
  )

  const onTouchMove = useCallback(
    (event: ITouchEvent) => {
      if (!isInTranslatingReference.current) {
        const fromStartOffset = event.touches[0].clientY - moveStartFromReference.current

        const totalOffset = moveStartOffsetReference.current - fromStartOffset
        const multiple = totalOffset / optionRect!.height
        const allowBoundary = 0.5
        // 允许一定范围的上下超出界限
        const wideRangeMultiple = Math.max(
          Math.min(multiple, optionCount + allowBoundary - 1),
          -allowBoundary
        )

        latestTranslateMultipleReference.current = wideRangeMultiple

        setWrapperStyle({
          transition: 'none',
          transform: `translateY(${-wideRangeMultiple * optionRect!.height}px)`
        })
      }
    },
    [optionRect, optionCount]
  )

  const onTouchEnd = useCallback(() => {
    // 只有触发了 move 事件的 touch 才会响应
    // 避免与 click 冲突
    if (
      !isInTranslatingReference.current &&
      latestTranslateMultipleReference.current !== undefined
    ) {
      const multiple = Math.round(
        Math.max(Math.min(latestTranslateMultipleReference.current, optionCount - 1), 0)
      )
      isInTranslatingReference.current =
        Math.abs(multiple - latestTranslateMultipleReference.current) > 0.1

      setWrapperStyle({
        transform: `translateY(${-optionRect!.height * multiple}px)`
      })

      onChangeWrapper(options[multiple].id)
    }
  }, [optionCount, optionRect, options, onChangeWrapper])

  const onTransitionEnd = useCallback(() => {
    isInTranslatingReference.current = false
  }, [])

  const onOptionClick = useCallback(
    (option: AlPickerOption, index: number) => {
      onChangeWrapper(option.id)
      isInTranslatingReference.current = false
      setWrapperStyle({
        transform: `translateY(${-optionRect!.height * index}px)`
      })
    },
    [onChangeWrapper, setWrapperStyle, optionRect]
  )

  const placeholderHeight = useMemo(() => {
    if (optionRect && rootRect) {
      return rootRect.height / 2 - optionRect.height / 2
    }
    return 0
  }, [rootRect, optionRect])

  return (
    <AlBasicView className={classnames(className, bem.root.className)} style={style} id={rootId}>
      {rootRect && optionRect && (
        <View
          className={bem.wrapper.className}
          catchMove
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onTouchStart={(event) => onTouchStart(event as any)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onTouchMove={(event) => onTouchMove(event as any)}
          onTouchEnd={() => onTouchEnd()}
          onTouchCancel={() => onTouchEnd()}
        >
          <View
            className={bem.optionWrapper.className}
            style={{
              paddingTop: `${placeholderHeight}px`,
              paddingBottom: `${placeholderHeight}px`,
              ...wrapperStyle
            }}
            onTransitionEnd={() => onTransitionEnd()}
          >
            {options.map((option, index) => (
              <View
                className={bem.option.className}
                key={option.id}
                onClick={() => onOptionClick(option, index)}
              >
                {option.content}
              </View>
            ))}
          </View>
          <View
            className={classnames(bem.mask.className, bem.mask.status('top').className)}
            style={{
              height: `${rootRect.height / 2 - optionRect.height / 2}px`
            }}
          />
          <View
            className={classnames(bem.mask.className, bem.mask.status('bottom').className)}
            style={{
              height: `${rootRect.height / 2 - optionRect.height / 2}px`
            }}
          />
          <View
            className={bem.indicator.className}
            style={{
              height: `${optionRect.height}px`
            }}
          />
        </View>
      )}
      <View
        id={optionHeightGagerId}
        className={classnames(bem.option.className, bem.optionHeightGager.className)}
      />
    </AlBasicView>
  )
}

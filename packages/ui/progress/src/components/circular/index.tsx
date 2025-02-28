import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, View } from '@tarojs/components'
import { CanvasContext, useReady, getWindowInfo } from '@tarojs/taro'
import { withDefaultProps, classnames, uuid, query } from '@ambilight-taro/core'
import { AlCircularProgressProps } from '../../type'
import { bem } from '../../bem'
import './index.scss'

const defaultProps = {
  thicknessRatio: 0.05,
  color: '#805AD5',
  withAnimation: true,
  animationDuration: 240,
  clockwise: true
}

export const AlCircularProgress = (originalProps: AlCircularProgressProps) => {
  const props = withDefaultProps<AlCircularProgressProps, typeof defaultProps>(originalProps)
  const { thicknessRatio, color, ringColor, withAnimation, value, animationDuration, clockwise } =
    props
  const [diameter, setDiameter] = useState<number>(0)
  const [canvasContext, setCanvasContext] = useState<CanvasContext>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [canvasNode, setCanvasNode] = useState<any>()

  const canvasId = useMemo(() => uuid(bem.root.className), [])
  const rootId = useMemo(() => uuid(bem.root.className), [])

  const drawValueReference = useRef(0)
  const animationTaskIdReference = useRef('')

  useReady(() => {
    ;(async () => {
      const result = (await query(canvasId, {
        chain: (reference) => reference.fields({ node: true })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any[]
      setCanvasNode(result[0].node)
      setCanvasContext(result[0].node.getContext('2d'))
    })()
  })

  useEffect(() => {
    ;(async () => {
      const [rect] = await query(rootId)
      setDiameter(Math.min(rect.width, rect.height))
    })()
  }, [rootId])

  const pixelRatio = useMemo(() => getWindowInfo().pixelRatio, [])

  useEffect(() => {
    if (canvasNode && diameter) {
      canvasNode.width = diameter * pixelRatio
      canvasNode.height = diameter * pixelRatio
    }
  }, [canvasNode, diameter, pixelRatio])

  const drawEnvironmentGetReady = useMemo(
    () => canvasContext && diameter,
    [canvasContext, diameter]
  )

  const draw = useCallback(
    (percentage: number) => {
      if (drawEnvironmentGetReady) {
        const lineWidth = thicknessRatio * diameter * pixelRatio

        const render = (targetPercentage: number, strokeColor: string) => {
          canvasContext!.lineCap = 'round'
          canvasContext!.lineWidth = lineWidth
          canvasContext!.beginPath()
          canvasContext!.strokeStyle = strokeColor
          canvasContext!.arc(
            (diameter * pixelRatio) / 2,
            (diameter * pixelRatio) / 2,
            (diameter * pixelRatio - lineWidth) / 2 - 1,
            1.5 * Math.PI,
            (1.5 + (targetPercentage / 100) * 2 * (clockwise ? 1 : -1)) * Math.PI,
            !clockwise
          )
          canvasContext!.stroke()
        }

        canvasContext!.clearRect(0, 0, diameter * pixelRatio, diameter * pixelRatio)

        if (ringColor) {
          render(100, ringColor)
        }

        render(percentage, color)
      }
    },
    [
      drawEnvironmentGetReady,
      canvasContext,
      diameter,
      thicknessRatio,
      pixelRatio,
      color,
      ringColor,
      clockwise
    ]
  )

  useEffect(() => {
    if (!drawEnvironmentGetReady) {
      return
    }

    // 更新动画任务 id，停止之前运行的动画
    // 不论之前是否有动画存在
    const taskId = uuid(bem.root.className)
    animationTaskIdReference.current = taskId

    if (withAnimation) {
      const speed = (value - drawValueReference.current) / animationDuration
      let lastTimestamp = Date.now()

      const interpolation = () => {
        if (taskId === animationTaskIdReference.current) {
          const now = Date.now()
          drawValueReference.current += speed * (now - lastTimestamp)

          const reachedEnd =
            speed > 0 ? drawValueReference.current > value : drawValueReference.current < value

          if (reachedEnd) {
            drawValueReference.current = value
          }

          draw(drawValueReference.current)

          if (drawValueReference.current === value) {
            return
          }

          lastTimestamp = now
          requestAnimationFrame(interpolation)
        }
      }

      interpolation()
    } else {
      drawValueReference.current = value
      draw(value)
    }
  }, [draw, withAnimation, value, animationDuration, drawEnvironmentGetReady])

  return (
    <View
      id={rootId}
      className={classnames(bem.root.className, bem.root.status('circular').className)}
    >
      <Canvas
        canvasId={canvasId}
        id={canvasId}
        type="2d"
        className={bem.root.className}
        style={{ width: `${diameter}px`, height: `${diameter}px` }}
      />
    </View>
  )
}

AlCircularProgress.defaultProps = defaultProps

// eslint-disable-next-line import/default
import React, { useMemo, Children } from 'react'
import { View } from '@tarojs/components'
import { Bem, classnames, EnumValueUnion, withDefaultProps } from '@ambilight-taro/core'
import { useCompatibleUncontrolledValue } from '@ambilight-taro/use-compatible-uncontrolled-value'
import { AlCapsuleSelectorProps, AlCapsuleSelectorSize, AlCapsuleSelectorTheme } from '../type'
import './index.scss'

const defaultProps = {
  theme: AlCapsuleSelectorTheme.gray as EnumValueUnion<AlCapsuleSelectorTheme>,
  defaultValue: 0,
  size: AlCapsuleSelectorSize.md as EnumValueUnion<AlCapsuleSelectorSize>
}

const root = new Bem('capsule-selector')

export const AlCapsuleSelector = (originalProps: AlCapsuleSelectorProps) => {
  const props = withDefaultProps<AlCapsuleSelectorProps, typeof defaultProps>(originalProps)
  const { children, theme, value, defaultValue, onChange, className, style, size } = props

  const [compatibleValue, onChangeWrapper] = useCompatibleUncontrolledValue(
    defaultValue,
    value,
    onChange
  )

  const optionCount = useMemo(() => Children.toArray(children).length, [children])

  const options = useMemo(() => {
    return Children.toArray(children).map((option: React.ReactNode, index: number) => {
      return (
        <View
          key={index}
          className={classnames(root.hierarchies(['option']).className, {
            [root.hierarchies(['option']).status('selected').className]: compatibleValue === index
          })}
          onClick={() => {
            if (compatibleValue !== index) {
              onChangeWrapper(index)
            }
          }}
        >
          {option}
        </View>
      )
    })
  }, [children, compatibleValue, onChangeWrapper])

  const separators = useMemo(() => {
    if (optionCount <= 2) {
      return
    }

    const result: React.ReactNode[] = []

    for (let index = 0; index < optionCount - 1; index++) {
      result.push(
        <View
          className={classnames(root.hierarchies(['separator']).className, {
            [root.hierarchies(['separator']).status('active').className]:
              index !== compatibleValue && index !== compatibleValue - 1
          })}
          style={{
            left: `${((index + 1) * 100) / optionCount}%`
          }}
          key={index}
        />
      )
    }

    return <View className={root.hierarchies(['separator-wrapper']).className}>{result}</View>
  }, [compatibleValue, optionCount])

  return (
    <View
      className={classnames(
        root.className,
        className,
        root.status(`theme-${theme}`).className,
        root.status(`size-${size}`).className
      )}
      style={style}
    >
      {separators}
      <View
        className={root.hierarchies(['indicator-wrapper']).className}
        style={{ transform: `translateX(${(compatibleValue * 100) / optionCount}%)` }}
      >
        <View
          className={root.hierarchies(['indicator']).className}
          style={
            {
              ['--al-capsule-selector-indicator-width']: `${100 / optionCount}%`
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
        />
      </View>
      {options}
    </View>
  )
}

AlCapsuleSelector.defaultProps = defaultProps

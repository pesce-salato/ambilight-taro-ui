import { AlCapsuleSelector } from '@ambilight-taro/capsule-selector'
import { Text } from '@tarojs/components'

export interface CapsuleSelectorOfValueProps<T> {
  className?: string
  style?: React.CSSProperties
  options: T[]
  value: T
  onChange: (v: T) => void
  optionDescGetter?: (index: number) => string
}

export const CapsuleSelectorOfValue = <T = string,>(props: CapsuleSelectorOfValueProps<T>) => {
  const { className, style, options, value, onChange, optionDescGetter } = props

  return (
    <AlCapsuleSelector
      className={className}
      style={style}
      size="sm"
      value={options.indexOf(value)}
      onChange={(index) => onChange(options[index])}
    >
      {options.map((option, index) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Text key={option as any}>{(optionDescGetter?.(index) as any) || option}</Text>
      ))}
    </AlCapsuleSelector>
  )
}

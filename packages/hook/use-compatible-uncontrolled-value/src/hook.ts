/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react'

/**
 * 兼容非受控值处理逻辑
 * @param defaultValue 非受控默认值
 * @param value 受控值
 * @param onChange 值改变事件
 */
export const useCompatibleUncontrolledValue = <V>(
  defaultValue: V,
  value?: V,
  onChange?: (next: V, ...arguments_: any[]) => void,
) => {
  const [selfControlValue, setSelfControlValue] = useState<V>(defaultValue)
  const isUncontrolled = useMemo(() => value === undefined, [value])

  const compatibleValue = useMemo(
    () => (isUncontrolled ? selfControlValue : value!),
    [selfControlValue, isUncontrolled, value],
  )

  const onChangeWrapper = useCallback(
    (next: V, ...arguments_: any[]) => {
      if (isUncontrolled) {
        setSelfControlValue(next)
      }

      onChange?.(next, ...arguments_)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isUncontrolled, onChange],
  )

  return useMemo(
    () => [compatibleValue, onChangeWrapper] as const,
    [compatibleValue, onChangeWrapper],
  )
}

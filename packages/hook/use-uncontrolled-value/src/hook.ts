import { useCallback, useMemo, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUncontrolledValue = <V>(
  defaultValue: V,
  value?: V,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (next: V, ...arguments_: any[]) => void,
) => {
  const [cache, setCache] = useState<V>(defaultValue)
  const isUncontrolled = useMemo(() => value === undefined, [value])

  const disposedValue = useMemo(
    () => (isUncontrolled ? cache : value!),
    [cache, isUncontrolled, value],
  )

  const wrappedOnChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (next: V, ...arguments_: any[]) => {
      if (isUncontrolled) {
        setCache(next)
      }

      onChange?.(next, ...arguments_)
    },
    [isUncontrolled, onChange],
  )

  return [disposedValue, wrappedOnChange] as const
}

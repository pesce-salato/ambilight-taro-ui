import { useCallback, useRef, useState } from 'react'

export const useShadowState = <T>(init: T) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, setState] = useState<T>(init as any)
  const shadow = useRef<T>(state)

  const setStateWrapper = useCallback<typeof setState>((update) => {
    let result = update

    if (typeof update === 'function') {
      const updateFunction = update as (previousState: T) => T

      // wrap original setter func
      // use shadow to follow
      result = (pre: T) => {
        const next = updateFunction(pre)
        shadow.current = next
        return next
      }
    } else {
      shadow.current = update
    }

    setState(result)
  }, [])

  return [state, setStateWrapper, shadow] as const
}

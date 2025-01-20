import { useCallback, useRef, useState } from 'react'

export const useShadowState = <T>(
  init?: T,
): [T, React.Dispatch<React.SetStateAction<T>>, () => T] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, setState] = useState<T>(init as any)
  const stateReference = useRef<T>(state)

  const setStateWrapper = useCallback<typeof setState>((update) => {
    let result = update

    if (typeof update === 'function') {
      const updateFunction = update as (previousState: T) => T

      // wrap original setter func
      // use shadow to follow
      result = (pre: T) => {
        const next = updateFunction(pre)
        stateReference.current = next
        return next
      }
    } else {
      stateReference.current = update
    }

    setState(result)
  }, [])

  const getSyncState = useCallback(() => stateReference.current, [])

  return [state, setStateWrapper, getSyncState] as const
}

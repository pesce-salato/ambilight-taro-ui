import { useRouter } from '@tarojs/taro'
import React, { useLayoutEffect, useState } from 'react'

export const useRootElement = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const router = useRouter() as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rootElement, setRootElement] = useState<any>()

  useLayoutEffect(() => {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const element = document.getElementById(router.$taroPath)
    element && setRootElement(element)
  }, [router.$taroPath])

  return rootElement
}

import Taro from '@tarojs/taro'

const PageObjectKey = '__alPageShareCache__'

const getCurrentPage = () => Taro.getCurrentInstance().page

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const set = (k: string, v: any) => {
  const currentPage = getCurrentPage()

  if (!currentPage) {
    return
  }

  let cache = currentPage[PageObjectKey]

  if (!cache) {
    cache = {}
    currentPage[PageObjectKey] = cache
  }

  cache[k] = v
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = <T = any>(k: string): T | undefined => {
  return getCurrentPage()?.[PageObjectKey]?.[k]
}

const clear = () => {
  const currentPage = getCurrentPage()

  if (!currentPage) {
    return
  }

  currentPage[PageObjectKey] = {}
}

export const PageShareCache = Object.freeze({ get, set, clear })

import Taro from '@tarojs/taro'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cacheBuilder = (getSpace: () => Record<string, any> | undefined) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const set = (k: string, v: any) => {
    const space = getSpace()

    if (!space) {
      return
    }

    space[k] = v
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = <T = any>(k: string): T | undefined => {
    return getSpace()?.[k]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getOrCreate = <T = any>(k: string, v: T): T => {
    const cache = get<T>(k)

    if (!cache) {
      set(k, v)
    }

    return cache || v
  }

  const clear = (k: string) => {
    const space = getSpace()

    if (!space) {
      return
    }

    space[k] = undefined
  }

  return { get, set, clear, getOrCreate }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const safeGetSpace = (instance: any, spaceKey: string) => {
  if (!instance[spaceKey]) {
    instance[spaceKey] = {}
  }

  return instance[spaceKey]
}

const appSpace = safeGetSpace(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Taro.getCurrentInstance().app as any,
  '__alAppShareCache__'
)
const app = cacheBuilder(() => appSpace)

const page = cacheBuilder(() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  safeGetSpace(Taro.getCurrentInstance().page as any, '__alPageShareCache__')
)

export const Cache = Object.freeze({ app, page })

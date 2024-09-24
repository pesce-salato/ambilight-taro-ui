import { encode } from 'js-base64'

const CacheMap = new Map<string, string>()

/**
 * transform svg string to base64
 * @warning avoid using large images, it will spend too much time encode
 * @param content svg string content
 * @param cache whether to enable caching, trade memory for performance
 * @returns base64 encode svg string, it can be used to image src
 */
export const toBase64Svg = (content: string, cache?: boolean) => {
  if (cache) {
    const cacheBase64 = CacheMap.get(content)

    if (cacheBase64) {
      return cacheBase64
    }
  }

  const base64 = 'data:image/svg+xml;base64,' + encode(content)

  if (cache) {
    CacheMap.set(content, base64)
  }

  return base64
}

import { encode } from 'js-base64'
import { Cache } from '@ambilight-taro/core'
import { basic } from './bem'

const cache = Cache.app.getOrCreate(basic.className, new Map<string, string>())

/**
 * 转换 svg 文本到 base64
 *
 * 主要用在展示 小 svg 动画图片上
 * @warning 不要使用此方法处理大图片，会造成卡顿
 * @warning 如果可以，尽可能使用 url
 * @warning 如果内容一致，小程序中 svg 动画将会沿用之前的动画进度
 * @param content svg 字符串文本
 * @param cacheKey 缓存 key，如果存在值，则会 base64 结果会自动存储到全局缓存中，以空间换取性能
 * @returns base64 编码图片
 */
export const toBase64Svg = (content: string, cacheKey?: string) => {
  if (cacheKey) {
    const cacheBase64 = cache.get(cacheKey)

    if (cacheBase64) {
      return cacheBase64
    }
  }

  const base64 = 'data:image/svg+xml;base64,' + encode(content)

  if (cacheKey) {
    cache.set(cacheKey, base64)
  }

  return base64
}

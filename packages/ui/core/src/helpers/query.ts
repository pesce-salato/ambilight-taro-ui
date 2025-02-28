import { createSelectorQuery, NodesRef, SelectorQuery } from '@tarojs/taro'
import { AlAbortError, AlAbortSignal } from './abort-controller'
import { formatMessage } from './format-message'

export interface QueryOptions {
  signal?: AlAbortSignal
  /**
   * 重试周期
   * @default 120ms
   */
  retryPeriod?: number
  /**
   * 最大重试次数
   * @default 6
   */
  maxRetryTimes?: number

  chain?: (reference: NodesRef) => SelectorQuery
}

export class QueryMaxRetryError extends Error {}

export const query = (filter: string | string[], options: QueryOptions = {}) => {
  const {
    retryPeriod = 120,
    signal,
    maxRetryTimes = 6,
    chain = (reference) => reference.boundingClientRect()
  } = options

  return new Promise<NodesRef.BoundingClientRectCallbackResult[]>((resolve, reject) => {
    let nextSearchTimeoutHandler = 0
    let retryCounter = 0

    signal?.addTriggerEventListener(() => {
      clearTimeout(nextSearchTimeoutHandler)
      reject(new AlAbortError(formatMessage(`query for ${filter} is aborted`)))
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const search = () => {
      chain(
        createSelectorQuery().selectAll(
          (typeof filter === 'string' ? [filter] : filter).map((item) => `#${item}`).join(',')
        )
      ).exec((result) => {
        if (!signal?.value) {
          if (result?.[0]?.[0]) {
            resolve(result[0])
          }
          // 查询失败，存在以下可能
          // - id 不正确
          // - id 对应组件还未创建
          else {
            retryCounter++

            if (retryCounter > maxRetryTimes) {
              reject(new QueryMaxRetryError(formatMessage('query 到达最大重试次数')))
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              nextSearchTimeoutHandler = setTimeout(
                search,
                retryPeriod
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) as any
            }
          }
        }
      })
    }

    search()
  })
}

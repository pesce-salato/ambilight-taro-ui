import { createSelectorQuery, NodesRef } from '@tarojs/taro'
import { CustomAbortError, CustomAbortSignal } from './custom-abort-controller'
import { formatMessage } from './format-message'

export interface QueryOptions {
  signal?: CustomAbortSignal
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
}

export class QueryMaxRetryError extends Error {}

export const query = (id: string, options: QueryOptions = {}) => {
  const { retryPeriod = 120, signal, maxRetryTimes = 6 } = options

  return new Promise<NodesRef.BoundingClientRectCallbackResult>(
    (resolve, reject) => {
      let nextSearchTimeoutHandler = 0
      let retryCounter = 0

      signal?.addTriggerEventListener(() => {
        clearTimeout(nextSearchTimeoutHandler)
        reject(
          new CustomAbortError(formatMessage(`query for ${id} is aborted`)),
        )
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const search = () => {
        createSelectorQuery()
          .select(`#${id}`)
          .boundingClientRect()
          .exec((result) => {
            // TODO: abort 记得走报错体系报错
            if (!signal?.value) {
              if (result[0]) {
                resolve(result[0])
              }
              // 查询失败，存在以下可能
              // - id 不正确
              // - id 对应组件还未创建
              else {
                retryCounter++

                if (retryCounter > maxRetryTimes) {
                  reject(
                    new QueryMaxRetryError(
                      formatMessage('query 到达最大重试次数'),
                    ),
                  )
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  nextSearchTimeoutHandler = setTimeout(
                    search,
                    retryPeriod,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ) as any
                }
              }
            }
          })
      }
    },
  )
}

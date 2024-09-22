/**
 * 生成全局唯一id
 * @param prefix guid 前缀
 */
export const uuid = (prefix: string) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  `${prefix}-xxxxxxxx-xxxx-4xxx-xxxxxxxxxxxx`.replaceAll(/[xy]/g, (c) => {
    // eslint-disable-next-line unicorn/prefer-math-trunc
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

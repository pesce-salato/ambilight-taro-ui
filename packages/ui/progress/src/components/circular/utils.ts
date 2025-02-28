/**
 * ease-in-out 插值处理
 * @param t 0-1
 */
export const easeInOut = (t: number) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

import { Abbr } from '../setting'

export const cssVar = (key: string) => {
  return `--${Abbr}-${key}`
}

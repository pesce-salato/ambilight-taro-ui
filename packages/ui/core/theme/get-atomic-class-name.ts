import { Setting } from '../setting'

export const getAtomicClassName = (
  property: string,
  symbols: string[] = [],
) => {
  return [Setting.abbr, property, ...symbols].join('-')
}

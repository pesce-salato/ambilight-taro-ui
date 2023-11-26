import { Abbr } from '../setting'

export const getAtomicClassName = (
  property: string,
  symbols: string[] = [],
) => {
  return [Abbr, property, ...symbols].join('-')
}

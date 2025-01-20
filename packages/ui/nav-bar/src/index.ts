import { AlNavBarBasic } from './components/basic'
import { AlNavBarPop } from './components/pop'

export * from './components/pop/preset-trigger'
export * from './type'

export const AlNavBar = Object.freeze({
  Basic: AlNavBarBasic,
  Pop: AlNavBarPop,
})

import { AlPopup as _AlPopup } from './component'
import { functionalWrapper } from './functional'

export * from './type'
export type { AlPopupFunctionalShowSetting, AlPopupStatic } from './functional'

export const AlPopup = functionalWrapper(_AlPopup)

import { AlPopup as _AlPopup } from './component'
import { functionalWrapper } from './functional'

export const AlPopup = functionalWrapper(_AlPopup)

export { AlPopupFunctionalShowSetting, AlPopupStatic } from './functional'
export * from './component/type'

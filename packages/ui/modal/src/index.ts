import { AlModal as _AlModal } from './component'
import { functionalWrapper } from './functional'

export const AlModal = functionalWrapper(_AlModal)

export { AlModalFunctionalShowSetting, AlModalStatic } from './functional'
export * from './component/type'

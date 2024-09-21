import { getAtomicClassName } from '../get-atomic-class-name'
import { Color, ColorGradation, ExtremeColor } from '../color-palette'

const gradation = (color: Color, g: ColorGradation) => {
  return getAtomicClassName('color', [color, g])
}

const extreme = (color: ExtremeColor) => {
  return getAtomicClassName('color', ['extreme', color])
}

export const color = {
  gradation,
  extreme,
}

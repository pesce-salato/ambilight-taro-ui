import { AlNavBarPopTrigger } from '../../type'

const topIntersectBottom: AlNavBarPopTrigger = (element, navBar) => {
  return element.top < navBar.bottom
}

const bottomIntersectBottom: AlNavBarPopTrigger = (element, navBar) => {
  return element.bottom < navBar.bottom
}

export const AlNavBarPopPresetTrigger = Object.freeze({
  topIntersectBottom,
  bottomIntersectBottom
})

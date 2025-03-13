import { safeRender } from '@ambilight-taro/dynamic-render-controller'
import { AlPopup } from '../component'
import { AlPopupProps } from '../type'

export interface AlPopupFunctionalShowSetting
  extends Omit<AlPopupProps, 'visible' | '_functionCall'> {}

export interface AlPopupStatic {
  show: (
    setting: AlPopupFunctionalShowSetting,
    id?: string
  ) => {
    close: () => void
    changeSetting: (newSetting: AlPopupFunctionalShowSetting) => void
  }
}

export const functionalWrapper = (component: typeof AlPopup) => {
  const wrappedComponent = component as typeof AlPopup & AlPopupStatic

  wrappedComponent.show = (setting, targetId) => {
    let latestSetting = setting

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let deleteMyself = () => {
      // default
    }

    const controller = safeRender({
      component: AlPopup,
      targetId,
      props: {
        ...setting,
        _functionCall: true,
        visible: true,
        onHide: () => {
          latestSetting.onHide?.()
          deleteMyself()
        }
      }
    })

    deleteMyself = controller.remove

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      changeSetting: (newSetting: any = {}) => {
        latestSetting = {
          ...latestSetting,
          ...newSetting
        }
        // forbidden to set the system control props
        const { _functionCall, visible, onHide, ...others } =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          latestSetting as any

        controller.changeProps(others)
      },
      close: () => {
        controller.changeProps({ visible: false })
      }
    }
  }

  return wrappedComponent
}

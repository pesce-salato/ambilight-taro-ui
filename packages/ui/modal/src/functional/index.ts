import { safeRenderToController } from '@ambilight-taro/page-view'
import { AlModal } from '../component'
import { type AlModalProps } from '../component/type'

export interface AlModalFunctionalShowSetting
  extends Omit<AlModalProps, 'visible' | '_functionCall'> {}

export interface AlModalStatic {
  show: (
    setting: AlModalFunctionalShowSetting,
    id?: string,
  ) => {
    close: () => void
    changeSetting: (newSetting: AlModalFunctionalShowSetting) => void
  }
}

export const functionalWrapper = (component: typeof AlModal) => {
  const wrappedComponent = component as typeof AlModal & AlModalStatic

  wrappedComponent.show = (setting, targetId) => {
    let latestSetting = setting

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let deleteMyself = () => {
      // default
    }

    const controller = safeRenderToController<AlModalFunctionalShowSetting>({
      component,
      targetId,
      props: {
        ...setting,
        _functionCall: true,
        visible: true,
        _onAnimationEnd: () => {
          deleteMyself()
        },
      },
    })

    deleteMyself = controller.remove

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      changeSetting: (newSetting: AlModalFunctionalShowSetting = {}) => {
        latestSetting = {
          ...latestSetting,
          ...newSetting,
        }
        // forbidden to set the system control props
        const { _functionCall, visible, _onAnimationEnd, ...others } =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          latestSetting as any

        controller.changeProps(others)
      },
      close: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        controller.changeProps({ visible: false } as any)
      },
    }
  }

  return wrappedComponent
}

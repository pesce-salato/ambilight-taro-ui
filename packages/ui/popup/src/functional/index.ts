import { safeRender } from '@ambilight-taro/dynamic-render-controller'
import { AlPopup } from '../component'
import { AlPopupProps } from '../type'

export interface AlPopupFunctionalShowProps
  extends Omit<AlPopupProps, 'visible' | '_functionCall'> {}

export interface AlPopupStatic {
  show: (
    props: AlPopupFunctionalShowProps,
    controllerId?: string
  ) => {
    close: () => void
    changeProps: (newProps: AlPopupFunctionalShowProps) => void
  }
}

export const functionalWrapper = (component: typeof AlPopup) => {
  const wrappedComponent = component as typeof AlPopup & AlPopupStatic

  wrappedComponent.show = (props, controllerId) => {
    let latestProps = props

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let deleteMyself = () => {
      // default
    }

    const controller = safeRender({
      component: AlPopup,
      targetId: controllerId,
      props: {
        ...props,
        _functionCall: true,
        visible: true,
        onHide: () => {
          latestProps.onHide?.()
          deleteMyself()
        }
      }
    })

    deleteMyself = controller.remove

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      changeProps: (newProps: any = {}) => {
        latestProps = {
          ...latestProps,
          ...newProps
        }
        // forbidden to set the system control props
        const { _functionCall, visible, onHide, ...others } =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          latestProps as any

        controller.changeProps(others)
      },
      close: () => {
        controller.changeProps({ visible: false })
      }
    }
  }

  return wrappedComponent
}

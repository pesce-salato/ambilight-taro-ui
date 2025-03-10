# @ambilight-taro/toast

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Ftoast)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Ftoast)

## Installation

```shell
npm install @ambilight-taro/toast
```

## Usage

轻提示组件

### Functional call (recommend)

组件提供函数式调用，并进行渲染队列管理

> 如出现新的渲染，则会直接关闭之前所有渲染的 toast
>
> 但可以开启 `isBlocked` 配置，阻塞当前队列直至当前 toast 结束渲染，后续队列才可开始按照预定模式渲染

> 此功能依赖于：`@ambilight-taro/dynamic-render-controller` 提供动态渲染队列管理
> 请确保项目安装 `@ambilight-taro/dynamic-render-controller`，并且在需要展示的页面至少有一个`<AlDynamicRenderController />` 节点

```shell
npm install @ambilight-taro/dynamic-render-controller
```

```tsx
{/* 我们推荐为每一个 controller 指定一个全局唯一的 controllerId */}
{/* 但也可以省略不配置，具体用法可参考  @ambilight-taro/dynamic-render-controller*/}
<AlDynamicRenderController />
```

#### Basic

```tsx
import { AlToast } from '@ambilight-taro/toast'

AlToast.show({label: 'Hello world?'})
```
#### With icon

```tsx
import { AlLoadingIcon } from '@ambilight-taro/icon'

// icon 没有任何限制，可完全控制渲染
// 此处使用 AlLoadingIcon 仅为了方便演示
AlToast.show({label: 'Hello world?', icon: <AlLoadingIcon />})
```

#### Block render queue

阻塞渲染队列，直到当前 toast 被关闭

```tsx
AlToast.show(
  {label: 'Hello world?', icon: <AlLoadingIcon />},
  {isBlocked: true}
)
```

### Component

组件渲染模式比较简单，此处就不过多赘述，直接查看 Props 即可


## Props & Types

```tsx
interface AlToastProps {
  /**
   * 是否可见
   */
  visible: boolean
  /**
   * 图标
   */
  icon?: React.ReactNode
  /**
   * 内容标签
   */
  label?: React.ReactNode
  /**
   * @default 'bottom'
   */
  position?: AlToastPosition
  /**
   * @default 3000 ms
   */
  duration?: number
  /**
   * 自动关闭事件（duration 时间结束后调用）
   */
  onClose: () => void
  /**
   * 是否使用遮罩去拦截点击、滑动事件，避免与页面内容交互
   * @default false
   */
  mask?: boolean
  /**
   * y 轴偏移值（基于整体宽度 750 的设计稿下的尺寸）
   */
  offset?: number
  /**
   * 透传到 AlPortal 的 props
   */
  portalProps?: Omit<AlPortalProps, 'children'>
  className?: string
  style?: React.CSSProperties | string
}
```

```tsx
type AlToastPosition = "top" | "center" | "bottom"
```

```tsx
interface AlToastFunctionalConfig {
  /**
   * 目标渲染控制器 id，具体可以参考 `AlDynamicRenderController`
   * @default 不配置则会默认渲染到当前应用中“最新”（存在且最后出现）创建的控制器上
   */
  controllerId?: string
  /**
   * 是否阻塞渲染队列，直至此 toast 渲染结束
   */
  isBlocked?: boolean
}

interface AlToastStatic {
  show: (props: Omit<AlToastProps, 'visible'>, config?: AlToastFunctionalConfig) => () => void
}
```



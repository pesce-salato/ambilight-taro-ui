# @ambilight-taro/popup

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fpopup)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fpopup)

## Installation

```shell
npm install @ambilight-taro/popup
```

## Usage

弹出层

PS: 内容默认是没有背景色的（如果尝试使用好像啥也看不到，**这是特性！这不是BUG** HHHHH）

## Functional call

### Basic
```tsx
const { close, changeProps } = AlPopup.show({
  children: <View style={{ height: '128rpx', background: 'white' }}>Hey bro</View>
})

setTimeout(close, 3000)
```

### Render to special target

```tsx
AlPopup.show({children: 666}, 'AlDynamicRenderController Id')
```

## Component

### Basic

```tsx
<AlPopup visible>弹出的不只是微信，还有可恶的Ding ding</AlPopup>
```

### Position

```tsx
<AlPopup position="center">什么，我又收到了好人卡？</AlPopup>
```

### SafePadding

是否开启安全边距，默认会开启

- `position = 'bottom'` -> 底部黑条自动兼容
- `position = 'top'` -> 顶部状态栏自动兼容

```tsx
<AlPopup safePadding>Keep a safe distance</AlPopup>
```

### catchMove

是否开启根容器 `catchMove` 属性，避免出现滚动穿透，默认会开启

> - 在低版本 taro 中，catchMove 动态设置会出现问题，所以大家用的时候，设置好了就别动啦
> - 如果想要阻止穿透，但又想要内容滚动，则可以使用 ScrollView 作为弹出内容容器
> - https://docs.taro.zone/docs/3.x/vue-overall#%E4%BA%8Ccatchmove

```tsx
<AlPopup catchMove>以不变应万变</AlPopup>
```

### Others

其他的大家看一下 Props & Types 就好啦 hhh

## Props & Types

```tsx
interface AlPopupProps extends AlBaseFcProps {
  visible?: boolean
  /**
   * @default 'bottom'
   */
  position?: 'bottom' | 'center' | 'left' | 'right' | 'top'
  /**
   * 是否开启安全边距
   * - position = 'bottom' -> ios bottom safe padding
   * - position = 'top' -> status bar safe padding
   * @default true
   */
  safePadding?: boolean
  /**
   * 遮罩点击事件
   */
  onMaskClick?: (event: ITouchEvent) => void

  children: React.ReactNode
  /**
   * 透传到 AlPortal 的 props
   */
  portalProps?: Omit<AlPortalProps, 'children'>
  /**
   * 是否开启 catchMove 配置，拦截点击滚动事件，避免出现滚动穿透
   * - 请在组件初始化的时候就配置好，动态改变可能不会有预期的效果
   * - 如果此时想要实现弹出内容滚动，则可以使用 ScrollView 来做滚动处理
   * @default true
   */
  catchMove?: boolean
  /**
   * is invoked by functional call
   * @private
   */
  _functionCall?: boolean
  /**
   * 弹出动画完成事件
   */
  onAppear?: () => void
  /**
   * 收起动画完成事件
   */
  onHide?: () => void
  className?: string
  style?: React.CSSProperties | string
}
```

```tsx
interface AlPopupFunctionalShowProps extends Omit<AlPopupProps, 'visible'> {}

interface AlPopupStatic {
  show: (
    props: AlPopupFunctionalShowProps,
    controllerId?: string
  ) => {
    close: () => void
    changeProps: (newProps: AlPopupFunctionalShowProps) => void
  }
}
```




# @ambilight-taro/dynamic-render-controller

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fdynamic-render-controller)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fdynamic-render-controller)

## Installation

```shell
npm install @ambilight-taro/dynamic-render-controller
```

## Usage

动态渲染管理器（作用就和名字一样hhh）

因为在 Taro 小程序环境下，无法动态的调用 `render` 将节点渲染到页面中，故而只能退而求其次，创建一个固定的渲染管理器，手动插入到页面中，用作动态 `render`

此组件也是组件库中`AlToast.show`、`AlPopup.show`等函数式调用能力的依赖项

### Basic

```tsx
import { AlDynamicRenderController } from '@ambilight-taro/dynamic-render-controller'

// 所有动态渲染都将作为 children of AlDynamicRenderController 渲染到页面中
<AlDynamicRenderController />
```

### Set controller id(recommend)

我们推荐为每一个控制器都设置全剧唯一的 `controllerId`

`AlToast.show`、`AlPopup.show`底层调用的组件提供的`safeRender`函数能力，如果不设置明确`id`，则会默认渲染到最新创建且存在的**Controller**中

```tsx
<AlDynamicRenderController controllerId="test" />
```

### Advance

我们可以借助 `safeRender` 来实现自己的函数式调用功能

- `render` 渲染节点到控制器中（如出现错误则会直接抛出错误）
- `safeRender` 安全渲染器（如出现错误则会进入错误队列，后续在恰当时机再次尝试）

```tsx
import { safeRender } from '@ambilight-taro/dynamic-render-controller'

const showMeTheMoney = () => {
  const controller = safeRender({
    component: View,
    targetId: '',
    props: {
      children: '¥999999999'
    }
  })

  setTimeout(() => {
    controller.changeProps({
      children: '¥1000000000'
    })
  }, 1000)

  setTimeout(() => {
    controller.remove()
  }, 2000)
}
```

## Props & Types

```tsx
interface AlDynamicRenderControllerProps {
  /**
   * 控制器 id（请保持全应用唯一）
   */
  controllerId?: string
}
```

```tsx
interface RenderDetail {
  /**
   * 渲染组件
   */
  component: React.FunctionComponent<any> | React.ComponentClass<any>
  /**
   * 渲染组件 Props
   */
  props: any
  /**
   * 目标控制器 id
   */
  targetId?: string
}

type Render = <P = any>(detail: RenderDetail) => {
  /**
   * 修改 props（使用浅层合并覆盖）
   */
  changeProps: (newProps: Partial<P>) => void
  /**
   * 删除当前渲染节点
   * @returns void
   */
  remove: () => void
}
```

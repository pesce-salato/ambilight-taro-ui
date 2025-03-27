# @ambilight-taro/nav-bar

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fnav-bar)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fnav-bar)

## Installation

```shell
npm install @ambilight-taro/nav-bar
```

## Usage

导航栏组件

如果想要做沉浸式布局，请先配置 `navigationStyle: 'custom'`

组件内容区域高度默认是根据胶囊按钮位置、高度和 `statusBarHeight` 动态计算出来的（如没有胶囊按钮则直接使用默认预设高度）

> 简单的组件，没有内置的太多功能，主要用作管理导航栏渲染区域

### Basic

```tsx
import { AlNavBar } from '@ambilight-taro/nav-bar'

<AlNavBar>Hey guys</AlNavBar>
```

### Safe padding for menu button

开启配置则可以为胶囊按钮区域预留出足够的安全区域

```tsx
<AlNavBar safePaddingForMenuButton>Hey guys</AlNavBar>
```

## Props & Types

```tsx
interface AlNavBarBasicProps {
  children?: React.ReactNode
  /**
   * 是否自动根据胶囊位置，自动为内容区域添加安全边距
   * @requires Taro.getMenuButtonBoundingClientRect support https://docs.taro.zone/docs/apis/ui/menu/getMenuButtonBoundingClientRect
   * @default false
   */
  safePaddingForMenuButton?: boolean
  /**
   * 组件根节点 Id
   */
  id?: string
  className?: string
  style?: React.CSSProperties | string
}
```

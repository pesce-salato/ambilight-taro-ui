# @ambilight-taro/portal

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fportal)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fportal)

## Installation

```shell
npm install @ambilight-taro/portal
```

## Usage

传送门组件，对于 [createPortal](https://docs.taro.zone/docs/react-overall#createportal) 的简单封装

```tsx
<AlPortal>hey</AlPortal>
```

### Disabled

```tsx
<AlPortal disabled>hey</AlPortal>
```
### Set container

```tsx
<>
  <View id="test"></View>
  <AlPortal containerId="test">hey</AlPortal>
</>
```

## Props

```tsx
interface AlPortalProps {
  /**
   * 是否禁用 portal
   * @default false
   */
  disabled?: boolean
  /**
   * 容器 id
   * @default 默认将渲染到根容器
   */
  containerId?: string
  children?: any
}
```

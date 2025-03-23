# @ambilight-taro/icon

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Ficon)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Ficon)

## Installation

```shell
npm install @ambilight-taro/icon
```

## Usage

图标组件

> 由于版权等等原因，组件库不提供内置的图标，暂时只提供一个 Svg loading icon with animation

```tsx
import { AlLoadingIcon } from '@ambilight-taro/icon'

<AlLoadingIcon color="#000000" />
```

## Props & Types

```tsx
interface LoadingIconProps extends Omit<ImageProps, 'src'> {
  color?: string
}
```

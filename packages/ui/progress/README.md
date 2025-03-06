# @ambilight-taro/progress

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fprogress)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fprogress)

## Installation

```shell
npm install @ambilight-taro/progress
```

## Usage

进度条组件，包含线形/环形进度条

### Common

#### 关闭动画效果

```tsx
import { AlProgress } from '@ambilight-taro/progress'

<AlProgress.Linear withAnimation={false} />

<AlProgress.Circular withAnimation={false} />
```

### 设置动画时间

```tsx
import { AlProgress } from '@ambilight-taro/progress'

<AlProgress.Linear animationDuration={120} />

<AlProgress.Circular animationDuration={120} />
```

### Linear

线性进度条

> 其颜色、圆角、高度等配置推荐使用 css 样式覆盖

```tsx
import { AlProgress } from '@ambilight-taro/progress'

<AlProgress.Linear value={32} />
```

### Circular

环形进度条，使用 canvas 绘制，组件**宽高**与**父容器**相同，宽高的**最小值**将作为环形进度条的**圆直径**，无需手动设置尺寸高度

- **Warning**: 组件会在初始化的时候来获取宽高尺寸，故而请在组件第一次渲染的时候确保父容器宽高正确或主动设置组件本身宽高

> 环形进度条暂时不支持环形渐变色
>
> - createLinearGradient 效果不是很好，createConicGradient 小程序不支持
> - 逐像素点绘制，效率过低
> - 离屏渲染纹理图必须进行缩放处理，考虑小程序性能与最终纹理效果，暂时放弃此方案

```tsx
import { AlProgress } from '@ambilight-taro/progress'

<AlProgress.Circular value={32} />
```

#### 设置进度条颜色

```tsx
<AlProgress.Circular value={32} color={"#000000"} />
```

#### 设置进度条宽度

```tsx
<AlProgress.Circular value={32} thicknessRatio={0.1}/>
```

#### 展示进度条底部背景圆环

```tsx
<AlProgress.Circular value={32} ringColor={"#eeeeee"} />
```

#### 逆时针渲染

```tsx
<AlProgress.Circular value={32} clockwise={false} />
```

## Props

### Basic

环形、线性基础配置

```tsx
interface AlProgressProps {
  /**
   * 进度值（0-100）
   */
  value: number
  /**
   * 是否开启动画效果
   * @default true
   */
  withAnimation?: boolean
  /**
   * 动画周期（ms）
   * @default 240
   */
  animationDuration?: number
  className?: string
  style?: React.CSSProperties | string
}
```

### Linear 

```tsx
export interface AlLinearProgressProps extends AlProgressProps {}
```

### Circular

```tsx
interface AlCircularProgressProps extends AlProgressProps {
  /**
   * 圆形线宽与直径的比例
   * - 不直接设置线宽的原因在于 canvas 只接受 px 为单位，这样在不同设备上表现会出现差异
   * @default 0.05
   */
  thicknessRatio?: number
  /**
   * 进度条颜色
   * @default '#805AD5'
   */
  color?: string
  /**
   * 底部圆环颜色
   * @default undefined 不绘制环形底色
   */
  ringColor?: string
  /**
   * 是否顺时针
   * @default true
   */
  clockwise?: boolean
}
```

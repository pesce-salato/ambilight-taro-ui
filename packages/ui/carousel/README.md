# @ambilight-taro/carousel

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fcarousel)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fcarousel)

## Installation

```shell
npm install @ambilight-taro/carousel
```

## Usage

轮播图组件，每一项都可完全自定义

组件会将**每一个子节点**渲染成一个轮播选项

> 组件会在初始化的时候自动查询组件本身宽高，故而需注意：
>
> 在初次渲染的时候就保证组件的尺寸是预期且后续不改变（组件默认会和父容器高度一致，可通过样式来设定组件、选项高度）
> - `direction='horizontal'` 横向轮播则需要保证宽度不变
> - `direction='vertical'` 纵向轮播则需要保证高度不变

### Basic

```tsx
<AlCarousel>
  <View style={{ color: 'red' }}>
    0
  </View>
  <View  style={{ color: 'blue' }}>
    1
  </View>
  <View style={{ color: 'black' }}>
    2
  </View>
  <View style={{ color: 'gray' }}>
    3
  </View>
</AlCarousel>
```

### 轮播方向

```tsx
<AlCarousel direction="vertical">
  {/* children */}
</AlCarousel>
```

### 指示器样式

```tsx
<AlCarousel indicatorVariant="combine">
  {/* children */}
</AlCarousel>
```

### 指示器位置

```tsx
<AlCarousel indicatorPosition="top">
  {/* children */}
</AlCarousel>
```

### 禁用指示器

```tsx
<AlCarousel indicatorDisabled>
  {/* children */}
</AlCarousel>
```

### 调整自动切换周期

```tsx
// 禁用自动切换
<AlCarousel duration={0}>
  {/* children */}
</AlCarousel>

// 禁用自动切换
<AlCarousel duration={2000}>
  {/* children */}
</AlCarousel>
```


## Props & Types

```tsx
export interface AlCarouselProps {
  /**
   * 轮播方向
   * @default 'horizontal'
   */
  direction?: AlCarouselDirection
  /**
   * 指示器样式
   * @default 'dot'
   */
  indicatorVariant?: AlCarouselIndicatorVariant
  /**
   * 指示器位置
   * @default 'bottom'
   */
  indicatorPosition?: AlCarouselIndicatorPosition
  /**
   * 禁用指示器
   * @default false
   */
  indicatorDisabled?: boolean
  /**
   * 自动切换周期(ms)
   * - 0 代表无需自动切换
   * @default 0
   */
  duration?: number
  /**
   * 当前展示下标
   */
  value?: number
  /**
   * 当前展示下标（非受控，默认值）
   * @default 0
   */
  defaultValue?: number
  /**
   * 当前展示 index 变化事件
   */
  onChange?: (v: number) => void

  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties | string
}
```

```tsx
type AlCarouselDirection = "vertical" | "horizontal"

type AlCarouselIndicatorVariant = "combine" | "dot" | "line" | "slider"

type AlCarouselIndicatorPosition = "bottom" | "left" | "bottom-end" | "right" | "bottom-start" | "top"
```


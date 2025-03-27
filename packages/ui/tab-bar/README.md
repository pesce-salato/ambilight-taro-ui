# @ambilight-taro/tab-bar

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Ftab-bar)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Ftab-bar)

## Installation

```shell
npm install @ambilight-taro/tab-bar
```

## Usage

底部导航栏组件

> 每一个 tab 的 icon 会要求提供 inactive、active 两份渲染用作动画效果，避免切换图标产生的闪烁现象（所以大家不要觉得麻烦hh）

### Basic

```tsx
const [current, setCurrent] = useState('0')

<AlTabBar 
  current={current}
  onTabClick={(_, which) => setCurrent(which.id)}
  tabs={[
    {id: '0', title: '0', iconSource: {inactive: <Text>0</Text>, active: <Text>0</Text>}},
    {id: '1', title: '1', iconSource: {inactive: 'https://xxx.com/xxx.png', active: 'https://xxx.com/xxx.png'}}
  ]} 
/>
```

### Effect

```tsx
<AlTabBar effect="pop" />
```

### Render

自定义 Item render，不推荐使用（不然用组件的意义何在，不如自己从头写hhh）

```tsx
<AlTabBar render={(item, isActive) => <View>{item.title}</View>} />
```

## Props & Types

```tsx
interface AlTabBarProps extends AlBaseFcProps {
  /**
   * 根容器元素 key
   */
  id?: string
  /**
   * 当前活跃的 tab
   */
  current: string
  /**
   * tab 点击回调事件
   * @param event 事件对象
   * @param which 哪一个 tab 被点击
   */
  onTabClick?: (event: ITouchEvent, which: AlTabBarItem) => void
  /**
   * tab 渲染配置
   */
  tabs: AlTabBarItem[]
  /**
   * 激活态切换效果
   */
  effect?: 'pop' | 'scale'
  /**
   * item 自定义渲染器
   */
  render?: (item: AlTabBarItem, isActive: boolean) => React.ReactNode
  className?: string
  style?: React.CSSProperties | string
}
```

```tsx
interface AlTabBarItem {
  id: string
  /**
   * tab 标题
   */
  title?: React.ReactNode
  /**
   * tab icon 源
   */
  iconSource?: {
    /**
     * 激活态
     * - typeof string -> url 将使用 image 自动渲染
     * - others -> 视作 react node 节点直接渲染
     */
    active: React.ReactNode
    /**
     * 非激活态
     * - typeof string -> url 将使用 image 自动渲染
     * - others -> 视作 react node 节点直接渲染
     */
    inactive: React.ReactNode
  }
}
```

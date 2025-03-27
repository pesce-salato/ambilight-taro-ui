# @ambilight-taro/picker

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fpicker)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fpicker)

## Installation

```shell
npm install @ambilight-taro/picker
```

## Usage

选择器组件，主要用作在多个选项中快速选择某一项

> 组件会在初始化的时候自动查询组件本身的高度和选项的高度，故而需注意：
> - 在初次渲染的时候就保证**组件、选项高度是预期**的，且**后续不改变**（组件默认会和父容器高度一致，可通过样式来设定**组件、选项**高度）
> - 请保证所有的选项**高度保持一致**（出于性能考虑，组件会讲将有选项高度视作一致）

### 受控
```tsx
const [value, setValue] = useState('0')

<AlPicker 
  value={value} 
  onChange={setValue}
  options={[
    {
      id: '0',
      content: '0'
    },
    {
      id: '1',
      content: <Text>1</Text>
    },
  ]}
/>
```

### 非受控
```tsx
<AlPicker 
  defaultValue={'0'} 
  onChange={setValue}
  options={[
    {
      id: '0',
      content: '0'
    },
    {
      id: '1',
      content: <Text>1</Text>
    },
  ]}
/>
```

## Props

```tsx
interface AlPickerOption {
  /**
   * 选项渲染内容
   */
  content: React.ReactNode
  /**
   * 选项 id
   */
  id: string
}

interface AlPickerProps {
  /**
   * 选项信息
   */
  options: AlPickerOption[]
  /**
   * 选中值 id
   */
  value?: string
  /**
   * 默认选中值 id
   */
  defaultValue?: string
  /**
   * 选中值改变事件
   */
  onChange?: (value: string) => void
  className?: string
  style?: React.CSSProperties | string
}
```




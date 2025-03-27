# @ambilight-taro/date-time-picker

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fdate-time-picker)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fdate-time-picker)

## Installation

```shell
npm install @ambilight-taro/date-time-picker
```

## Usage

日期时间选择器组件，其每一列使用 `AlPicker` 进行渲染

> 组件会自动修正不符合要求的错误数据，此时会在控制台有如下 Warning
>
> 🌰 @ambilight-taro/date-time-picker: 自动转换非法值 [2025,5,30] -> [2025,5,29]

> 组件会在初始化的时候自动查询组件本身的高度和选项的高度，故而需注意：
> - 在初次渲染的时候就保证**组件、选项高度是预期**的，且**后续不改变**（组件默认会和父容器高度一致，可通过样式来设定**组件、选项**高度）
> - 请保证一列所有的选项**高度保持一致**（出于性能考虑，组件会讲将有选项高度视作一致）

### Basic

```tsx
import { AlDateTimePicker } from '@ambilight-taro/date-time-picker'

<AlDateTimePicker />
```

### 受控

```tsx
const [value, setValue] = useState([])

<AlDateTimePicker value={value} onChange={setValue}/>
```

### 非受控

```tsx
<AlDatTimePicker 
  defaultValue={[2023,1,1]} 
  onChange={e => console.log(`what a nice day`, e)}
/>
```

### 信息丰富度

```tsx
// 某一天的某分钟
<AlDateTimePicker fineness="minute-of-day"/>
```

### 设定范围

```tsx
// 只允许选择今年的日期


<AlDateTimePicker 
  range={{
    date: [
      dayjs().startOf('year').toDate().valueOf(),
      dayjs().endOf('year').toDate().valueOf()
    ]
  }} 
/>
```

### 自定义渲染

```tsx

// 中文展示月份
const formatter = useCallback<AlDateTimePickerFormatter>((column, _, detail) => {
  if (column === 'month') {
    return [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ][detail.rowValue]
  }

  return detail.rowValue.toString().padStart(2, '0')
}, [])

<AlDateTimePicker formatter={formatter}/>
```

### 自定义过滤器

```tsx
// 只允许选择工作日！

const filter = useCallback<AlDateTimePickerFilter>((column, _, detail) => {
  if (column === 'day') {
    const day = dayjs()
      .set('year', detail.currentSelectedValue[0])
      .set('month', detail.currentSelectedValue[1])
      .set('date', detail.rowValue)

    return day.day() !== 0 && day.day() !== 6
  }

  return true
}, [])

<AlDateTimePicker filter={filter}/>
```


## Props & Types

```tsx
interface AlDateTimePickerProps {
  /**
   * 选中值，其长度和每一项代表的值与 `fineness` 有关
   * - 'year' -> [year]
   * - 'month' -> [year, month]
   * - 'day' -> [year, month, day]
   * - 'hour' -> [hour]
   * - 'minute' -> [hour, minute]
   * - 'hour-of-day' -> [year, month, day, hour]
   * - 'minute-of-day' -> [year, month, day, hour, minute]
   */
  value?: number[]
  /**
   * 默认选中值，其长度和每一项代表的值与 `fineness` 有关
   * - 'year' -> [year]
   * - 'month' -> [year, month]
   * - 'day' -> [year, month, day]
   * - 'hour' -> [hour]
   * - 'minute' -> [hour, minute]
   * - 'hour-of-day' -> [year, month, day, hour]
   * - 'minute-of-day' -> [year, month, day, hour, minute]
   */
  defaultValue?: number[]
  /**
   * 值改变事件
   */
  onChange?: (v: number[]) => void

  /**
   * 日期时间选择器选择数据精细度
   * @default 'day' value -> [year,month,day]
   */
  fineness?: AlDateTimePickerFineness
  /**
   * option 自定义格式化展示
   */
  formatter?: AlDateTimePickerFormatter
  /**
   * 过滤不需要展示的项
   */
  filter?: AlDateTimePickerFilter
  /**
   * 范围设定
   */
  range?: AlDateTimePickerRange
  className?: string
  style?: React.CSSProperties | string
}
```

```tsx
interface AlDateTimePickerRange {
  /**
   * 日期范围，限定年、月、日范围（timestamp）
   * @default [五年前, 五年后]
   */
  date?: [number, number]
  /**
   * 小时范围
   * @default [0, 23]
   */
  hour?: [number, number]
  /**
   * 分钟范围
   * @default [0, 59]
   */
  minute?: [number, number]
}
```

```tsx
type AlDateTimePickerFineness = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'hour-of-day' | 'minute-of-day'


type AlDateTimePickerColumn = 'day' | 'hour' | 'minute' | 'month' | 'year'
```

```tsx
type AlDateTimePickerFormatter = (
  /**
   * 当前对应处理节点的类型
   */
  column: AlDateTimePickerColumn,
  /**
   * 列下标
   */
  columnIndex: number,
  /**
   * 上下文细节
   */
  detail: {
    /**
     * 正在处理的行对应值
     */
    rowValue: number
    /**
     * 当前整体选择的值
     */
    currentSelectedValue: number[]
  }
) => React.ReactNode
```

```tsx
type AlDateTimePickerFilter = (
  /**
   * 当前对应处理节点的类型
   */
  column: EnumValueUnion<AlDateTimePickerColumn>,
  /**
   * 列下标
   */
  columnIndex: number,
  /**
   * 上下文细节
   */
  detail: {
    /**
     * 正在处理的行对应值
     */
    rowValue: number
    /**
     * 当前整体选择的值
     * @warning 只有时间范围大于当前列的选中数据才是准确的（系统会根据设定的 range 和 filter，从大至小确认具体的范围，然后约束其值）
     */
    currentSelectedValue: number[]
  }
) => boolean
```

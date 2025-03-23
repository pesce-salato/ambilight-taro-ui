# @ambilight-taro/calendar

![NPM Version](https://img.shields.io/npm/v/%40ambilight-taro%2Fcalendar)
![NPM Downloads](https://img.shields.io/npm/dm/%40ambilight-taro%2Fcalendar)

## Installation

```shell
npm install @ambilight-taro/calendar
```

## Usage

日历组件

> 组件中使用到了 ScrollView，故而需要给组件本身或者父级容器设置一个明确的高度
> PS：如果用到的是类似于 `45%` or `flex: 1`，则往上查找父级，直至有明确高度（100vh -> 明确高度）

### Basic

```tsx
import { AlCalendar } from '@ambilight-taro/calendar'

<AlCalendar />
```

### 受控

```tsx
const [value, setValue] = useState([])

<AlCalendar value={value} onChange={setValue}/>
```

### 非受控

```tsx
<AlCalendar 
  defaultValue={[]} 
  onChange={e => console.log(`what a nice day`, e)}
/>
```

### Range

`min`、`max` props 设定选择日期范围

```tsx
<AlCalendar min="2023-02-01" max="2023-02-15"/>
```

### Type

组件支持单选、多选、范围选择

```tsx
<AlCalendar type="multiple"/>
```

### First day of week row

设定日历每周（每一行）的第一天展示为周一还是周日

```tsx
<AlCalendar weekRowFirstDay="sun"/>
```

### Day render

自定义日期渲染器

```tsx
// 使用预设格式渲染
const dayRender = useCallback<AlCalendarDayRender>((date) => {
  return {
    main: date.day.toString().padStart(2, '0')
  }
}, [])

<AlCalendar dayRender={dayRender}/>
```

```tsx
// 完全自定义渲染，需要自行维护选中状态样式
const render = useCallback<AlCalendarDayRender>((date, status) => {
  return <View>{date.day.toString().padStart(2, '0')}</View>
}, [])

<AlCalendar dayRender={dayRender}/>
```

### Day of week title render

自定义 周每日标题渲染器（固定在上方展示每一列是周几的模块）

```tsx
const dayOfWeekTitleRender = useCallback<AlCalendarDayOfWeekTitleRender>((dayOfWeek) => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]
}, [])

<AlCalendar dayOfWeekTitleRender={dayOfWeekTitleRender}/>
```

### Month title render

自定义 月标题渲染器

```tsx
const monthTitleRender = useCallback<AlCalendarMonthTitleRender>((year, month) => {
  return (
    <View>{`${year}/${month.toString().padStart(2, '0')}`}</View>
  )
}, [])

<AlCalendar monthTitleRender={monthTitleRender}/>
```

## Preset

组件为中国阴历、节气、节假日做了 `dayRender` 预设

### Basic

```tsx
import { usePresetCnDayRender } from '@ambilight-taro/calendar'

const dayRender = usePresetCnDayRender()
```

```tsx
interface AlCalendarPresetCnBuilderOptions {
  /**
   * 是否禁用阴历
   * @default false
   */
  isLunarDisabled?: boolean
  /**
   * 是否禁用节假日
   * @default false
   */
  isHolidayDisabled?: boolean
}
```

### Lunar

阴历日期、节气等信息

> 数据来源：https://www.npmjs.com/package/solarlunar
> 支持年份：1900-2100
> 由于库体积大小等原因，故而没有选择范围更加全的库

### Holiday

公历节日、放假、补班信息

中国假日信息来源于每年国务院文件发布（故而明年的文件不发布之前无法得知）

如果需要使用默认源，请将 *https://cdn.salted-fish.org* 加入到小程序 **request合法请求域名**

> - 数据来源： https://github.com/NateScarlet/holiday-cn
> - 数据 cdn（在此感谢赛博活菩萨 cloudflare）
>   - template: https://cdn.salted-fish.org/ambilight-taro/holiday-cn/{year}.json
>   - 🌰：https://cdn.salted-fish.org/ambilight-taro/holiday-cn/2025.json

#### Custom data loader

自定义数据加载器

```tsx
// 返回类型如果是 `string` 则会视为 cdn 地址，网络请求进行加载（请提前加入 **request合法域名列表**）
// 返回类型是 `object`，则会直接使用，请保证格式正确
const loader: ((year: number) => string | CnHolidayJsonObject) | undefined = () => {
  return `https://cdn.salted-fish.org/ambilight-taro/holiday-cn/${year}.json`
}

usePresetCnDayRender.getHolidayOfYear = loader
```

```tsx
interface CnHolidayJsonObject {
  days: CnHoliday[]
}

interface CnHoliday {
  /**
   * 引起休假、补班的假日名
   */
  name: string
  /**
   * 公历日期 （YYYY-MM-DD）
   */
  date: string
  /**
   * 是否休假
   * - false 为补班
   */
  isOffDay: boolean
}
```

#### Preload

提前加载节假日信息

> 因为有缓存功能，故而需要在页面在加载完成之后调用
> 可重复调用，并不会重复发起请求

```tsx
usePresetCnDayRender.preload([dayjs().year()])
```

## Props & Types

```tsx
interface AlCalendarProps {
  /**
   * 类型
   * @default 'single'
   */
  type?: AlCalendarType
  /**
   * 自定义 日期渲染器
   */
  dayRender?: AlCalendarDayRender
  /**
   * 最小日期
   * @format YYYY-MM-DD
   * @default 三个月前
   */
  min?: string
  /**
   * 最大日期
   * @format YYYY-MM-DD
   * @default 三个月后
   */
  max?: string
  /**
   * 选择值
   * @format YYYY-MM-DD
   */
  value?: string[]
  /**
   * 默认值
   * @format YYYY-MM-DD
   */
  defaultValue?: string[]
  /**
   * 值改变事件
   */
  onChange?: (v: string[]) => void
  /**
   * 每周的第一列
   * @default 'mon' 周一
   */
  weekRowFirstDay?: AlCalendarWeekRowFirstDay
  /**
   * 自定义 周每日标题渲染器
   */
  dayOfWeekTitleRender?: AlCalendarDayOfWeekTitleRender
  /**
   * 自定义 月标题渲染器
   */
  monthTitleRender?: AlCalendarMonthTitleRender
  className?: string
  style?: React.CSSProperties | string
}
```

```tsx
type AlCalendarType = 'single' | 'range' | 'multiple'

type AlCalendarWeekRowFirstDay = 'mon' | 'sun'
```

```tsx
interface AlCalendarPresetRenderStruct {
  main: React.ReactNode
  top?: React.ReactNode
  bottom?: React.ReactNode
  className?: string
  insert?: React.ReactNode
}

type AlCalendarDayRender = (
  date: AlCalendarDate,
  status: EnumValueUnion<AlCalendarDayStatus>
) => React.ReactNode | AlCalendarPresetRenderStruct
```

```tsx
/**
 * @param dayOfWeek 0 (Sunday) to 6 (Saturday).
 */
type AlCalendarDayOfWeekTitleRender = (dayOfWeek: number) => React.ReactNode
```

```tsx
/**
 * @param month 0-11
 */
type AlCalendarMonthTitleRender = (year: number, month: number) => React.ReactNode
```

```tsx
interface AlCalendarDate {
  year: number
  /**
   * 0 - 11
   */
  month: number
  day: number
}
```

```tsx
type AlCalendarDayStatus = 'unselected' | 'range-middle' | 'range-start' | 'range-end' | 'range-start-and-end' | 'selected'
```

```tsx
interface AlCalendarReference {
  scrollTo: (year: number, month: number) => void
}
```

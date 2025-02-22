import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import { AlBasicView } from '@ambilight-taro/basic-view'
import { useCompatibleUncontrolledValue } from '@ambilight-taro/use-compatible-uncontrolled-value'
import { withDefaultProps, classnames, uuid } from '@ambilight-taro/core'
import Dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import {
  AlCalendarDayRender,
  AlCalendarDayStatus,
  AlCalendarDate,
  AlCalendarDayOfWeekTitleRender,
  AlCalendarMonthTitleRender,
  AlCalendarProps,
  AlCalendarType,
  AlCalendarWeekRowFirstDay,
  AlCalendarPresetRenderStruct,
  AlCalendarReference
} from '../type'
import { bem } from './bem'
import { DateStringFormat, toDateStringValue } from '../utils'
import './index.scss'

const defaultProps = {
  dayRender: ((date) => ({ main: date.day })) as AlCalendarDayRender,
  weekRowFirstDay: AlCalendarWeekRowFirstDay.mon as AlCalendarWeekRowFirstDay,
  type: AlCalendarType.single as AlCalendarType,
  dayOfWeekTitleRender: ((dayOfWeek) => {
    return ['日', '一', '二', '三', '四', '五', '六'][dayOfWeek]
  }) as AlCalendarDayOfWeekTitleRender,
  monthTitleRender: ((year, month) => `${year}年${month + 1}月`) as AlCalendarMonthTitleRender,
  min: Dayjs().add(-3, 'month').format(DateStringFormat),
  max: Dayjs().add(3, 'month').format(DateStringFormat),
  defaultValue: [] as string[]
}

const InvalidAnchorId = uuid(bem.root.className)

export const AlCalendar = forwardRef(
  (originalProps: AlCalendarProps, reference: React.Ref<AlCalendarReference>) => {
    const props = withDefaultProps<AlCalendarProps, typeof defaultProps>(originalProps)

    const {
      className,
      style,
      value,
      defaultValue,
      onChange,
      type,
      min,
      max,
      dayOfWeekTitleRender,
      weekRowFirstDay,
      dayRender: customDayRender,
      monthTitleRender
    } = props

    const [compatibleValue, onChangeWrapper] = useCompatibleUncontrolledValue(
      defaultValue,
      value,
      onChange
    )

    const [scrollToAnchorId, setScrollToAnchorId] = useState('')

    const guid = useMemo(() => uuid(bem.root.className), [])

    const clearScrollToAnchor = useCallback(() => {
      // 网页端不支持此功能
      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        return
      }

      setScrollToAnchorId(InvalidAnchorId)
    }, [])

    // 根据类型约束正确值类型表达
    const toConstrainedValue = useCallback(
      (v: string[]) => {
        let result: string[] = v

        if (type === AlCalendarType.single) {
          result = v.slice(0, 1)
        } else if (type === AlCalendarType.range) {
          result = v.slice(0, 2)
        }

        return result
          .map((item) => Dayjs(item))
          .sort((a, b) => (a.isBefore(b) ? -1 : 1))
          .map((date) => date.format(DateStringFormat))
      },
      [type]
    )

    const constrainedValue = useMemo(
      () => toConstrainedValue(compatibleValue),
      [toConstrainedValue, compatibleValue]
    )

    const weekColumns = useMemo(
      () =>
        weekRowFirstDay === AlCalendarWeekRowFirstDay.sun
          ? [0, 1, 2, 3, 4, 5, 6]
          : [1, 2, 3, 4, 5, 6, 0],
      [weekRowFirstDay]
    )

    const getMonthCardId = useCallback(
      (year: number, month: number) => {
        return `${guid}--${year}-${month}`
      },
      [guid]
    )

    useEffect(() => {
      // 初始状态
      if (!scrollToAnchorId) {
        const target = Dayjs(constrainedValue[0] || Date.now())

        setScrollToAnchorId(getMonthCardId(target.year(), target.month()))
      }
    }, [scrollToAnchorId, constrainedValue, getMonthCardId])

    useImperativeHandle(
      reference,
      () => ({
        scrollTo: (year, month) => setScrollToAnchorId(getMonthCardId(year, month))
      }),
      [getMonthCardId]
    )

    const dayOfWeekBarRender = useCallback(() => {
      return (
        <View className={bem.dayOfWeekBar.className}>
          {weekColumns.map((dayOfWeek) => (
            <View key={dayOfWeek} className={bem.dayOfWeekTitle.className}>
              {dayOfWeekTitleRender(dayOfWeek)}
            </View>
          ))}
        </View>
      )
    }, [weekColumns, dayOfWeekTitleRender])

    const onSomedayClick = useCallback(
      (date: AlCalendarDate) => {
        const dateStringValue = toDateStringValue(date)
        // 单选，并且与之前选中的不同（避免点击相同值反复调用 onChange）
        if (type === AlCalendarType.single && !constrainedValue.includes(dateStringValue)) {
          onChangeWrapper(toConstrainedValue([dateStringValue]))
        }
        // 多选
        else if (type === AlCalendarType.multiple) {
          const searchIndex = constrainedValue.indexOf(dateStringValue)
          const result = [...constrainedValue]
          if (searchIndex >= 0) {
            result.splice(searchIndex, 1)
          } else {
            result.push(dateStringValue)
          }
          onChangeWrapper(toConstrainedValue(result))
        }
        // 范围选择
        else {
          // 已经选择好了范围 或者 没有选择任何范围
          if (constrainedValue.length > 1 || constrainedValue.length === 0) {
            onChangeWrapper(toConstrainedValue([dateStringValue]))
          }
          // 已经选择了一个日期，当前选择的日期是另外的日期，则完成范围选择
          else {
            onChangeWrapper(toConstrainedValue([constrainedValue[0], dateStringValue]))
          }
        }
      },
      [type, onChangeWrapper, toConstrainedValue, constrainedValue]
    )

    const getDayStatus = useCallback(
      (date: AlCalendarDate) => {
        const dateStringValue = toDateStringValue(date)

        let status: AlCalendarDayStatus = AlCalendarDayStatus.unselected

        if (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [AlCalendarType.single, AlCalendarType.multiple].includes(type as any) &&
          constrainedValue.includes(dateStringValue)
        ) {
          status = AlCalendarDayStatus.selected
        } else if (type === AlCalendarType.range) {
          if (
            constrainedValue.length === 2 &&
            Dayjs(dateStringValue).isBetween(constrainedValue[0], constrainedValue[1], 'date', '()')
          ) {
            status = AlCalendarDayStatus.rangeMiddle
          }

          if (constrainedValue[0] === dateStringValue) {
            status = AlCalendarDayStatus.rangeStart
          }

          if (constrainedValue[1] === dateStringValue) {
            status = AlCalendarDayStatus.rangeEnd
          }

          if (
            constrainedValue[0] === constrainedValue[1] &&
            constrainedValue[0] === dateStringValue
          ) {
            status = AlCalendarDayStatus.rangeStartAndEnd
          }

          if (constrainedValue.length == 1 && constrainedValue[0] === dateStringValue) {
            status = AlCalendarDayStatus.selected
          }
        }

        return status
      },
      [type, constrainedValue]
    )

    const dayRender = useCallback(
      (date: AlCalendarDate) => {
        const status = getDayStatus(date)
        const day = customDayRender(date, status)
        // 做类型转换，便于后面处理
        const structDay = day as AlCalendarPresetRenderStruct

        const isValid = Dayjs(toDateStringValue(date)).isBetween(min, max, 'date', '[]')

        return (
          <View
            className={classnames(
              bem.day.className,
              structDay.className,
              bem.day.status(status).className,
              {
                [bem.day.status('invalid').className]: !isValid
              }
            )}
            onClick={() => {
              if (isValid) {
                onSomedayClick(date)
              }
            }}
          >
            {structDay?.main ? (
              <>
                <View className={bem.day.hierarchies('main').className}>{structDay.main}</View>
                {structDay.top && (
                  <View className={bem.day.hierarchies('top').className}>{structDay.top}</View>
                )}
                {structDay.bottom && (
                  <View className={bem.day.hierarchies('bottom').className}>
                    {structDay.bottom}
                  </View>
                )}
                {structDay.insert}
              </>
            ) : (
              (day as React.ReactNode)
            )}
          </View>
        )
      },
      [getDayStatus, customDayRender, onSomedayClick, min, max]
    )

    const monthRender = useCallback(
      (year: number, month: number) => {
        const firstDay = Dayjs().set('year', year).set('month', month).startOf('month')
        const lastDay = Dayjs().set('year', year).set('month', month).endOf('month')

        const columnOfMonthStart = weekColumns.indexOf(firstDay.day())
        const grid: React.ReactNode[][] = []

        for (let day = 1; day <= lastDay.date(); day++) {
          const rowIndex = Math.floor((day + columnOfMonthStart - 1) / weekColumns.length)
          const columnIndex = (day + columnOfMonthStart - 1) % weekColumns.length

          if (!grid[rowIndex]) {
            grid[rowIndex] = []
          }

          grid[rowIndex][columnIndex] = dayRender({ year, month, day })
        }

        return (
          <View id={getMonthCardId(year, month)} className={bem.monthCard.className}>
            <View className={bem.monthTitle.className}>{monthTitleRender(year, month)}</View>
            <View className={bem.monthGrid.className}>
              {grid.map((columns, rowIndex) => {
                return (
                  <View
                    key={rowIndex}
                    className={bem.monthRow.className}
                    style={
                      {
                        ['--al-calendar-week-start-empty-day-count']: columns.findIndex(Boolean),
                        ['--al-calendar-week-end-empty-day-count']: 7 - columns.length
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      } as any
                    }
                  >
                    {columns.map((day, columnIndex) => (
                      <Fragment key={columnIndex}>{day}</Fragment>
                    ))}
                  </View>
                )
              })}
              <View className={bem.monthTooltip.className}>{month + 1}</View>
            </View>
          </View>
        )
      },
      [weekColumns, dayRender, monthTitleRender, getMonthCardId]
    )

    const scrollContent = useMemo(() => {
      const start = Dayjs(min)
      const end = Dayjs(max)

      const months: { node: React.ReactNode; id: string }[] = []

      for (let year = start.year(); year <= end.year(); year++) {
        for (
          let month = year === start.year() ? start.month() : 0;
          month <= (year === end.year() ? end.month() : 11);
          month++
        ) {
          months.push({ node: monthRender(year, month), id: getMonthCardId(year, month) })
        }
      }

      return (
        <View className={bem.scrollContent.className}>
          {months.map(({ node, id }) => (
            <Fragment key={id}>{node}</Fragment>
          ))}
        </View>
      )
    }, [min, max, monthRender, getMonthCardId])

    return (
      <AlBasicView className={classnames(className, bem.root.className)} style={style}>
        {dayOfWeekBarRender()}
        <ScrollView
          className={bem.scrollContainer.className}
          scrollY
          scrollIntoView={scrollToAnchorId}
          onScroll={clearScrollToAnchor}
        >
          {scrollContent}
        </ScrollView>
      </AlBasicView>
    )
  }
)

AlCalendar.defaultProps = defaultProps

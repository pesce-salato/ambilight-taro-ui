import React, { useCallback, useMemo } from 'react'
import { Bem, withDefaultProps } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import { useCompatibleUncontrolledValue } from '@ambilight-taro/use-compatible-uncontrolled-value'
import { AlPicker, AlPickerOption } from '@ambilight-taro/picker'
import Dayjs from 'dayjs'
import {
  AlDateTimePickerColumn,
  AlDateTimePickerFilter,
  AlDateTimePickerFineness,
  AlDateTimePickerFormatter,
  AlDateTimePickerProps
} from '../type'
import { calcRenderColumns, calcValidColumnValues } from './utils'
import './index.scss'

const defaultFormatter: AlDateTimePickerFormatter = (column, _columnIndex, { rowValue }) => {
  const displayValue = column === AlDateTimePickerColumn.month ? rowValue + 1 : rowValue
  return (
    <View className={root.hierarchies('preset-row').className}>
      {column === AlDateTimePickerColumn.year
        ? displayValue
        : displayValue.toString().padStart(2, '0')}
    </View>
  )
}

const defaultProps = {
  fineness: AlDateTimePickerFineness.day as AlDateTimePickerFineness,
  defaultValue: [] as number[],
  filter: (() => true) as AlDateTimePickerFilter,
  formatter: defaultFormatter
}

const root = new Bem('date-time-picker')

export const AlDatTimePicker = (originalProps: AlDateTimePickerProps) => {
  const props = withDefaultProps<AlDateTimePickerProps, typeof defaultProps>(originalProps)

  const { fineness, value, defaultValue, onChange, range, filter, formatter } = props

  const [compatibleValue, onChangeWrapper] = useCompatibleUncontrolledValue(
    defaultValue,
    value,
    onChange
  )

  const renderColumns = useMemo(() => calcRenderColumns(fineness), [fineness])

  const getColumnRange = useCallback(
    (column: AlDateTimePickerColumn) => {
      const {
        date = [
          Dayjs().add(-5, 'year').toDate().valueOf(),
          Dayjs().add(5, 'year').toDate().valueOf()
        ],
        hour = [0, 23],
        minute = [0, 59]
      } = range || {}

      let result = date

      if (column === AlDateTimePickerColumn.hour) {
        result = hour
      } else if (column === AlDateTimePickerColumn.minute) {
        result = minute
      }

      return result
    },
    [range]
  )

  const toValid = useCallback(
    (needCheckValue: number[]) => {
      const result = [...needCheckValue]
      // 从头至尾重复校验值是否有效
      for (const [columnIndex, column] of renderColumns.entries()) {
        const checkValue = result[columnIndex]
        const validColumnValues = calcValidColumnValues(
          column,
          getColumnRange(column),
          columnIndex,
          result,
          filter
        )

        // 值不在有效范围之内
        if (!validColumnValues.includes(checkValue)) {
          // 寻找最近的值
          result[columnIndex] =
            validColumnValues.reverse().find((v) => checkValue - v >= 0) || validColumnValues[0]
        }
      }

      return result
    },
    [renderColumns, getColumnRange, filter]
  )

  const onColumnValueChange = useCallback(
    (_column: AlDateTimePickerColumn, columnIndex: number, v: number) => {
      const newValue = [...compatibleValue]
      newValue[columnIndex] = v

      onChangeWrapper(toValid(newValue))
    },
    [compatibleValue, onChangeWrapper, toValid]
  )

  const pickers = useMemo(() => {
    return renderColumns.map((column, columnIndex) => {
      return {
        column,
        options: calcValidColumnValues(
          column,
          getColumnRange(column),
          columnIndex,
          compatibleValue,
          filter
        ).map<AlPickerOption>((rowValue) => ({
          id: rowValue.toString(),
          content: formatter(column, columnIndex, {
            rowValue,
            currentSelectedValue: compatibleValue
          })
        }))
      }
    })
  }, [compatibleValue, renderColumns, formatter, getColumnRange, filter])

  return (
    <View className={root.className}>
      {pickers.map((picker, columnIndex) => (
        <View className={root.hierarchies('column').className} key={picker.column}>
          <AlPicker
            options={picker.options}
            value={compatibleValue[columnIndex].toString()}
            onChange={(v) => {
              onColumnValueChange(picker.column, columnIndex, Number(v))
            }}
          />
        </View>
      ))}
    </View>
  )
}

AlDatTimePicker.defaultProps = defaultProps

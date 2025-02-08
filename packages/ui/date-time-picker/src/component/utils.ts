/* eslint-disable @typescript-eslint/no-explicit-any */
import Dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { AlDateTimePickerColumn, AlDateTimePickerFilter, AlDateTimePickerFineness } from '../type'

Dayjs.extend(isBetween)

export const calcRenderColumns = (fineness: AlDateTimePickerFineness): AlDateTimePickerColumn[] => {
  const result: AlDateTimePickerColumn[] = []

  const isOnlyNeedTime = [AlDateTimePickerFineness.minute, AlDateTimePickerFineness.hour].includes(
    fineness as any
  )

  if (!isOnlyNeedTime) {
    result.push(AlDateTimePickerColumn.year)
  }

  if (!isOnlyNeedTime && fineness !== AlDateTimePickerFineness.year) {
    result.push(AlDateTimePickerColumn.month)
  }

  if (
    !isOnlyNeedTime &&
    ![AlDateTimePickerFineness.year, AlDateTimePickerFineness.month].includes(fineness as any)
  ) {
    result.push(AlDateTimePickerColumn.day)
  }

  if (
    isOnlyNeedTime ||
    [AlDateTimePickerFineness.hourOfDay, AlDateTimePickerFineness.minuteOfDay].includes(
      fineness as any
    )
  ) {
    result.push(AlDateTimePickerColumn.hour)
  }

  if (
    [AlDateTimePickerFineness.minute, AlDateTimePickerFineness.minuteOfDay].includes(
      fineness as any
    )
  ) {
    result.push(AlDateTimePickerColumn.minute)
  }

  return result
}

export const calcValidColumnValues = (
  column: AlDateTimePickerColumn,
  range: [number, number],
  columnIndex: number,
  currentSelectedValue: number[],
  filter: AlDateTimePickerFilter
) => {
  const result: number[] = []

  switch (column) {
    case AlDateTimePickerColumn.year: {
      for (let year = Dayjs(range[0]).get('year'); year <= Dayjs(range[1]).get('year'); year++) {
        if (
          filter(column, columnIndex, {
            rowValue: year,
            currentSelectedValue
          })
        ) {
          result.push(year)
        }
      }

      break
    }
    case AlDateTimePickerColumn.month: {
      for (let month = 0; month < 12; month++) {
        if (
          filter(column, columnIndex, {
            rowValue: month,
            currentSelectedValue
          }) &&
          Dayjs()
            .set('year', currentSelectedValue[columnIndex - 1])
            .set('month', month)
            .isBetween(range[0], range[1], 'month', '[]')
        ) {
          result.push(month)
        }
      }

      break
    }
    case AlDateTimePickerColumn.day: {
      const belong = Dayjs()
        .set('year', currentSelectedValue[columnIndex - 2])
        .set('month', currentSelectedValue[columnIndex - 1])

      for (let day = 1; day < belong.endOf('month').date(); day++) {
        if (
          filter(column, columnIndex, {
            rowValue: day,
            currentSelectedValue
          }) &&
          belong.set('date', day).isBetween(range[0], range[1], 'date', '[]')
        ) {
          result.push(day)
        }
      }

      break
    }
    default: {
      for (let value = range[0]; value <= range[1]; value++) {
        if (
          filter(column, columnIndex, {
            rowValue: value,
            currentSelectedValue
          })
        ) {
          result.push(value)
        }
      }
    }
  }

  return result
}

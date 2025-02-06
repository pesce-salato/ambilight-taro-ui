import Dayjs from 'dayjs'
import {
  AlDateTimePickerColumn,
  AlDateTimePickerFilter,
  AlDateTimePickerFineness,
} from '../type'

export const calcRenderColumns = (
  fineness: AlDateTimePickerFineness,
): AlDateTimePickerColumn[] => {}

export const calcRenderValues = (
  column: AlDateTimePickerColumn,
  range: [number, number],
  columnIndex: number,
  currentSelectedValue: number[],
  filter: AlDateTimePickerFilter,
) => {
  const result: number[] = []

  if (column === AlDateTimePickerColumn.year) {
    for (
      let year = Dayjs(range[0]).get('year');
      year <= Dayjs(range[1]).get('year');
      year++
    ) {
      if (
        filter(column, {
          rowValue: year,
          columnSelectedValue: currentSelectedValue[columnIndex],
          currentSelectedValue,
        })
      ) {
        result.push(year)
      }
    }
  }

  return result
}

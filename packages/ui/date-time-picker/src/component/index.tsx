import React, { useCallback, useMemo } from 'react'
import { withDefaultProps } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import { useCompatibleUncontrolledValue } from '@ambilight-taro/use-compatible-uncontrolled-value'
import { AlPicker, AlPickerOption } from '@ambilight-taro/picker'
import Dayjs from 'dayjs'
import {
  AlDateTimePickerColumn,
  AlDateTimePickerFineness,
  AlDateTimePickerProps,
} from '../type'
import './index.scss'

const defaultProps = {
  fineness: AlDateTimePickerFineness.day as AlDateTimePickerFineness,
  defaultValue: [] as number[],
}

export const AlDatTimePicker = (originalProps: AlDateTimePickerProps) => {
  const props = withDefaultProps<AlDateTimePickerProps, typeof defaultProps>(
    originalProps,
  )

  const { fineness, value, defaultValue, onChange, range } = props

  const [compatibleValue, onChangeWrapper] = useCompatibleUncontrolledValue(
    defaultValue,
    value,
    onChange,
  )

  const onColumnValueChange = useCallback(
    (column: AlDateTimePickerColumn, index: number, v: number) => {},
    [],
  )

  const pickers = useMemo(() => {
    const {
      date = [
        Dayjs().add(-5, 'year').toDate().valueOf(),
        Dayjs().add(5, 'year').toDate().valueOf(),
      ],
      hour = [0, 23],
      minute = [0, 59],
    } = range || {}
  }, [compatibleValue, fineness, range])

  return <View></View>
}

AlDatTimePicker.defaultProps = defaultProps

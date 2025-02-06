import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { Text, View } from '@tarojs/components'
import './index.scss'
import { AlPicker } from '@ambilight-taro/picker'

const root = new Bem('page-picker', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState('2')

  return (
    <AlPageView id="page-carousel" className={root.className}>
      <View className={root.hierarchies('container').className}>
        <View
          onClick={() => setValue(Math.floor(Math.random() * 6).toString())}
        >
          test
        </View>
        {value}
        <AlPicker
          value={value}
          onChange={setValue}
          options={[
            {
              id: '0',
              content: <Text>0</Text>,
            },
            {
              id: '1',
              content: <Text>1</Text>,
            },
            {
              id: '2',
              content: <Text>2</Text>,
            },
            {
              id: '3',
              content: <Text>3</Text>,
            },
            {
              id: '4',
              content: <Text>4</Text>,
            },
            {
              id: '5',
              content: <Text>5</Text>,
            },
          ]}
        />
      </View>
    </AlPageView>
  )
}

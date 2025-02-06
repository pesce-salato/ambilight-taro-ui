import React, { useMemo, useRef, useState } from 'react'
import { AlPageView } from '@ambilight-taro/page-view'
import { Bem } from '@ambilight-taro/core'
import { View } from '@tarojs/components'
import './index.scss'
import { AlCarousel } from '@ambilight-taro/carousel'

const root = new Bem('page-carousel', undefined, undefined, false)

export default () => {
  const [value, setValue] = useState(1)

  return (
    <AlPageView id="page-carousel" className={root.className}>
      <View className={root.hierarchies('container').className}>
        <View onClick={() => setValue(Math.floor(Math.random() * 4))}>
          Test
        </View>
        {value}
        <AlCarousel
          value={value}
          onChange={setValue}
          className={root.hierarchies('carousel').className}
          duration={2000}
          indicatorVariant="dot"
          indicatorPosition="bottom"
          // direction="vertical"
        >
          <View
            className={root.hierarchies('item').className}
            style={{ background: 'red' }}
          >
            0
          </View>
          <View
            className={root.hierarchies('item').className}
            style={{ background: 'blue' }}
          >
            1
          </View>
          <View
            className={root.hierarchies('item').className}
            style={{ background: 'black' }}
          >
            2
          </View>
          <View
            className={root.hierarchies('item').className}
            style={{ background: 'gray' }}
          >
            3
          </View>
        </AlCarousel>
      </View>
    </AlPageView>
  )
}

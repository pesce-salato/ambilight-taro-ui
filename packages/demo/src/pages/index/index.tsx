import { Text, View, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AlButton } from '@ambilight-taro/button'
import { AlLoadingIcon } from '@ambilight-taro/icon'
import { AlPageView } from '@ambilight-taro/page-view'
import { AlPortal } from '@ambilight-taro/portal'
import { AppShareCache, PageShareCache } from '@ambilight-taro/core'
import { AlToast } from '@ambilight-taro/toast'
import './index.scss'

const Test = (props: { text: string }) => {
  useEffect(() => {
    console.error('mount')

    return () => console.error('destroy')
  }, [])

  return <Text>{props.text}</Text>
}
const Index = (props) => {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const [showPageView, setShowPageView] = useState(false)

  const [test, setTest] = useState(false)
  const [number_, setNumber] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setNumber((pre) => pre + 1)
    }, 2000)
  }, [])

  const a = useRef(0)

  const show = useCallback((blocked: boolean) => {
    AlToast.show(
      {
        label: 'toast: ' + a.current.toString(),
        icon: blocked ? <AlLoadingIcon /> : undefined,
      },
      { isBlocked: blocked },
    )
    a.current++
  }, [])

  return (
    <>
      <View className="index" id="test">
        <View onClick={() => show(true)}>show blocked</View>
        <View onClick={() => show(false)}>show toast</View>
        <View onClick={() => setShowPageView(true)}>show page view</View>
        <View onClick={() => setTest((pre) => !pre)}>Hello world!</View>
        <View id="test-container"></View>
        <AlLoadingIcon className="test" />
        <AlButton></AlButton>
        <View>
          <View>
            {test && (
              <AlPortal containerId="test-container">
                <Test text={number_.toString()} />
                <Text className="test">{number_}</Text>
              </AlPortal>
            )}
          </View>
        </View>
        {/* <AlToast
          position="top"
          visible
          offset={64}
          mask
          label="loading"
          icon={<AlLoadingIcon />}
        /> */}
      </View>
      {showPageView && <AlPageView>Page view</AlPageView>}
    </>
  )
}

export default () => {
  return (
    <View>
      <Index />
    </View>
  )
}

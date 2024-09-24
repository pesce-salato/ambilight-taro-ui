import { Text, View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useEffect } from 'react'
import { AlButton } from '@ambilight-taro/button'
import './index.scss'
import { LoadingIcon } from '@ambilight-taro/icon'

const Index = (props) => {
  useLoad(() => {
    console.log('Page loaded.')
  })

  useEffect(() => {
    console.log('enter')
  }, [])

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <LoadingIcon className="test" />
      <AlButton></AlButton>
    </View>
  )
}

export default () => {
  return (
    <View>
      <Index />
    </View>
  )
}

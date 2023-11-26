import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useEffect } from 'react'
import { AlButton } from '@ambilight-taro/button'
import './index.scss'

const Index = (props) => {
  useLoad(() => {
    console.log('Page loaded.')
  })

  useEffect(() => {
    console.log('enter')
  }, [])

  return (
    <View className="index test">
      <Text>Hello world!</Text>
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

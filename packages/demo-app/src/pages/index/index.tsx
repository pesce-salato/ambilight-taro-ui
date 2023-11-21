import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useEffect } from 'react'
import {
  AlBaseFcProps,
  Color,
  ColorGradation,
  getGradationColor,
  useTheme,
  WithThemeProps,
} from '@ambilight-taro/ui'
import './index.scss'

const Index = (props: AlBaseFcProps & WithThemeProps) => {
  const { colorScheme } = useTheme(props)

  console.error(colorScheme)
  useLoad(() => {
    console.log('Page loaded.')
  })

  useEffect(() => {
    console.log('enter')
  }, [])

  return (
    <View className="index test">
      <Text>Hello world!</Text>
      <Text className={getGradationColor(colorScheme, ColorGradation.g500)}>
        Red
      </Text>
    </View>
  )
}

export default () => {
  return (
    <View>
      <Index colorScheme={Color.orange} />
      <Index />
    </View>
  )
}

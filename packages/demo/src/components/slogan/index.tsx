import { Text, View } from '@tarojs/components'
import { Bem } from '@ambilight-taro/core'
import './index.scss'

const root = new Bem('slogan', undefined, undefined, false)

export const Slogan = () => {
  return (
    <View className={root.className}>
      {[...'Ambilight'].map((char, index) => (
        <Text key={index} className={root.hierarchies('char').className}>
          {char}
        </Text>
      ))}
    </View>
  )
}

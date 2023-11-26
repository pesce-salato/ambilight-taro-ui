import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { AlContext } from '@ambilight-taro/context'
import '@ambilight-taro/core/lib/theme.css'
import { Color } from '@ambilight-taro/core'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <AlContext.Provider
      value={{
        colorScheme: Color.orange,
      }}
    >
      {children}
    </AlContext.Provider>
  )
}

export default App

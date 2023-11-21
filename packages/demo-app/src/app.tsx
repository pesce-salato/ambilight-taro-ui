import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { AlContext, Color } from '@ambilight-taro/ui'
import '@ambilight-taro/ui/dist/index.css'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <AlContext.Provider
      value={{
        colorScheme: Color.red,
      }}
    >
      {children}
    </AlContext.Provider>
  )
}

export default App

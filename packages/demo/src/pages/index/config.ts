export const Config: {
  title: string
  components: { title: string; path?: string }[]
}[] = [
  {
    title: '基础',
    components: [
      {
        title: 'icon'
      },
      {
        title: 'dynamic-render-controller',
        path: '/pages/dynamic-render-controller/index'
      },
      {
        title: 'page-view'
      },
      {
        title: 'portal'
      }
    ]
  },
  {
    title: '导航',
    components: [
      {
        title: 'carousel',
        path: '/pages/carousel/index'
      },
      {
        title: 'nav-bar'
      },
      {
        title: 'tab-bar',
        path: '/pages/tab-bar/index'
      }
    ]
  },
  {
    title: '表单',
    components: [
      {
        title: 'picker',
        path: '/pages/picker/index'
      }
    ]
  },
  {
    title: '交互&反馈',
    components: [
      {
        title: 'modal'
      },
      {
        title: 'popup',
        path: '/pages/popup/index'
      },
      {
        title: 'progress',
        path: '/pages/progress/index'
      },
      {
        title: 'toast',
        path: '/pages/toast/index'
      }
    ]
  }
]

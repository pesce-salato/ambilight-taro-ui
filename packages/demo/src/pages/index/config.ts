export const Config: {
  title: string
  components: { title: string; path?: string }[]
}[] = [
  {
    title: '基础',
    components: [
      {
        title: 'icon',
        path: '/pages/icon/index'
      },
      {
        title: 'dynamic-render-controller',
        path: '/pages/dynamic-render-controller/index'
      },
      {
        title: 'portal',
        path: '/pages/portal/index'
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
        title: 'nav-bar',
        path: '/pages/nav-bar/index'
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
        title: 'date-time-picker',
        path: '/pages/date-time-picker/index'
      },
      {
        title: 'picker',
        path: '/pages/picker/index'
      }
    ]
  },
  {
    title: '数据录入&展示',
    components: [
      {
        title: 'calendar',
        path: '/pages/calendar/index'
      }
    ]
  },
  {
    title: '交互&反馈',
    components: [
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

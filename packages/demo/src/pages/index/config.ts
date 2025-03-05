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
        title: 'nav-bar'
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
        title: 'popup'
      },
      {
        title: 'progress',
        path: '/pages/progress/index'
      },
      {
        title: 'toast'
      }
    ]
  }
]

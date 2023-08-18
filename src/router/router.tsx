import LazyLoad from "./LazyLoad/LazyLoad"

const router: Route[] = [
  {
    "path": "/project",
    "element": LazyLoad(import('@/views/project/layout')),
    "label": "/project",
    "name": "/project",
    "children": [
      {
        "path": "/project/lottery",
        "element": LazyLoad(import('@/views/project/lottery/page')),
        "label": "/project/lottery",
        "name": "/project/lottery"
      }
    ]
  },
  {
    "path": "/tool",
    "element": LazyLoad(import('@/views/tool/layout')),
    "label": "/tool",
    "name": "/tool",
    "children": [
      {
        "path": "/tool/redux",
        "element": LazyLoad(import('@/views/tool/redux/page')),
        "label": "/tool/redux",
        "name": "/tool/redux"
      },
      {
        "path": "/tool/react-query",
        "element": LazyLoad(import('@/views/tool/react-query/page')),
        "label": "/tool/react-query",
        "name": "/tool/react-query"
      }
    ]
  },
  {
    "path": "/ui",
    "element": LazyLoad(import('@/views/ui/layout')),
    "label": "/ui",
    "name": "/ui",
    "children": [
      {
        "path": "/ui/shadcn",
        "element": LazyLoad(import('@/views/ui/shadcn/page')),
        "label": "/ui/shadcn",
        "name": "/ui/shadcn"
      },
      {
        "path": "/ui/daisyui",
        "element": LazyLoad(import('@/views/ui/daisyui/page')),
        "label": "/ui/daisyui",
        "name": "/ui/daisyui"
      },
      {
        "path": "/ui/headlessUi",
        "element": LazyLoad(import('@/views/ui/headlessUi/page')),
        "label": "/ui/headlessUi",
        "name": "/ui/headlessUi"
      }
    ]
  },
  {
    "path": "",
    "element": LazyLoad(import('@/views/page')),
    "label": "/",
    "name": "/"
  },
  {
    "path": "/*",
    "element": LazyLoad(import('@/views/404/page')),
    "label": "Not Found",
    "name": "Not Found",
    "isHidden": true
  }
]
export default router
export interface Route {
  path: string
  element: JSX.Element
  name: string
  label: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
}


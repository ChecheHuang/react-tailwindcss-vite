import LazyLoad from "./LazyLoad/LazyLoad"
import { RedditOutlined } from '@ant-design/icons'
import PageAntdUi from "@/views/ui/antd/page"
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
      },
      {
        "path": "/project/2022F2E/one",
        "element": LazyLoad(import('@/views/project/2022F2E/one/layout')),
        "label": "2021F2E-1",
        "name": "2021F2E-1",
        "children": [
          {
            "path": "/project/2022F2E/one",
            "element": LazyLoad(import('@/views/project/2022F2E/one/page')),
            "label": "week1",
            "name": "week1"
          }
        ]
      }
    ]
  },
  {
    "path": "/tools",
    "element": LazyLoad(import('@/views/tools/layout')),
    "label": "/tools",
    "name": "/tools",
    "children": [
      {
        "path": "/tools/zod",
        "element": LazyLoad(import('@/views/tools/zod/page')),
        "label": "/tools/zod",
        "name": "/tools/zod"
      },
      {
        "path": "/tools/pdf",
        "element": LazyLoad(import('@/views/tools/pdf/layout')),
        "label": "/tools/pdf",
        "name": "/tools/pdf",
        "children": [
          {
            "path": "/tools/pdf/2",
            "element": LazyLoad(import('@/views/tools/pdf/2/page')),
            "label": "/tools/pdf/2",
            "name": "/tools/pdf/2"
          },
          {
            "path": "/tools/pdf/1",
            "element": LazyLoad(import('@/views/tools/pdf/1/page')),
            "label": "/tools/pdf/1",
            "name": "/tools/pdf/1"
          }
        ]
      },
      {
        "path": "/tools/redux",
        "element": LazyLoad(import('@/views/tools/redux/page')),
        "label": "/tools/redux",
        "name": "/tools/redux"
      },
      {
        "path": "/tools/fabric",
        "element": LazyLoad(import('@/views/tools/fabric/page')),
        "label": "/tools/fabric",
        "name": "/tools/fabric"
      },
      {
        "path": "/tools/tailwindcss",
        "element": LazyLoad(import('@/views/tools/tailwindcss/page')),
        "label": "/tools/tailwindcss",
        "name": "/tools/tailwindcss"
      },
      {
        "path": "/tools/react-query",
        "element": LazyLoad(import('@/views/tools/react-query/page')),
        "label": "/tools/react-query",
        "name": "/tools/react-query"
      },
      {
        "path": "/tools/framerMotion",
        "element": LazyLoad(import('@/views/tools/framerMotion/page')),
        "label": "/tools/framerMotion",
        "name": "/tools/framerMotion"
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
        "path": "/ui/antd",
        "element": LazyLoad(import('@/views/ui/antd/layout')),
        "name": "Antd",
        "label": "Antd",
        "children": [
          {
            "path": "/ui/antd",
            "element": <PageAntdUi/>,
            "name": "首頁",
            "label": "首頁",
            "icon": <RedditOutlined/>
          },
          {
            "path": "/ui/antd/store_upload_list",
            "element": LazyLoad(import('@/views/ui/antd/store_upload_list/page')),
            "name": "表單列表",
            "label": "表單列表"
          },
          {
            "path": "/ui/antd/store_upload_list/:id",
            "element": LazyLoad(import('@/views/ui/antd/store_upload_list/[id]/page')),
            "name": "細節資料",
            "label": "細節資料"
          }
        ]
      },
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
    "element": LazyLoad(import('@/views/notfound/page')),
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


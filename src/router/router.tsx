import LazyLoad from "./LazyLoad/LazyLoad"
import { RedditOutlined } from "@ant-design/icons"
import UiAntdPage from "@/views/ui/antd/page"
const router: Route[] = [
  {
    "path": "",
    "element": LazyLoad(import('@/views/page')),
    "name": "/"
  },
  {
    "path": "/ui",
    "element": LazyLoad(import('@/views/ui/layout')),
    "name": "/ui",
    "children": [
      {
        "path": "/ui/antd",
        "element": LazyLoad(import('@/views/ui/antd/layout')),
        "name": "Antd",
        "children": [
          {
            "path": "/ui/antd",
            "element": <UiAntdPage/>,
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
            "name": "細節資料"
          }
        ]
      },
      {
        "path": "/ui/shadcn",
        "element": LazyLoad(import('@/views/ui/shadcn/page')),
        "name": "/ui/shadcn"
      },
      {
        "path": "/ui/daisyui",
        "element": LazyLoad(import('@/views/ui/daisyui/page')),
        "name": "/ui/daisyui"
      },
      {
        "path": "/ui/headlessUi",
        "element": LazyLoad(import('@/views/ui/headlessUi/page')),
        "name": "/ui/headlessUi"
      }
    ]
  },
  {
    "path": "/demo",
    "element": LazyLoad(import('@/views/demo/page')),
    "name": "/demo"
  },
  {
    "path": "/tools",
    "element": LazyLoad(import('@/views/tools/layout')),
    "name": "/tools",
    "children": [
      {
        "path": "/tools/pdf",
        "element": LazyLoad(import('@/views/tools/pdf/layout')),
        "name": "/tools/pdf",
        "children": [
          {
            "path": "/tools/pdf/1",
            "element": LazyLoad(import('@/views/tools/pdf/1/page')),
            "name": "/tools/pdf/1"
          },
          {
            "path": "/tools/pdf/2",
            "element": LazyLoad(import('@/views/tools/pdf/2/page')),
            "name": "/tools/pdf/2"
          }
        ]
      },
      {
        "path": "/tools/zod",
        "element": LazyLoad(import('@/views/tools/zod/page')),
        "name": "/tools/zod"
      },
      {
        "path": "/tools/i18n",
        "element": LazyLoad(import('@/views/tools/i18n/page')),
        "name": "/tools/i18n"
      },
      {
        "path": "/tools/redux",
        "element": LazyLoad(import('@/views/tools/redux/page')),
        "name": "/tools/redux"
      },
      {
        "path": "/tools/ethers",
        "element": LazyLoad(import('@/views/tools/ethers/page')),
        "name": "/tools/ethers"
      },
      {
        "path": "/tools/fabric",
        "element": LazyLoad(import('@/views/tools/fabric/page')),
        "name": "/tools/fabric"
      },
      {
        "path": "/tools/context",
        "element": LazyLoad(import('@/views/tools/context/page')),
        "name": "/tools/context"
      },
      {
        "path": "/tools/react-query",
        "element": LazyLoad(import('@/views/tools/react-query/page')),
        "name": "/tools/react-query"
      },
      {
        "path": "/tools/tailwindcss",
        "element": LazyLoad(import('@/views/tools/tailwindcss/page')),
        "name": "/tools/tailwindcss"
      },
      {
        "path": "/tools/framerMotion",
        "element": LazyLoad(import('@/views/tools/framerMotion/page')),
        "name": "/tools/framerMotion"
      },
      {
        "path": "/tools/components/step",
        "element": LazyLoad(import('@/views/tools/components/step/page')),
        "name": "/tools/components/step"
      }
    ]
  },
  {
    "path": "/project",
    "element": LazyLoad(import('@/views/project/layout')),
    "name": "/project",
    "children": [
      {
        "path": "/project/study",
        "element": LazyLoad(import('@/views/project/study/page')),
        "name": "/project/study"
      },
      {
        "path": "/project/lottery",
        "element": LazyLoad(import('@/views/project/lottery/page')),
        "name": "/project/lottery"
      },
      {
        "path": "/project/2021F2E/one",
        "element": LazyLoad(import('@/views/project/2021F2E/one/layout')),
        "label": "2021F2E-1",
        "name": "/project/2021F2E/one",
        "children": [
          {
            "path": "/project/2021F2E/one",
            "element": LazyLoad(import('@/views/project/2021F2E/one/page')),
            "label": "week1",
            "name": "/project/2021F2E/one"
          }
        ]
      }
    ]
  },
  {
    "path": "/technology",
    "element": LazyLoad(import('@/views/technology/layout')),
    "name": "/technology",
    "children": [
      {
        "path": "/technology/fp",
        "element": LazyLoad(import('@/views/technology/fp/layout')),
        "name": "/technology/fp",
        "children": [
          {
            "path": "/technology/fp/hello",
            "element": LazyLoad(import('@/views/technology/fp/hello/page')),
            "name": "/technology/fp/hello"
          },
          {
            "path": "/technology/fp/hannahpun",
            "element": LazyLoad(import('@/views/technology/fp/hannahpun/page')),
            "name": "/technology/fp/hannahpun"
          },
          {
            "path": "/technology/fp/Jing.tech",
            "element": LazyLoad(import('@/views/technology/fp/Jing.tech/page')),
            "name": "/technology/fp/Jing.tech"
          },
          {
            "path": "/technology/fp/webVillageVoyage",
            "element": LazyLoad(import('@/views/technology/fp/webVillageVoyage/page')),
            "name": "/technology/fp/webVillageVoyage"
          }
        ]
      },
      {
        "path": "/technology/進階大師指南",
        "element": LazyLoad(import('@/views/technology/進階大師指南/layout')),
        "name": "/technology/進階大師指南",
        "children": [
          {
            "path": "/technology/進階大師指南/3切版",
            "element": LazyLoad(import('@/views/technology/進階大師指南/3切版/page')),
            "name": "/technology/進階大師指南/3切版"
          },
          {
            "path": "/technology/進階大師指南/4前端架構",
            "element": LazyLoad(import('@/views/technology/進階大師指南/4前端架構/page')),
            "name": "/technology/進階大師指南/4前端架構"
          },
          {
            "path": "/technology/進階大師指南/7設計思維",
            "element": LazyLoad(import('@/views/technology/進階大師指南/7設計思維/page')),
            "name": "/technology/進階大師指南/7設計思維"
          },
          {
            "path": "/technology/進階大師指南/8網路知識",
            "element": LazyLoad(import('@/views/technology/進階大師指南/8網路知識/page')),
            "name": "/technology/進階大師指南/8網路知識"
          },
          {
            "path": "/technology/進階大師指南/5前端專案化",
            "element": LazyLoad(import('@/views/technology/進階大師指南/5前端專案化/page')),
            "name": "/technology/進階大師指南/5前端專案化"
          },
          {
            "path": "/technology/進階大師指南/6效能最佳化",
            "element": LazyLoad(import('@/views/technology/進階大師指南/6效能最佳化/page')),
            "name": "/technology/進階大師指南/6效能最佳化"
          }
        ]
      },
      {
        "path": "/technology/practice",
        "element": LazyLoad(import('@/views/technology/practice/page')),
        "name": "/technology/practice"
      },
      {
        "path": "/technology/進階大師指南/1基礎強化",
        "element": LazyLoad(import('@/views/technology/進階大師指南/1基礎強化/layout')),
        "name": "/technology/進階大師指南/1基礎強化",
        "children": [
          {
            "path": "/technology/進階大師指南/1基礎強化/1this",
            "element": LazyLoad(import('@/views/technology/進階大師指南/1基礎強化/1this/page')),
            "name": "/technology/進階大師指南/1基礎強化/1this"
          },
          {
            "path": "/technology/進階大師指南/1基礎強化/4高頻考點",
            "element": LazyLoad(import('@/views/technology/進階大師指南/1基礎強化/4高頻考點/page')),
            "name": "/technology/進階大師指南/1基礎強化/4高頻考點"
          },
          {
            "path": "/technology/進階大師指南/1基礎強化/3實現api",
            "element": LazyLoad(import('@/views/technology/進階大師指南/1基礎強化/3實現api/page')),
            "name": "/technology/進階大師指南/1基礎強化/3實現api"
          },
          {
            "path": "/technology/進階大師指南/1基礎強化/2closure",
            "element": LazyLoad(import('@/views/technology/進階大師指南/1基礎強化/2closure/page')),
            "name": "/technology/進階大師指南/1基礎強化/2closure"
          }
        ]
      },
      {
        "path": "/technology/進階大師指南/2語言進階",
        "element": LazyLoad(import('@/views/technology/進階大師指南/2語言進階/layout')),
        "name": "/technology/進階大師指南/2語言進階",
        "children": [
          {
            "path": "/technology/進階大師指南/2語言進階/5非同步不可怕",
            "element": LazyLoad(import('@/views/technology/進階大師指南/2語言進階/5非同步不可怕/page')),
            "name": "/technology/進階大師指南/2語言進階/5非同步不可怕"
          },
          {
            "path": "/technology/進階大師指南/2語言進階/7物件導向和原型",
            "element": LazyLoad(import('@/views/technology/進階大師指南/2語言進階/7物件導向和原型/page')),
            "name": "/technology/進階大師指南/2語言進階/7物件導向和原型"
          },
          {
            "path": "/technology/進階大師指南/2語言進階/8與時俱進的ES",
            "element": LazyLoad(import('@/views/technology/進階大師指南/2語言進階/8與時俱進的ES/page')),
            "name": "/technology/進階大師指南/2語言進階/8與時俱進的ES"
          },
          {
            "path": "/technology/進階大師指南/2語言進階/6手寫Promise",
            "element": LazyLoad(import('@/views/technology/進階大師指南/2語言進階/6手寫Promise/page')),
            "name": "/technology/進階大師指南/2語言進階/6手寫Promise"
          }
        ]
      }
    ]
  },
  {
    "path": "/demo/demo1",
    "element": LazyLoad(import('@/views/demo/demo1/page')),
    "name": "/demo/demo1"
  },
  {
    "path": "/*",
    "element": LazyLoad(import('@/views/404/page')),
    "name": "Not Found",
    "isHidden": true
  }
]
export default router
export interface Route {
  path: string
  element: JSX.Element
  name: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
  label?: string
}


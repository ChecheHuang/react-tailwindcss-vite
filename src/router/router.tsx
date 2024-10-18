import PageAntdUi from '@/views/ui/antd/page'
import { RedditOutlined } from '@ant-design/icons'

import LazyLoad from './LazyLoad/LazyLoad'

const router: Route[] = [
  {
    path: '/project',
    element: LazyLoad(import('@/views/project/layout')),
    label: 'project',
    name: 'project',
    children: [
      {
        path: '/project/lottery',
        element: LazyLoad(import('@/views/project/lottery/page')),
        label: 'lottery',
        name: 'lottery',
      },
      {
        path: '/project/2022F2E/one',
        element: LazyLoad(import('@/views/project/2022F2E/one/layout')),
        label: '2021F2E-1',
        name: '2021F2E-1',
        children: [
          {
            path: '/project/2022F2E/one',
            element: LazyLoad(import('@/views/project/2022F2E/one/page')),
            label: 'week1',
            name: 'week1',
          },
        ],
      },
    ],
  },
  {
    path: '/technology',
    element: LazyLoad(import('@/views/technology/layout')),
    label: 'technology',
    name: 'technology',
    children: [
      {
        path: '/technology/fp',
        element: LazyLoad(import('@/views/technology/fp/layout')),
        label: 'fp',
        name: 'fp',
        children: [
          {
            path: '/technology/fp/hello',
            element: LazyLoad(import('@/views/technology/fp/hello/page')),
            label: 'hello',
            name: 'hello',
          },
          {
            path: '/technology/fp/Jing.tech',
            element: LazyLoad(import('@/views/technology/fp/Jing.tech/page')),
            label: 'Jing.tech',
            name: 'Jing.tech',
          },
          {
            path: '/technology/fp/hannahpun',
            element: LazyLoad(import('@/views/technology/fp/hannahpun/page')),
            label: 'hannahpun',
            name: 'hannahpun',
          },
          {
            path: '/technology/fp/webVillageVoyage',
            element: LazyLoad(
              import('@/views/technology/fp/webVillageVoyage/page'),
            ),
            label: 'webVillageVoyage',
            name: 'webVillageVoyage',
          },
        ],
      },
      {
        path: '/technology/進階大師指南',
        element: LazyLoad(import('@/views/technology/進階大師指南/layout')),
        label: '進階大師指南',
        name: '進階大師指南',
        children: [
          {
            path: '/technology/進階大師指南/3切版',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/3切版/page'),
            ),
            label: '3切版',
            name: '3切版',
          },
          {
            path: '/technology/進階大師指南/8網路知識',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/8網路知識/page'),
            ),
            label: '8網路知識',
            name: '8網路知識',
          },
          {
            path: '/technology/進階大師指南/7設計思維',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/7設計思維/page'),
            ),
            label: '7設計思維',
            name: '7設計思維',
          },
          {
            path: '/technology/進階大師指南/4前端架構',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/4前端架構/page'),
            ),
            label: '4前端架構',
            name: '4前端架構',
          },
          {
            path: '/technology/進階大師指南/2語言進階',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/2語言進階/page'),
            ),
            label: '2語言進階',
            name: '2語言進階',
          },
          {
            path: '/technology/進階大師指南/1基礎強化',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/1基礎強化/page'),
            ),
            label: '1基礎強化',
            name: '1基礎強化',
          },
          {
            path: '/technology/進階大師指南/6效能最佳化',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/6效能最佳化/page'),
            ),
            label: '6效能最佳化',
            name: '6效能最佳化',
          },
          {
            path: '/technology/進階大師指南/5前端專案化',
            element: LazyLoad(
              import('@/views/technology/進階大師指南/5前端專案化/page'),
            ),
            label: '5前端專案化',
            name: '5前端專案化',
          },
        ],
      },
      {
        path: '/technology/practice',
        element: LazyLoad(import('@/views/technology/practice/page')),
        label: 'practice',
        name: 'practice',
      },
    ],
  },
  {
    path: '/tools',
    element: LazyLoad(import('@/views/tools/layout')),
    label: 'tools',
    name: 'tools',
    children: [
      {
        path: '/tools/zod',
        element: LazyLoad(import('@/views/tools/zod/page')),
        label: 'zod',
        name: 'zod',
      },
      {
        path: '/tools/pdf',
        element: LazyLoad(import('@/views/tools/pdf/layout')),
        label: 'pdf',
        name: 'pdf',
        children: [
          {
            path: '/tools/pdf/2',
            element: LazyLoad(import('@/views/tools/pdf/2/page')),
            label: '2',
            name: '2',
          },
          {
            path: '/tools/pdf/1',
            element: LazyLoad(import('@/views/tools/pdf/1/page')),
            label: '1',
            name: '1',
          },
        ],
      },
      {
        path: '/tools/i18n',
        element: LazyLoad(import('@/views/tools/i18n/page')),
        label: 'i18n',
        name: 'i18n',
      },
      {
        path: '/tools/redux',
        element: LazyLoad(import('@/views/tools/redux/page')),
        label: 'redux',
        name: 'redux',
      },
      {
        path: '/tools/fabric',
        element: LazyLoad(import('@/views/tools/fabric/page')),
        label: 'fabric',
        name: 'fabric',
      },
      {
        path: '/tools/context',
        element: LazyLoad(import('@/views/tools/context/page')),
        label: 'context',
        name: 'context',
      },
      {
        path: '/tools/tailwindcss',
        element: LazyLoad(import('@/views/tools/tailwindcss/page')),
        label: 'tailwindcss',
        name: 'tailwindcss',
      },
      {
        path: '/tools/react-query',
        element: LazyLoad(import('@/views/tools/react-query/page')),
        label: 'react-query',
        name: 'react-query',
      },
      {
        path: '/tools/framerMotion',
        element: LazyLoad(import('@/views/tools/framerMotion/page')),
        label: 'framerMotion',
        name: 'framerMotion',
      },
    ],
  },
  {
    path: '/ui',
    element: LazyLoad(import('@/views/ui/layout')),
    label: 'ui',
    name: 'ui',
    children: [
      {
        path: '/ui/antd',
        element: LazyLoad(import('@/views/ui/antd/layout')),
        name: 'Antd',
        label: 'Antd',
        children: [
          {
            path: '/ui/antd',
            element: <PageAntdUi />,
            name: '首頁',
            label: '首頁',
            icon: <RedditOutlined />,
          },
          {
            path: '/ui/antd/store_upload_list',
            element: LazyLoad(import('@/views/ui/antd/store_upload_list/page')),
            name: '表單列表',
            label: '表單列表',
          },
          {
            path: '/ui/antd/store_upload_list/:id',
            element: LazyLoad(
              import('@/views/ui/antd/store_upload_list/[id]/page'),
            ),
            name: '細節資料',
            label: '細節資料',
          },
        ],
      },
      {
        path: '/ui/shadcn',
        element: LazyLoad(import('@/views/ui/shadcn/page')),
        label: 'shadcn',
        name: 'shadcn',
      },
      {
        path: '/ui/daisyui',
        element: LazyLoad(import('@/views/ui/daisyui/page')),
        label: 'daisyui',
        name: 'daisyui',
      },
      {
        path: '/ui/headlessUi',
        element: LazyLoad(import('@/views/ui/headlessUi/page')),
        label: 'headlessUi',
        name: 'headlessUi',
      },
    ],
  },
  {
    path: '',
    element: LazyLoad(import('@/views/page')),
    label: '',
    name: '/',
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/notfound/page')),
    label: 'Not Found',
    name: 'Not Found',
    isHidden: true,
  },
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

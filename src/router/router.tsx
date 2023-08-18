import LazyLoad from './LazyLoad/LazyLoad'

const router: Route[] = [
  {
    path: '',
    element: LazyLoad(import('@/views/page')),
    label: '/',
    name: '/',
  },
  {
    path: '/daisyui',
    element: LazyLoad(import('@/views/daisyui/page')),
    label: '/daisyui',
    name: '/daisyui',
  },
  {
    path: '/headlessUi',
    element: LazyLoad(import('@/views/headlessUi/page')),
    label: '/headlessUi',
    name: '/headlessUi',
  },
  {
    path: '/lottery',
    element: LazyLoad(import('@/views/lottery/page')),
    label: '/lottery',
    name: '/lottery',
  },
  {
    path: '/react-query',
    element: LazyLoad(import('@/views/react-query/page')),
    label: '/react-query',
    name: '/react-query',
  },
  {
    path: '/shadcn',
    element: LazyLoad(import('@/views/shadcn/page')),
    label: '/shadcn',
    name: '/shadcn',
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/404/page')),
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

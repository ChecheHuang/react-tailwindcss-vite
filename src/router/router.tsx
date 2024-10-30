import LazyLoad from "./LazyLoad/LazyLoad"

const router: Route[] = [
  {
    "path": "",
    "element": LazyLoad(import('@/views/page')),
    "name": "/"
  },
  {
    "path": "/technology",
    "element": LazyLoad(import('@/views/technology/layout')),
    "name": "/technology",
    "children": [
      {
        "path": "/technology/進階大師指南",
        "element": LazyLoad(import('@/views/technology/進階大師指南/layout')),
        "name": "/technology/進階大師指南",
        "children": [
          {
            "path": "/technology/進階大師指南/2語言進階",
            "element": LazyLoad(import('@/views/technology/進階大師指南/2語言進階/page')),
            "name": "/technology/進階大師指南/2語言進階"
          }
        ]
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
            "path": "/technology/進階大師指南/1基礎強化/2closure",
            "element": LazyLoad(import('@/views/technology/進階大師指南/1基礎強化/2closure/page')),
            "name": "/technology/進階大師指南/1基礎強化/2closure"
          }
        ]
      }
    ]
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
}


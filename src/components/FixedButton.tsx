import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { cn } from '@/lib/utils'
import router, { Route } from '@/router/router'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowBigLeftDashIcon, MenuIcon } from 'lucide-react'
type MenuItem = Required<MenuProps>['items'][number]

const storageSelectKeys = JSON.parse(
  sessionStorage.getItem('selectKeys') || '[]'
)
const storageOpenKeys = JSON.parse(sessionStorage.getItem('openKeys') || '[]')
export default function FixedButton() {
  const navigate = useNavigate()
  const currentRoute = useLocation()
  const [selectKeys, setSelectKeys] = useState<string[]>(storageSelectKeys)
  const [openKeys, setOpenKeys] = useState<string[]>(storageOpenKeys)
  const { menu, keyArr } = convertRoutesToMenu(
    router.filter((value) => !!value.path)
  )
  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const key = [keys[keys.length - 1]]
    setOpenKeys(key)
    sessionStorage.setItem('openKeys', JSON.stringify(key))
  }
  const handleLink: MenuProps['onClick'] = (e) => {
    navigate(e.key)
    sessionStorage.setItem('selectKeys', JSON.stringify([e.key]))
    setSelectKeys([e.key] as string[])
  }
  useEffect(() => {
    if (!keyArr.includes(currentRoute.pathname)) {
      return
    }
    sessionStorage.setItem(
      'selectKeys',
      JSON.stringify([currentRoute.pathname])
    )
    setSelectKeys([currentRoute.pathname] as string[])
  }, [currentRoute.pathname])

  return (
    <div className="drawer drawer-end z-[1000]">
      <input id="drawer-id" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="drawer-id"
          className="drawer-button btn btn-sm btn-ghost fixed bottom-1 right-1 z-[1000]"
        >
          <MenuIcon />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-id" className="drawer-overlay"></label>
        <div
          className={cn(
            ' overflow-y-scroll w-60 h-full  text-base-content bg-gradient-to-b from-blue-200 to-pink-200 relative duration-300 ease-in-out scrollbar-none '
          )}
        >
          <Menu
            style={{ backgroundColor: 'transparent' }}
            onClick={handleLink}
            onOpenChange={handleOpenChange}
            mode="inline"
            theme="light"
            selectedKeys={selectKeys}
            openKeys={openKeys}
            items={menu}
          />
          <div className="w-full h-screen flex flex-col gap-2 scroll_y">
            <button
              className="absolute bottom-0 border-2  btn shadow-2xl btn-ghost text-primary"
              onClick={() => navigate(-1)}
            >
              <ArrowBigLeftDashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function convertRoutesToMenu(routes: Route[]): {
  menu: MenuItem[]
  keyArr: string[]
} {
  const keyArr: string[] = []

  function flattenKeysRecursive(routes: Route[]) {
    routes.forEach((route) => {
      if (!route.isHidden && !route.path.includes(':')) {
        if (!keyArr.includes(route.path)) {
          keyArr.push(route.path)
        }
      }
      if (route.children) {
        flattenKeysRecursive(route.children)
      }
    })
  }

  const menu = routes.reduce<MenuItem[]>((menu, route) => {
    if (route.isHidden || route.path.includes(':')) {
      return menu
    }

    const { path, label, icon, children } = route
    const menuItem: MenuItem = {
      key: children ? path + '/layout' : path,
      icon,
      label: label.replace('/', ''),
      ...(children && { children: convertRoutesToMenu(children).menu }),
    }
    if (!children && !!path) {
      keyArr.push(path)
    }

    return [...menu, menuItem]
  }, [])

  flattenKeysRecursive(routes)

  return { menu, keyArr }
}

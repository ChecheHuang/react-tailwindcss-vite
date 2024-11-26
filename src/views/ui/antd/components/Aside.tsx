import type { MenuProps } from 'antd'
import { Image, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'
import router, { Route } from '@/router/router'

type MenuItem = Required<MenuProps>['items'][number]

interface AsideProps {
  collapsed: boolean
}
const storageSelectKeys = JSON.parse(
  sessionStorage.getItem('selectKeys') || '[]',
)
const storageOpenKeys = JSON.parse(sessionStorage.getItem('openKeys') || '[]')
const Aside: React.FC<AsideProps> = ({ collapsed }) => {
  const antdRouter = router
    .find((value) => value.path === '/ui')
    ?.children?.find((value) => value.path === '/ui/antd')?.children
  // .find((value) => value.name === "/ui/antd")
  // console.log(antdRouter)

  const navigate = useNavigate()
  const currentRoute = useLocation()
  const [selectKeys, setSelectKeys] = useState<string[]>(storageSelectKeys)
  const [openKeys, setOpenKeys] = useState<string[]>(storageOpenKeys)
  const { menu, keyArr } = convertRoutesToMenu(antdRouter!)
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
      JSON.stringify([currentRoute.pathname]),
    )
    setSelectKeys([currentRoute.pathname] as string[])
  }, [currentRoute.pathname])
  return (
    <div
      className={cn(
        'max-h-[100vh] overflow-y-scroll bg-[#001529] scrollbar-none duration-300 ease-in-out ',
        collapsed ? 'w-20' : ' w-[200px]',
      )}
    >
      <Link to={'/setting'}>
        <div className="bg-dark sticky top-0 z-10 flex h-16 items-center justify-center  gap-3 ">
          <Image
            width={50}
            className="rounded-md"
            src={
              'https://images.pexels.com/photos/434341/pexels-photo-434341.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
            alt=""
          />
          {!collapsed && <div className="break-keep text-white ">Antd後台</div>}
        </div>
      </Link>

      <Menu
        inlineCollapsed={collapsed}
        onClick={handleLink}
        onOpenChange={handleOpenChange}
        mode="inline"
        theme="dark"
        selectedKeys={selectKeys}
        openKeys={openKeys}
        items={menu}
      />
    </div>
  )
}

export default Aside

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

    const { path, icon, children } = route
    const menuItem: MenuItem = {
      key: children ? path + '/layout' : path,
      icon,
      ...(children && { children: convertRoutesToMenu(children).menu }),
    }
    if (!children) {
      keyArr.push(path)
    }

    return [...menu, menuItem]
  }, [])

  flattenKeysRecursive(routes)

  return { menu, keyArr }
}

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { ArrowBigLeftDashIcon, MenuIcon } from 'lucide-react'
import { Fragment, useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'

import { Dialog, Transition } from '@headlessui/react'

import router, { Route } from '@/router/router'

// 使用這個函數來處理你的 router 配置
const keyArr = Array.from(
  new Set(
    flattenRoutes(router).filter(
      (path) => !path.includes(':') && !['', '/*'].includes(path),
    ),
  ),
)

function convertRoutesToMenu(routes: Route[]): MenuItem[] {
  return routes.reduce<MenuItem[]>((menu, route) => {
    if (route.isHidden || route.path.includes(':')) return menu

    const { path, label, children } = route
    const menuItem: MenuItem = {
      key: path + (children ? '/layout' : ''),
      label: label,
      children: children ? convertRoutesToMenu(children) : undefined,
    }

    menu.push(menuItem)
    return menu
  }, [])
}

const menu = convertRoutesToMenu(router)
console.log(menu)

// 使用這個函數來處理你的 router 配置

type MenuItem = {
  key: string
  label: string
  children?: MenuItem[]
}
// type MenuItem = Required<MenuProps>['items'][number]
const storageSelectKeys = JSON.parse(
  sessionStorage.getItem('selectKeys') || '[]',
)
const ProfileDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const currentRoute = useLocation()
  const [selectKeys, setSelectKeys] = useState<string[]>(storageSelectKeys)

  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const key = [keys[keys.length - 1]]
    sessionStorage.setItem('openKeys', JSON.stringify(key))
  }
  const handleLink: MenuProps['onClick'] = (e) => {
    navigate(e.key)
    sessionStorage.setItem('selectKeys', JSON.stringify([e.key]))
    setSelectKeys([e.key] as string[])
  }
  useEffect(() => {
    if (!keyArr.includes(currentRoute.pathname)) return
    sessionStorage.setItem(
      'selectKeys',
      JSON.stringify([currentRoute.pathname]),
    )
    setSelectKeys([currentRoute.pathname] as string[])
  }, [currentRoute.pathname])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className=" btn btn-ghost btn-sm fixed bottom-1 right-1 "
      >
        <MenuIcon />
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute  inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-60 max-w-md">
                    <div className="relative flex h-full w-full flex-col  overflow-y-scroll bg-white bg-gradient-to-b from-blue-200 to-pink-200 shadow-xl scrollbar-none ">
                      <Menu
                        className="mt-6"
                        style={{ backgroundColor: 'transparent' }}
                        onClick={handleLink}
                        onOpenChange={handleOpenChange}
                        mode="inline"
                        theme="light"
                        selectedKeys={selectKeys}
                        items={menu}
                      />
                    </div>
                    <div className=" absolute top-0 flex w-full items-center justify-between px-2">
                      <button
                        className=" btn btn-ghost  btn-sm border-2 text-primary shadow-2xl"
                        onClick={() => navigate(-1)}
                      >
                        <ArrowBigLeftDashIcon />
                      </button>
                      <button
                        className="btn  btn-ghost btn-sm border-2 text-primary shadow-2xl hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <IoClose size={24} aria-hidden="true" />
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ProfileDrawer

function flattenRoutes(routes: Route[]): string[] {
  const paths: string[] = []

  function recurse(routeArray: Route[]) {
    for (const route of routeArray) {
      paths.push(route.path)
      if (route.children) {
        recurse(route.children)
      }
    }
  }
  recurse(routes)
  return paths
}

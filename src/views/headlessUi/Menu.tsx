import { Fragment, useState, useRef } from 'react'
import { Transition } from '@headlessui/react'

// 導航項目資料
interface MenuItem {
  key: string
  type: string
  hidden: boolean
  label: string
  children?: MenuItem[]
}

interface MenuProps {
  data: MenuItem[]
}

// 導航項目組件
const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLUListElement>(null)

  // 判斷是否有子項目
  const hasChildren = item.children && item.children.length > 0

  // 點擊菜單項目
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li>
      {/* 導航項目 */}
      <button
        className={`flex items-center w-full text-left focus:outline-none hover:bg-gray-200 p-2 ${
          hasChildren && isOpen ? 'bg-gray-200' : ''
        }`}
        onClick={handleClick}
      >
        {item.label}
        {hasChildren && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ml-auto transition-transform ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 6L14 10L6 14V6Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* 子項目 */}
      {hasChildren && (
        <Transition
          show={isOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          ref={containerRef as React.Ref<HTMLUListElement>}
        >
          <ul className="ml-4">
            {item.children?.map((childItem) => (
              <MenuItemComponent key={childItem.key} item={childItem} />
            ))}
          </ul>
        </Transition>
      )}
    </li>
  )
}

// 菜單組件
const Menu: React.FC<MenuProps> = ({ data }) => {
  return (
    <ul className="p-4 space-y-4 w-[220px] bg-orange-200 h-[100vh]">
      {data.map((item) => (
        <MenuItemComponent key={item.key} item={item} />
      ))}
    </ul>
  )
}

export default Menu

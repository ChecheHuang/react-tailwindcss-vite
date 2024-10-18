import { useState } from 'react'
import { IoTrash } from 'react-icons/io5'

import AutoComplete from './components/AutoComplete'
import ConfirmModal from './components/ConfirmModal'
import Menu from './components/Menu'
import Select from './components/Select'

const HeadlessUI = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex bg-gray-300">
      <div className="mr-2">
        <Menu data={data} />
      </div>
      <div className="flex-1 flex gap-2  ">
        <AutoComplete />
        <Select />
        <div
          onClick={() => setConfirmOpen(true)}
          className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
            <IoTrash size={20} />
          </div>
          <div className="text-sm font-light text-neutral-600">Delete</div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  )
}
export default HeadlessUI

const data = [
  {
    key: '/',
    type: '',
    hidden: true,
    label: '首頁',
  },
  {
    key: '/login',
    type: '',
    hidden: false,
    label: '登入',
  },
  {
    key: '/layout',
    type: '',
    hidden: false,
    label: '控制台',
    children: [
      {
        key: '/layout/user',
        type: '',
        hidden: false,
        label: '目錄',
        children: [
          {
            key: '/layout/user/user',
            type: '',
            hidden: false,
            label: '使用者',
          },
        ],
      },
      {
        key: '/layout/control',
        type: '',
        hidden: false,
        label: '權限管理',
      },
    ],
  },
  {
    key: '/blog',
    type: '',
    hidden: false,
    label: '部落格',
    children: [
      {
        key: '/blog/1',
        type: '',
        hidden: false,
        label: '我的部落格',
      },
      {
        key: '/blog/2',
        type: '',
        hidden: false,
        label: '公開部落格',
      },
    ],
  },
]

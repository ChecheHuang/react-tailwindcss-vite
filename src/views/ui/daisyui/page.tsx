import React from 'react'

import Contain from './components/Contain'
import Header from './components/Header'
import Menu from './components/Menu'

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

const DaisyUi: React.FC = () => {
  return (
    <div className="flex h-screen" data-theme="light">
      <aside className=" w-52 bg-gray-200 h-full">
        <Menu data={data} />
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="bg-gray-300 h-16">
          <Header />
        </header>
        <div className="overflow-auto flex-1">
          <Contain />
        </div>
      </main>
    </div>
  )
}
export default DaisyUi

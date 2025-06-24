
import { FC, useState, MouseEvent } from 'react'

const Sidebar: FC = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(true)

  const menuItems = [
    { icon: '/src/views/tools/mcp/images/vector_67.svg', label: '资产总览', active: true },
    { icon: '/src/views/tools/mcp/images/vector_69.svg', label: '账户' },
    { icon: '/src/views/tools/mcp/images/vector_73.svg', label: '交易订单' },
    { icon: '/src/views/tools/mcp/images/vector_75.svg', label: '账户安全' },
    { icon: '/src/views/tools/mcp/images/vector_77.svg', label: '偏好设置' },
    { icon: '/src/views/tools/mcp/images/vector_79.svg', label: 'C2C设置' },
    { icon: '/src/views/tools/mcp/images/vector_81.svg', label: 'API管理' },
    { icon: '/src/views/tools/mcp/images/vector_83.svg', label: '福利中心' },
    { icon: '/src/views/tools/mcp/images/vector_85.svg', label: '好友邀请' },
  ]

  const subMenuItems = [
    '账户总览',
    '现货账户',
    '杠杆账户',
    '合约账户',
    '理财账户',
    'C2C账户',
    '充值',
    '提现',
  ]

  const toggleAccountMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsAccountOpen(!isAccountOpen)
  }

  return (
    <aside className="flex w-72 flex-col gap-2 bg-gray-50 p-4">
      {menuItems.map(({ icon, label, active }) => (
        <div key={label}>
          <a
            href="#"
            onClick={label === '账户' ? toggleAccountMenu : undefined}
            className={`flex items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold ${
              active ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <img src={icon} alt={label} className="h-6 w-6" />
            <span>{label}</span>
            {label === '账户' && (
              <svg
                className={`ml-auto h-5 w-5 transform text-gray-500 transition-transform duration-300 ${
                  isAccountOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </a>
          {label === '账户' && (
            <div
              className={`flex flex-col overflow-hidden pl-8 transition-all duration-500 ease-in-out ${
                isAccountOpen ? 'max-h-96 mt-2' : 'max-h-0'
              }`}
            >
              {subMenuItems.map(item => (
                <a
                  href="#"
                  key={item}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}

export default Sidebar

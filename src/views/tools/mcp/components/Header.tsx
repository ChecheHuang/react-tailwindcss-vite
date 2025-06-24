
import { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="flex w-full items-center justify-between bg-white px-10 py-4 shadow-md">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <img src="/src/views/tools/mcp/images/vector_1.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">HOTCOIN</span>
        </div>
        <nav className="flex items-center gap-2 rounded-full bg-gray-100 p-1">
          <button className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-gray-800 shadow-sm">
            交易所
          </button>
          <button className="rounded-full px-4 py-1 text-sm font-semibold text-gray-500">
            Web3
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          {['买币', '行情', '交易', '合约', '跟单', '理财', '更多'].map(item => (
            <a href="#" key={item} className="flex items-center gap-1 text-sm font-semibold text-gray-800">
              {item}
              {['买币', '行情', '交易', '合约', '理财', '更多'].includes(item) && (
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <img src="/src/views/tools/mcp/images/vector_25.svg" alt="Assets" className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <img src="/src/views/tools/mcp/images/vector_27.svg" alt="Orders" className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <img src="/src/views/tools/mcp/images/vector_29.svg" alt="Notifications" className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <img src="/src/views/tools/mcp/images/vector_31.svg" alt="Download" className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <img src="/src/views/tools/mcp/images/vector_33.svg" alt="Theme" className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100">
              <img src="/src/views/tools/mcp/images/vector_35.svg" alt="Language" className="h-5 w-5" />
            </button>
          </div>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <img src="/src/views/tools/mcp/images/vector_22.svg" alt="User" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

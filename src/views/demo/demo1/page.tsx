import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

// 假資料
const orderDetail = {
  orderNo: '#1234',
  date: '2024-09-13 17:59',
  name: '陳大大',
  email: 'Ryleigh65@example.net',
  desc: 'OO股份有限公司',
  tax: '12345678',
  amount: '740',
}

const tableData = [
  { ...orderDetail },
  {
    orderNo: '#1235',
    date: '2024-09-14 10:00',
    name: '林小明',
    email: 'lin@example.com',
    desc: '明股份有限公司',
    tax: '87654321',
    amount: '1200',
  },
]

const Page = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(orderDetail)
  const [selectedOrder, setSelectedOrder] = useState<typeof orderDetail | null>(
    null,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    // 儲存邏輯
    setOpen(false)
  }

  const handleSend = () => {
    // 發送邏輯
    alert('發送收據！')
  }

  const handleOpenDetail = (row: typeof orderDetail) => {
    setForm(row)
    setSelectedOrder(row)
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header */}
      <header className="bg-[#23488a] h-14 flex items-center px-6">
        <div className="text-white font-bold text-xl flex items-center gap-2">
          <span className="bg-white rounded p-1 mr-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="6" fill="#23488a" />
              <text x="8" y="22" fill="white" fontSize="16" fontFamily="Arial">
                D
              </text>
            </svg>
          </span>
          後台管理系統
        </div>
        <div className="ml-auto">
          <button className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-[#23488a]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
              />
            </svg>
          </button>
        </div>
      </header>
      {/* Main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-[#e9d9a2] flex flex-col py-8 px-4 text-[#23488a] font-semibold text-lg gap-2">
          <div className="mb-4 text-2xl font-bold">
            Desire Journey Brilliant
          </div>
          <nav className="flex flex-col gap-2">
            <a className="hover:bg-[#f5eecb] rounded px-2 py-1" href="#">
              會員管理
            </a>
            <a className="hover:bg-[#f5eecb] rounded px-2 py-1" href="#">
              訂單管理
            </a>
            <a className="hover:bg-[#f5eecb] rounded px-2 py-1" href="#">
              系統管理
            </a>
            <a className="hover:bg-[#f5eecb] rounded px-2 py-1" href="#">
              收據發送管理
            </a>
          </nav>
        </aside>
        {/* Content */}
        <main className="flex-1 bg-white rounded-tl-2xl shadow-lg p-8">
          <div className="text-2xl font-bold mb-6">訂單列表</div>
          <div className="overflow-x-auto rounded shadow bg-white">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#f8f8f8] text-[#23488a]">
                  <th className="py-2 px-4 font-semibold">訂單編號</th>
                  <th className="py-2 px-4 font-semibold">訂單日期</th>
                  <th className="py-2 px-4 font-semibold">姓名</th>
                  <th className="py-2 px-4 font-semibold">Email</th>
                  <th className="py-2 px-4 font-semibold">抬頭</th>
                  <th className="py-2 px-4 font-semibold">統編</th>
                  <th className="py-2 px-4 font-semibold">總金額</th>
                  <th className="py-2 px-4 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr
                    key={row.orderNo}
                    className="border-b last:border-b-0 hover:bg-[#f5f5f5]"
                  >
                    <td
                      className="py-2 px-4 text-blue-700 underline cursor-pointer"
                      onClick={() => handleOpenDetail(row)}
                    >
                      {row.orderNo}
                    </td>
                    <td className="py-2 px-4">{row.date}</td>
                    <td className="py-2 px-4">{row.name}</td>
                    <td className="py-2 px-4">{row.email}</td>
                    <td className="py-2 px-4">{row.desc}</td>
                    <td className="py-2 px-4">{row.tax}</td>
                    <td className="py-2 px-4">{row.amount}</td>
                    <td className="py-2 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDetail(row)}
                      >
                        檢視
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-2">
                  訂單明細
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    訂單編號
                  </div>
                  <div className="flex-1">{form.orderNo}</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    訂單日期
                  </div>
                  <div className="flex-1">{form.date}</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    姓名
                  </div>
                  <div className="flex-1">{form.name}</div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    Email
                  </div>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    抬頭
                  </div>
                  <Input
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    統編
                  </div>
                  <Input
                    name="tax"
                    value={form.tax}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-32 text-right font-semibold text-[#23488a]">
                    總金額
                  </div>
                  <Input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
              </div>
              <DialogFooter className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleSend}>
                  發送收據
                </Button>
                <Button onClick={handleSave}>儲存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}

export default Page

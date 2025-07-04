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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// 假資料
const receiptTabs = [
  { label: 'eSIM', key: 'esim' },
  { label: 'SIM', key: 'sim' },
  { label: 'KDR', key: 'kdr' },
]

const receiptData = [
  {
    id: '1',
    order: '#1004',
    date: '2024-09-13 17:59',
    name: 'Kemmer',
    email: 'Ryleigh65@example.net',
    amount: 241,
    desc: 'OO資訊股份有限公司',
    company: 'OO資訊股份有限公司',
    tax: '12345678',
    status: '成功',
    statusColor: 'text-green-600',
    createdAt: '2024-09-15 17:59',
  },
  {
    id: '2',
    order: '#1006',
    date: '2024-09-10 17:59',
    name: 'Maureen',
    email: 'Nils58@example.org',
    amount: 900,
    desc: '華信企業',
    company: '華信企業',
    tax: '65333456',
    status: '成功',
    statusColor: 'text-green-600',
    createdAt: '2024-09-15 17:59',
  },
  {
    id: '3',
    order: '#1099',
    date: '2024-08-09 17:59',
    name: 'Ruthe',
    email: 'Elenora68@example.org',
    amount: 55,
    desc: '',
    company: '',
    tax: '89753545',
    status: '失敗',
    statusColor: 'text-red-500',
    createdAt: '2024-09-15 17:59',
  },
  {
    id: '4',
    order: '#1099',
    date: '2024-08-09 12:30',
    name: 'Deanna',
    email: 'Lourdes44@example.org',
    amount: 967,
    desc: '',
    company: '',
    tax: '34567854',
    status: '成功',
    statusColor: 'text-green-600',
    createdAt: '2024-09-15 17:59',
  },
]

// 各 tab 對應資料（實務上應從 API 取得，這裡用靜態假資料）
const tabDataMap: Record<string, typeof receiptData> = {
  esim: receiptData,
  sim: [
    {
      id: '5',
      order: '#2001',
      date: '2024-09-12 10:00',
      name: 'SimUser',
      email: 'sim@example.com',
      amount: 500,
      desc: 'SIM公司',
      company: 'SIM公司',
      tax: '11112222',
      status: '成功',
      statusColor: 'text-green-600',
      createdAt: '2024-09-15 17:59',
    },
  ],
  kdr: [
    {
      id: '6',
      order: '#3001',
      date: '2024-09-10 09:00',
      name: 'KdrUser',
      email: 'kdr@example.com',
      amount: 888,
      desc: 'KDR集團',
      company: 'KDR集團',
      tax: '33334444',
      status: '失敗',
      statusColor: 'text-red-500',
      createdAt: '2024-09-15 17:59',
    },
  ],
}

const Page = () => {
  const [tab, setTab] = useState('esim')
  const [selected, setSelected] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [openGen, setOpenGen] = useState(false)
  const [openUpload, setOpenUpload] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(15)

  // 根據 tab 切換資料
  const data = tabDataMap[tab] || []

  // 勾選功能
  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }
  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([])
      setSelectAll(false)
    } else {
      setSelected(data.map((d) => d.id))
      setSelectAll(true)
    }
  }

  // 切換 tab 時清空勾選
  const handleTabChange = (key: string) => {
    setTab(key)
    setSelected([])
    setSelectAll(false)
  }

  // 上傳檔案
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 可根據需求處理檔案
    setOpenUpload(false)
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
              貼文審查管理
            </a>
            <a className="hover:bg-[#f5eecb] rounded px-2 py-1" href="#">
              使用者權限管理
            </a>
            <a
              className="bg-[#f8f8f8] text-[#23488a] rounded px-2 py-1"
              href="#"
            >
              使用者管理
            </a>
            <a className="hover:bg-[#f5eecb] rounded px-2 py-1" href="#">
              收據發送管理
            </a>
          </nav>
        </aside>
        {/* Content */}
        <main className="flex-1 bg-white rounded-tl-2xl shadow-lg p-8">
          <div className="text-2xl font-bold mb-6">收據發送管理</div>
          {/* 操作列 */}
          <div className="flex items-center gap-2 mb-4 justify-end">
            <Button variant="outline" onClick={() => setOpenGen(true)}>
              產生收據發送檔
            </Button>
            <Button variant="outline" onClick={() => setOpenUpload(true)}>
              上傳訂單csv
            </Button>
          </div>
          {/* 產生收據發送檔 Dialog */}
          <Dialog open={openGen} onOpenChange={setOpenGen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>產生收據發送檔</DialogTitle>
              </DialogHeader>
              <div>（此處可放產生收據的相關內容或提示）</div>
              <DialogFooter>
                <Button onClick={() => setOpenGen(false)}>關閉</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* 上傳訂單csv Dialog */}
          <Dialog open={openUpload} onOpenChange={setOpenUpload}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>上傳訂單csv</DialogTitle>
              </DialogHeader>
              <Input type="file" accept=".csv" onChange={handleFileChange} />
              <DialogFooter>
                <Button onClick={() => setOpenUpload(false)}>關閉</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Tabs */}
          <div className="flex gap-2 border-b mb-2">
            {receiptTabs.map((t) => (
              <button
                key={t.key}
                className={`px-4 py-2 border-b-2 font-semibold transition-colors duration-100 ${
                  tab === t.key
                    ? 'border-[#23488a] text-[#23488a] bg-white'
                    : 'border-transparent text-gray-500 bg-transparent'
                }`}
                onClick={() => handleTabChange(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* 表格 */}
          <div className="overflow-x-auto rounded shadow bg-white">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#f8f8f8] text-[#23488a]">
                  <th className="py-2 px-2 w-8">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === data.length && data.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-2 px-4 font-semibold">訂單編號</th>
                  <th className="py-2 px-4 font-semibold">日期</th>
                  <th className="py-2 px-4 font-semibold">姓名</th>
                  <th className="py-2 px-4 font-semibold">Email</th>
                  <th className="py-2 px-4 font-semibold">總金額</th>
                  <th className="py-2 px-4 font-semibold">抬頭</th>
                  <th className="py-2 px-4 font-semibold">統編</th>
                  <th className="py-2 px-4 font-semibold">狀態</th>
                  <th className="py-2 px-4 font-semibold">產生時間</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-b-0 hover:bg-[#f5f5f5]"
                  >
                    <td className="py-2 px-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </td>
                    <td className="py-2 px-4 text-blue-700 underline cursor-pointer">
                      {row.order}
                    </td>
                    <td className="py-2 px-4">{row.date}</td>
                    <td className="py-2 px-4">{row.name}</td>
                    <td className="py-2 px-4">{row.email}</td>
                    <td className="py-2 px-4">{row.amount}</td>
                    <td className="py-2 px-4">{row.desc}</td>
                    <td className="py-2 px-4">{row.tax}</td>
                    <td className={`py-2 px-4 font-bold ${row.statusColor}`}>
                      {row.status}
                    </td>
                    <td className="py-2 px-4">{row.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 分頁資訊 */}
          <div className="flex justify-end items-center mt-4 text-gray-500 text-sm">
            Rows per page：
            <Select
              value={String(rowsPerPage)}
              onValueChange={(v) => setRowsPerPage(Number(v))}
            >
              <SelectTrigger className="border rounded px-1 py-0 mx-2 w-16 h-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            1-1 of 1 &lt;&gt;
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page

import { FC } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Card from './components/Card'
import Footer from './components/Footer'

const Page: FC = () => {
  const assets = [
    { name: '现货账户', amount: '6479.789878 USDT', cny: '≈ 46595.85 CNY' },
    { name: '杠杆账户（全仓）', amount: '587.98 USDT', cny: '≈ 3789.85 CNY' },
    { name: '杠杆账户（逐仓）', amount: '587.98 USDT', cny: '≈ 3789.85 CNY' },
    { name: '合约账户（永续）', amount: '0 USDT', cny: '0 CNY' },
    { name: '合约账户（交割）', amount: '0 USDT', cny: '0 CNY' },
    { name: 'C2C账户', amount: '0 USDT', cny: '0 CNY' },
    { name: '理财账户', amount: '0 USDT', cny: '0 CNY' },
  ]

  const transactions = [
    { type: '充值', amount: '+9999.66 USDT', status: '已完成', date: '2025-06-18 18:00:00' },
    { type: '内部转账', amount: '-566.98 USDT', status: '处理中', date: '2025-06-18 18:00:00' },
    { type: '提现', amount: '-86666.88 USDT', status: '待审核', date: '2025-06-18 18:00:00' },
    { type: '内部转账', amount: '-566.98 USDT', status: '处理中', date: '2025-06-18 18:00:00' },
    { type: '充值', amount: '+6666 USDT', status: '已完成', date: '2025-06-18 18:00:00' },
    { type: '提现', amount: '-7.98 USDT', status: '已完成', date: '2025-06-18 18:00:00' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 flex flex-col gap-8">
              <Card title="账户总览">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-gray-500">总资产折合</p>
                      <button className="rounded-full p-1 hover:bg-gray-100">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-5xl font-bold text-gray-800">1234.12345678 USDT</p>
                    <p className="mt-2 text-lg text-gray-500">≈ ¥987,134.14</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-gray-500">今日盈亏</p>
                    <p className="text-lg font-semibold text-green-500">+100 USDT / 12.00%</p>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <button className="rounded-full bg-gray-800 px-6 py-2 text-white">充值</button>
                  <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-800">提现</button>
                  <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-800">买币</button>
                  <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-800">划转</button>
                </div>
              </Card>
              <Card title="我的资产">
                <div className="space-y-4">
                  {assets.map(asset => (
                    <div key={asset.name} className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">{asset.name}</p>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{asset.amount}</p>
                        <p className="text-sm text-gray-500">{asset.cny}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="col-span-1 flex flex-col gap-8">
              <Card
                title="为您推荐"
                action={
                  <div className="flex items-center gap-1">
                    <button className="h-2 w-3 rounded-full bg-green-500" />
                    <button className="h-2 w-3 rounded-full bg-gray-300" />
                    <button className="h-2 w-3 rounded-full bg-gray-300" />
                  </div>
                }
              >
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4">
                  <div>
                    <p className="text-sm text-gray-500">合约交易</p>
                    <p className="mt-2 text-lg font-semibold text-gray-800">涵盖众多加密货币衍生品</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-600">BTC/USDT</span>
                      <span className="font-medium text-red-500">$ 106,000.78</span>
                      <span className="font-medium text-red-500">-1.5%</span>
                    </div>
                  </div>
                  <img src="/src/views/tools/mcp/images/image.png" alt="Explore" className="h-24 w-24" />
                </div>
              </Card>
              <Card
                title="近期充提交易"
                action={
                  <a href="#" className="text-sm font-medium text-blue-600">
                    查看全部
                  </a>
                }
              >
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.date} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{tx.type}</p>
                        <p className="text-sm text-gray-500">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            tx.amount.startsWith('+') ? 'text-green-500' : 'text-gray-800'
                          }`}
                        >
                          {tx.amount}
                        </p>
                        <p
                          className={`text-sm ${
                            tx.status === '已完成'
                              ? 'text-green-500'
                              : tx.status === '处理中'
                              ? 'text-blue-500'
                              : 'text-yellow-500'
                          }`}
                        >
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Page
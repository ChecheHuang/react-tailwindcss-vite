
import { FC } from 'react'

const Footer: FC = () => {
  const links = {
    关于我们: ['平台介绍', '公告中心', '系统状态', '用户协议', '隐私资产', '法律说明'],
    产品: [
      '合约交易',
      '现货交易',
      '跟单',
      '杠杆交易',
      '理财赚币',
      'C2C买币',
      '信用卡买币',
      'Web3 钱包',
    ],
    服务: [
      '直播',
      '热币严选',
      '福利中心',
      '好友邀请',
      'VIP权益',
      '下载',
      '申请C2C商家',
    ],
    支持: [
      'Hotcoin学院',
      'API文档',
      '费率标准',
      '币种信息',
      '上币申请',
      '在线客服',
      '用户反馈',
      '官方验证',
    ],
  }

  return (
    <footer className="w-full bg-[#212225] px-20 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2">
              <img src="/src/views/tools/mcp/images/vector_1_2.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">HOTCOIN</span>
            </div>
            <div className="mt-6 flex gap-4">
              <a href="#">
                <img src="/src/views/tools/mcp/images/path.svg" alt="Facebook" className="h-5 w-5" />
              </a>
              <a href="#">
                <img src="/src/views/tools/mcp/images/path_3.svg" alt="Twitter" className="h-5 w-5" />
              </a>
              <a href="#">
                <img src="/src/views/tools/mcp/images/path_5.svg" alt="WeChat" className="h-5 w-5" />
              </a>
              <a href="#">
                <img src="/src/views/tools/mcp/images/shape.svg" alt="Telegram" className="h-5 w-5" />
              </a>
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="col-span-1">
              <h3 className="text-lg font-semibold">{title}</h3>
              <ul className="mt-4 space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>©2017-2025 www.hotcoin.com</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

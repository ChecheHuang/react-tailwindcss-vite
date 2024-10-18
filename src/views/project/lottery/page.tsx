import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header/Header'
import Lottery from './components/Lottery/Lottery'
import SetLotteryList from './components/Set/SetLotteryList'
import SetPrize from './components/Set/SetPrize'
import NextStepModal from './components/modals/NextStepModal'

enum LotteryState {
  SET,
  USE,
}

const initPrizes: PrizeType[] = [
  // {
  //   id: '1',
  //   prize: '大獎',
  //   quantity: 1,
  //   img: defaultImg,
  // },
  // {
  //   id: '2',
  //   prize: '手機',
  //   quantity: 5,
  //   img: defaultImg,
  // },
  // {
  //   id: '3',
  //   prize: '測試',
  //   quantity: 5,
  //   img: defaultImg,
  // },
]

const App: React.FC = () => {
  const [theme, setTheme] = useState('mytheme')
  const [prizes, setPrizes] = useState<PrizeType[]>(initPrizes)
  const [lotteryList, setLotteryList] = useState<LotteryType[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [columns, setColumns] = useState<string[]>(['姓名', '次數'])
  const [lotteryRule, setLotteryRule] = useState<LotteryRuleState>({
    顯示中獎資訊: columns.slice(0, 1),
    抽獎規則: ['一個人只能中獎一次'],
  })
  const [openLottery, setOpenLottery] = useState(LotteryState.SET)

  const handleEnterLottery = () => {
    setConfirmOpen(true)
  }

  return (
    <>
      <div className="min-h-screen w-screen" data-theme={theme}>
        <Header setTheme={setTheme} />
        <main className="flex flex-col  items-center  justify-center overflow-hidden pt-10">
          <AnimatePresence>
            {openLottery === LotteryState.SET && (
              <motion.div
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-2 flex w-full flex-col items-center  justify-around gap-12 px-3 sm:flex-row sm:gap-4 ">
                  <NextStepModal
                    columns={columns}
                    theme={theme}
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    lotteryRule={lotteryRule}
                    setLotteryRule={setLotteryRule}
                    onOpenLottery={() => setOpenLottery(LotteryState.USE)}
                  />
                  <SetPrize
                    addPrize={(data: PrizeType) =>
                      setPrizes((prev) => [data, ...prev])
                    }
                    removePrize={(id: string) =>
                      setPrizes((prev) =>
                        [...prev].filter((prize) => prize.id !== id),
                      )
                    }
                    prizes={prizes}
                  />
                  <SetLotteryList
                    columns={columns}
                    setColumns={setColumns}
                    setLotteryList={setLotteryList}
                  />
                </div>
                <div className="mt-3 flex w-full justify-center">
                  <button
                    className="btn-neutral btn w-40 rounded-3xl text-3xl font-medium text-white"
                    disabled={prizes.length === 0 || lotteryList.length === 0}
                    onClick={handleEnterLottery}
                  >
                    進入抽獎
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {openLottery === LotteryState.USE && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Lottery
                prizes={prizes}
                lotteryList={lotteryList}
                lotteryRule={lotteryRule}
                setLotteryList={setLotteryList}
                setPrizes={setPrizes}
              />
            </motion.div>
          )}
        </main>
      </div>
      <ToastContainer />
    </>
  )
}

export default App

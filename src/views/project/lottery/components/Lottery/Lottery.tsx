import React, { FC, useMemo, useState } from 'react'
import Item from '../Item'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { cn, getRandom } from '@/lib/utils'
import { toast } from 'react-toastify'
import show from '../../images/show.png'
import { motion } from 'framer-motion'
import { Congratulation, Loading1 } from '../Loading'
import WinnerList from './WinnerList'

interface LotteryProps {
  prizes: PrizeType[]
  lotteryList: LotteryType[]
  lotteryRule: LotteryRuleState
  setPrizes: React.Dispatch<React.SetStateAction<PrizeType[]>>
  setLotteryList: React.Dispatch<React.SetStateAction<LotteryType[]>>
}

enum Status {
  READY,
  LOADING,
  SUCCESS,
}

export interface WinnerType extends LotteryType {
  prize: string
  prizeImg: string
}

const Lottery: FC<LotteryProps> = ({
  lotteryRule,
  prizes,
  setPrizes,
  lotteryList,
  setLotteryList,
}) => {
  const [currentPrizeIndex, setCurrentPrizeIndex] = useState<number>(0)
  const [winnerList, setWinnerList] = useState<WinnerType[]>([])
  const [isMustWin, setIsMustWin] = useState(false)
  const [status, setStatus] = useState<Status>(Status.READY)

  const [prevRecord, setPrevRecord] = useState<{
    prizeIndex: number
    filterLotteryList: LotteryType[]
  }>({
    prizeIndex: 0,
    filterLotteryList: [],
  })

  const filterAction = (winner: LotteryType) => {
    const filterLotteryList: any[] = []
    const filterActions = new Map<string, () => void>([
      [
        '一個人只能中獎一次',
        () => {
          const filterList = lotteryList.filter((item) => {
            if (JSON.stringify(item) !== JSON.stringify(winner)) {
              return true
            } else {
              filterLotteryList.push(item)
              return false
            }
          })
          setLotteryList(filterList)
        },
      ],

      [
        '一次機會即中獎一次',
        () => {
          const winnerFirstIndex = lotteryList.findIndex(
            (item) => JSON.stringify(item) === JSON.stringify(winner)
          )
          const newList = [...lotteryList]
          const [spliceItem] = newList.splice(winnerFirstIndex, 1)
          // console.log(spliceItem)
          filterLotteryList.push(spliceItem)
          setLotteryList(newList)
        },
      ],
    ])
    if (filterActions.get(lotteryRule['抽獎規則'][0])) {
      filterActions.get(lotteryRule['抽獎規則'][0])!()
      setPrevRecord({ filterLotteryList, prizeIndex: currentPrizeIndex })
    }
  }

  const showInfo = useMemo(() => {
    return {
      show: lotteryRule['顯示中獎資訊'][0],
      prize: winnerList[0]?.prize || '',
      winner: winnerList[0]
        ? winnerList[0][lotteryRule['顯示中獎資訊'][0]]
        : '',
    }
  }, [lotteryRule, winnerList])

  const startLottery = () => {
    if (prizes[currentPrizeIndex].quantity === 0) {
      return toast.error('該獎項已抽完', { autoClose: 500 })
    }
    if (lotteryList.length === 0) {
      return toast.error('抽獎人員已抽完', { autoClose: 500 })
    }
    setStatus(Status.LOADING)
  }
  const restartLottery = () => {
    setCurrentPrizeIndex(prevRecord.prizeIndex)
    setLotteryList((prev) => [...prev, ...prevRecord.filterLotteryList])
    setPrizes((prev) => {
      const recoverPrizes = { ...prev }
      recoverPrizes[prevRecord.prizeIndex].quantity++
      return prev
    })
    setWinnerList((prev) => {
      const newWinnerList = [...prev]
      newWinnerList.shift()
      return newWinnerList
    })
    setStatus(Status.LOADING)
  }
  const createWinner = () => {
    const mustWinner = lotteryList.find(
      (item) => item['獎品'] === prizes[currentPrizeIndex].prize
    )
    const winner =
      isMustWin && mustWinner
        ? mustWinner
        : lotteryList[getRandom(0, lotteryList.length - 1)]
    setWinnerList([
      {
        ...winner,
        prize: prizes[currentPrizeIndex].prize,
        prizeImg: prizes[currentPrizeIndex].img,
      },
      ...winnerList,
    ])
    setPrizes((prizes) => {
      const newPrize = [...prizes]
      newPrize[currentPrizeIndex].quantity--
      return newPrize
    })
    filterAction!(winner)
    setStatus(Status.SUCCESS)
  }

  return (
    <div className="w-full px-16">
      <Item className="h-auto sm:h-[80vh] sm:w-full " title="抽獎區">
        <div className="flex h-full flex-col sm:flex-row">
          <div className="  scroll_y  flex w-full flex-nowrap items-center gap-2  p-4 sm:h-full sm:w-1/5 sm:flex-col ">
            {prizes.map((prize, index) => {
              return (
                <div
                  key={prize.id}
                  onClick={() => setCurrentPrizeIndex(index)}
                  className={cn(
                    'indicator relative w-full scale-75 cursor-pointer duration-100',
                    currentPrizeIndex === index && ' scale-90',
                    prize.quantity === 0 && 'pointer-events-none'
                  )}
                >
                  <LazyLoadImage
                    className=" rounded-lg opacity-80"
                    src={prize.img}
                  />
                  <h1 className="absolute_center w-full  truncate  text-center text-2xl text-slate-200 ">
                    {prize.prize}
                    {prize.quantity === 0 && '已抽完'}
                  </h1>
                  <span className="badge badge-neutral indicator-item  text-lg  text-slate-200 ">
                    {prize.quantity}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex-1">
            <div className="flex  h-[85%] flex-col">
              <div className="text-dark flex h-20 items-center justify-around ">
                <div className="flex flex-col items-center ">
                  <div>獎品名稱</div>
                  <h2 className="text-2xl">
                    {prizes[currentPrizeIndex]?.prize}
                  </h2>
                </div>
                <div className="flex flex-col items-center ">
                  <div>剩餘數量</div>
                  <h2 className="text-2xl">
                    {prizes[currentPrizeIndex]?.quantity}
                  </h2>
                </div>
              </div>
              <div
                className={cn(
                  ' relative m-2 flex h-[300px] flex-1 items-center  justify-center  overflow-hidden  ',
                  !isMustWin && 'cursor-pointer'
                )}
              >
                {status === Status.READY && (
                  <LazyLoadImage
                    onClick={() => setIsMustWin(!isMustWin)}
                    width={'100%'}
                    src={show}
                  />
                )}
                {status === Status.LOADING && (
                  <Loading1
                    className=" h-[225px] w-[200px] sm:h-auto sm:w-auto"
                    onClick={createWinner}
                  />
                )}
                {status === Status.SUCCESS && (
                  <>
                    <Congratulation className="pointer-events-none absolute w-full  " />
                    <div
                      onClick={() => setIsMustWin(!isMustWin)}
                      className="flex flex-col items-center justify-center gap-5  "
                    >
                      <motion.div
                        initial={{
                          scale: 0,
                          y: -100,
                        }}
                        animate={{
                          scale: 1,
                          y: 0,
                          rotateZ: 720,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-32 overflow-hidden rounded-lg"
                      >
                        <img src={prizes[currentPrizeIndex].img} alt="" />
                      </motion.div>
                      <div className="flex flex-col items-center">
                        <h1 className="text-xl">恭喜</h1>
                        <div className="grid grid-cols-2 place-items-center ">
                          <div>{showInfo.show}:</div>
                          <motion.div
                            initial={{
                              y: -130,
                              x: -35,
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                              scale: 2,
                              opacity: 1,
                              borderRadius: '5px',
                            }}
                            animate={{
                              y: 0,
                              x: 0,
                              opacity: [1, 1, 1, 0.2, 0.4, 0.6, 0.8, 1],
                              scale: 1,
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="z-10 text-2xl"
                          >
                            {showInfo.winner}
                          </motion.div>
                          <div>獲得:</div>
                          <div className="text-2xl">{showInfo.prize}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-20">
              <button
                onClick={startLottery}
                className="btn-neutral btn w-40 rounded-3xl text-3xl font-medium text-white"
              >
                開始抽獎
              </button>
              <button
                disabled={status !== Status.SUCCESS}
                onClick={restartLottery}
                className="btn-warning btn w-40 rounded-3xl text-3xl font-medium text-white"
              >
                重新抽獎
              </button>
              <WinnerList
                show={lotteryRule['顯示中獎資訊'][0]}
                winnerList={winnerList}
              />
            </div>
          </div>
        </div>
      </Item>
    </div>
  )
}

export default Lottery

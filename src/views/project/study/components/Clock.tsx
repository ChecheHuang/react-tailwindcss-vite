import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import Lottie from 'lottie-react'
import animate from '../assets/timeUp.json'

const Clock = () => {
  const initialCount = 30 * 60
  const [count, setCount] = useState<number>(initialCount)
  const [running, setRunning] = useState<boolean>(false)
  const [timeUp, setTimeUp] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (running && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
    } else if (count === 0) {
      setRunning(false)
      setTimeUp(true)
    }

    return () => {
      clearInterval(timer)
    }
  }, [running, count])

  const handleStart = () => {
    setRunning(true)
  }

  const handleStop = () => {
    setRunning(false)
  }

  const handleReset = () => {
    setCount(initialCount)
    setRunning(false)
    setTimeUp(false)
  }

  // Reset the timer when the Drawer closes
  const handleDrawerClose = () => {
    handleReset()
  }

  // Reset the timer when Lottie animation is clicked
  const handleLottieClick = () => {
    handleReset()
  }

  const minutes: number = Math.floor(count / 60)
  const seconds: number = count % 60

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">開啟計時器</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>計時器</DrawerTitle>
              <DrawerDescription>
                限時30分鐘快速摘出16個關鍵字
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center h-[20vh] ">
              <div
                className="text-6xl font-bold cursor-pointer"
                onClick={timeUp ? handleLottieClick : undefined}
              >
                {timeUp ? (
                  <Lottie animationData={animate} loop={true} />
                ) : (
                  `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                )}
              </div>
              <div className="mt-4 space-x-2">
                <Button
                  variant="secondary"
                  disabled={running || timeUp}
                  onClick={handleStart}
                >
                  {count === initialCount ? '開始' : '繼續'}
                </Button>
                <Button disabled={!running || timeUp} onClick={handleStop}>
                  暫停
                </Button>
                <Button variant="destructive" onClick={handleReset}>
                  重置
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" onClick={handleDrawerClose}>
                  關閉
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Clock

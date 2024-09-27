import { motion, useAnimation } from 'framer-motion'
import React from 'react'

export default function Demo5() {
  const [isAnimated, setIsAnimated] = React.useState(false)
  const control = useAnimation()

  return (
    <div className=" flex w-full flex-col-reverse   bg-slate-50">
      <div className="m-auto flex  gap-2">
        <button
          onClick={() => {
            control.start({
              x: 400,
              transition: { duration: 2 },
            })
          }}
          className="btn-neutral btn"
        >
          Move Right
        </button>
        <button
          onClick={() => {
            control.start({
              x: 0,
              transition: { duration: 2 },
            })
          }}
          className="btn-neutral btn"
        >
          Move Left
        </button>
        <button
          onClick={() => {
            control.start({
              borderRadius: '50%',
              transition: { duration: 2 },
            })
          }}
          className="btn-neutral btn"
        >
          Circle
        </button>
        <button
          onClick={() => {
            control.start({
              borderRadius: '0%',
              transition: { duration: 2 },
            })
          }}
          className="btn-neutral btn"
        >
          Square
        </button>
        <button
          onClick={() => {
            control.stop()
          }}
          className="btn-neutral btn"
        >
          Stop
        </button>
      </div>
      <motion.div
        className=" h-32 w-32  bg-orange-400"
        animate={control}
      ></motion.div>
    </div>
  )
}

import { motion, MotionProps } from 'framer-motion'
import { useState } from 'react'

interface Props extends MotionProps {
  className?: string
  buttonText?: string
}
export default function FramerMotion({
  className,
  buttonText = 'restart',
  ...rest
}: Props) {
  const [start, setStart] = useState(true)
  const handleClick = () => {
    setStart(false)
    setTimeout(() => {
      setStart(true)
    }, 200)
  }
  return (
    <div className="m-4 flex h-32 items-center ">
      <button onClick={handleClick} className="btn-secondary btn">
        {buttonText}
      </button>
      {start && (
        <motion.div
          {...rest}
          className="ml-4 h-32 w-32  bg-blue-400"
        ></motion.div>
      )}
    </div>
  )
}

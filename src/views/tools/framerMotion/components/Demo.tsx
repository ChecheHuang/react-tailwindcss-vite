import { motion } from 'framer-motion'
import React from 'react'

export default function Demo() {
  const [isAnimated, setIsAnimated] = React.useState(false)
  return (
    <motion.div
      className="ml-4 h-32 w-32  bg-orange-400"
      initial={{
        opacity: 0.5,
      }}
      transition={{
        type: 'spring',
        stiffness: 60,
      }}
      animate={{
        x: isAnimated ? 300 : -300,
        opacity: isAnimated ? 1 : 0.5,
        rotate: isAnimated ? 720 : 0,
      }}
      onClick={() => setIsAnimated(!isAnimated)}
    ></motion.div>
  )
}

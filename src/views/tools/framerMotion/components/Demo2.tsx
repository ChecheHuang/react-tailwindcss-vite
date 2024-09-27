import { motion } from 'framer-motion'
import React from 'react'

export default function Demo2() {
  const [isAnimated, setIsAnimated] = React.useState(false)
  return (
    <motion.div
      className="ml-4 h-32 w-32  bg-blue-400"
      drag
      dragConstraints={{
        right: 20,
      }}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
    ></motion.div>
  )
}

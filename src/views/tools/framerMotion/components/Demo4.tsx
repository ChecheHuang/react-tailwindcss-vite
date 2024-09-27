import { Variants, motion } from 'framer-motion'
import React from 'react'

const Demo4 = () => {
  return (
    <motion.div
      className="h-32 w-32 bg-blue-400"
      animate={{
        scale: [1, 1.4, 1.4, 1, 1],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
        rotate: [0, 0, 270, 270, 0],
      }}
      transition={{
        duration: 2,
      }}
    ></motion.div>
  )
}
export default Demo4

import { Variants, motion } from 'framer-motion'
import React from 'react'

const Demo3 = () => {
  const boxVariant = {
    hidden: {
      x: '-100vw',
    },
    visible: {
      x: '0',
      transition: {
        delay: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  }
  // AnimationProps
  const listVariant: Variants = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div
      variants={boxVariant}
      animate="visible"
      initial="hidden"
      className="ml-4 flex h-32  w-32 flex-col items-center justify-center gap-3 bg-blue-400"
    >
      {[1, 2, 3].map((box, index) => (
        <motion.li
          key={index}
          variants={listVariant}
          className="  h-4 w-4 list-none bg-white"
        ></motion.li>
      ))}
    </motion.div>
  )
}
export default Demo3

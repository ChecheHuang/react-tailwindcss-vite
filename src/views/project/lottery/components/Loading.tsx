import Lottie from 'lottie-react'
import { FC } from 'react'

import congratulation from '../lotties/congratulation2.json'
import lotties from '../lotties/lottery1.json'

interface LottieProps {
  className?: string
  onClick?: () => void
}
export const Loading1: FC<LottieProps> = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={className}>
      <Lottie animationData={lotties} loop={true} />
    </div>
  )
}

export const Congratulation: FC<LottieProps> = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={className}>
      <Lottie animationData={congratulation} loop={true} />
    </div>
  )
}

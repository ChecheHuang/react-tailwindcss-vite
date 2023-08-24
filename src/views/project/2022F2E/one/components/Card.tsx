import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function Card({ children }: Props) {
  return (
    <div className="w-[200px] h-[200px] relative bg-white ml-10 ">
      <div
        className={cn(
          'absolute w-[70%] h-[70%] bg-black opacity-60 ',
          'transform origin-right skew-y-[-7.5deg] filter blur  translate-x-[2%] bottom-[10%]'
        )}
      ></div>
      <div
        className={cn(
          'absolute w-[70%] h-[70%] bg-black opacity-60 ',
          'transform origin-left skew-y-[7.5deg] filter blur  right-0 -translate-x-[2%] bottom-[10%]'
        )}
      ></div>
      <div className="absolute w-full h-full bg-white  z-1">{children}</div>
    </div>
  )
}

export default Card

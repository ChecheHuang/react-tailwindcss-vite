import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  height?: string
  width?: string
}

function Card({
  children,
  height = '300px',
  width = '600px',
  className,
}: Props) {
  return (
    <div
      style={{ height, width }}
      className={cn(
        'relative ',
        'before:h-[90%] before:w-[40%]',
        'before:absolute  before:bottom-[3px]  before:left-[4px]   before:bg-black before:content-[""] ',
        'before:origin-right before:skew-y-[-8.5deg] before:transform before:opacity-70 before:blur-[5px] before:filter',
        'after:h-[90%] after:w-[40%]',
        'after:absolute after:bottom-[3px] after:right-[4px]    after:bg-black after:content-[""] ',
        'after:origin-left after:skew-y-[7.5deg] after:transform after:opacity-70 after:blur-[5px] after:filter'
      )}
    >
      <div className={cn('absolute z-10 h-full w-full bg-white ', className)}>
        {children}
      </div>
    </div>
  )
}

export default Card

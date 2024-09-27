import { cn } from '@/lib/utils'
import React from 'react'

interface ItemProps {
  title: string
  children: React.ReactNode
  className?: string
}

const Item: React.FC<ItemProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        ' relative flex w-full flex-col gap-2 rounded-3xl border-[12px] border-primary p-10 sm:h-[70vh] sm:w-3/4 sm:p-2 ',
        className
      )}
    >
      <div className=" btn-primary pointer-events-none absolute  -top-8 left-1/2 -translate-x-1/2  transform whitespace-nowrap  rounded-full px-6 py-2 text-2xl text-base-100 ">
        {title}
      </div>
      {children}
    </div>
  )
}

export default Item

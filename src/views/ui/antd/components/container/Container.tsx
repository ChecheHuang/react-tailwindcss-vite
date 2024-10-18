import React, { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Wrap: React.ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = (
  { children, className, ...rest },
  ref,
) => {
  return (
    <>
      <div ref={ref} className={cn('p-4', className)} {...rest}>
        {children}
      </div>
    </>
  )
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(Wrap)

export default Container

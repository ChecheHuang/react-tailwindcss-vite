import React, { ReactNode, Children, isValidElement } from 'react'

import { cn as classNames } from '@/lib/utils'

interface StepItemProps {
  title: string
  children: ReactNode
  className?: string
  titleClassName?: string
}

interface StepProps {
  current: number
  children: ReactNode
  stepSpaceClassName?: string
  className?: string
}
const StepItem: React.FC<StepItemProps> = ({ children }) => {
  return <div className="w-full">{children}</div>
}

const Step: React.FC<StepProps> & { Item: React.FC<StepItemProps> } = ({
  current,
  children,
  stepSpaceClassName = 'mr-[24px]',
  className,
}) => {
  const childrenArray = Children.toArray(children).filter(
    (child) => isValidElement(child) && (child.type as any) === StepItem,
  )

  if (childrenArray.length === 0) {
    return null
  }

  const total = childrenArray.length
  const safeCurrent = Math.max(0, Math.min(current, total + 1))

  return (
    <div className={classNames('w-full flex flex-col', className)}>
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) {
          return null
        }

        const isActive = current > total ? true : index < safeCurrent
        const isCurrent = current > total ? false : index === safeCurrent - 1

        return (
          <div key={index} className="flex flex-row w-full">
            <div
              className={classNames(
                'flex flex-col items-center',
                stepSpaceClassName,
              )}
            >
              <div
                className={classNames(
                  'flex items-center justify-center w-[24px] h-[24px] rounded-full border-2 font-bold text-sm cursor-pointer',
                  isActive
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isCurrent
                      ? 'border-blue-500 text-blue-500'
                      : 'border-[#DBDBDB] text-gray-400',
                )}
              >
                {index + 1}
              </div>{' '}
              {index < childrenArray.length - 1 && (
                <div
                  className={classNames(
                    'w-[2px] flex-1',
                    index < safeCurrent - 1 ? 'bg-blue-500' : 'bg-gray-300',
                  )}
                />
              )}
            </div>
            <div className={classNames('flex-1', child.props.className)}>
              <h3
                className={classNames(
                  child.props.titleClassName || 'font-medium text-lg mb-[1px]',
                )}
              >
                {child.props.title}
              </h3>
              {child}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Step.Item = StepItem

export default Step

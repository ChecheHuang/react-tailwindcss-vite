import { HTMLAttributes, useMemo } from 'react'

import { cn } from '@/lib/utils'

interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  groupTitle?: string
  unstyled?: boolean
  size?: string
  notGlobalCol?: boolean
}

interface GroupItemProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
  className?: string
}

const Group: React.FC<GroupProps> & {
  Item: React.FC<GroupItemProps>
} = ({
  children,
  className,
  groupTitle,
  size,
  unstyled = false,
  notGlobalCol = false,
  ...rest
}) => {
  return (
    <>
      <div
        className={cn(
          !notGlobalCol && 'grid gap-x-3',
          'grid-cols-2',
          !unstyled && 'mb-10 rounded-lg  p-2 shadow-lg shadow-slate-500/40 ',
          className,
        )}
        {...rest}
      >
        {groupTitle && (
          <h1 className="col-span-full mb-3 text-center text-2xl font-bold text-gray-800">
            {groupTitle}
          </h1>
        )}

        {children}
      </div>
    </>
  )
}

export const GroupItem: React.FC<GroupItemProps> = ({
  children,
  title,
  className,
  ...rest
}) => {
  return (
    <div className={cn('col-span-full grid gap-x-3', 'grid-cols-2')} {...rest}>
      {title && (
        <h1 className="col-span-full mb-1  text-xl font-bold text-gray-800">
          {title}
        </h1>
      )}
      {children}
    </div>
  )
}
Group.Item = GroupItem

export default Group

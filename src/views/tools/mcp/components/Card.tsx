
import { FC, ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  action?: ReactNode
}

const Card: FC<CardProps> = ({ title, children, action }) => {
  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export default Card

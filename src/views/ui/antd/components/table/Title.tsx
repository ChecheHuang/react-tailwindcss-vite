'use client'
import { FC } from 'react'
import PrevButton from '../button/PrevButton'
import ChangeSizeRadio from '../ChangeSizeRadio'
interface TitleProps {
  title: string
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <>
      <div className=" flex items-center justify-between">
        <h1 className="text-3xl">{title}</h1>
        <div className="flex gap-2">
          <PrevButton />
          <ChangeSizeRadio />
        </div>
      </div>
    </>
  )
}

export default Title

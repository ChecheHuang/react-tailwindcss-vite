'use client'

import { FC } from 'react'

import ChangeSizeRadio from '../ChangeSizeRadio'
import PrevButton from '../button/PrevButton'

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

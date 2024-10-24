import React, { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

const arr = ['5非同步不可怕', '6手寫Promise']

const Page = () => {
  const [Component, setComponent] = useState<React.FC | null>(null)
  const [current, setCurrent] = useState('')

  const handleClick = async (fileName: string) => {
    const module = await import('./' + fileName)
    setComponent(() => module.default)
    setCurrent(fileName)
  }

  return (
    <>
      {current}
      <div className="flex gap-2">
        {arr.map((item, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                handleClick(item)
              }}
            >
              {item}
            </Button>
          )
        })}
      </div>
      {Component && <Component />}
    </>
  )
}

export default Page

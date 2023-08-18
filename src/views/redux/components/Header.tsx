import React from 'react'
import { useDispatch, useSelector } from '../store'
import { SizeType, changeSize } from '../store/modules/themeSlice'
import { cn } from '@/lib/utils'
function Header() {
  const dispatch = useDispatch()
  const { size } = useSelector((state) => state.theme)

  const handleChangeTheme = (value: SizeType) => () => {
    dispatch(changeSize(value))
  }
  const btnClassName = new Map<SizeType, string>([
    [SizeType.small, 'btn-sm'],
    [SizeType.middle, ''],
    [SizeType.large, 'btn-lg'],
  ])

  return (
    <div className="w-full h-20 bg-slate-300 flex justify-center items-center">
      <div className="btn-group ">
        <button
          onClick={handleChangeTheme(SizeType.small)}
          className={cn(
            'btn',
            btnClassName.get(size),
            size === SizeType.small && 'btn-active'
          )}
        >
          小
        </button>
        <button
          onClick={handleChangeTheme(SizeType.middle)}
          className={cn(
            'btn',
            btnClassName.get(size),
            size === SizeType.middle && 'btn-active'
          )}
        >
          中
        </button>
        <button
          onClick={handleChangeTheme(SizeType.large)}
          className={cn(
            'btn',
            btnClassName.get(size),
            size === SizeType.large && 'btn-active'
          )}
        >
          大
        </button>
      </div>
    </div>
  )
}

export default Header

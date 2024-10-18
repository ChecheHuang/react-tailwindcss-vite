import { MoonStar, SunMoon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { useDispatch, useSelector } from '../store'
import { SizeType, changeSize, changeTheme } from '../store/modules/themeSlice'

function Header() {
  const dispatch = useDispatch()
  const redux = useSelector((state) => state.theme)
  const { size, theme } = redux

  const handleChangeSize = (value: SizeType) => () => {
    dispatch(changeSize(value))
  }
  const handleChangeTheme = () => {
    dispatch(changeTheme())
  }
  const btnClassName = new Map<SizeType, string>([
    [SizeType.small, 'btn-sm'],
    [SizeType.middle, ''],
    [SizeType.large, 'btn-lg'],
  ])

  return (
    <div className="w-full h-20 bg-slate-300 flex justify-center items-center">
      <button onClick={handleChangeTheme} className="btn btn-sm btn-ghost">
        {theme === 'dark' ? <SunMoon /> : <MoonStar />}
      </button>
      <div className="btn-group w-52 flex justify-center ">
        <button
          onClick={handleChangeSize(SizeType.small)}
          className={cn(
            'btn',
            btnClassName.get(size),
            size === SizeType.small && 'btn-active',
          )}
        >
          小
        </button>
        <button
          onClick={handleChangeSize(SizeType.middle)}
          className={cn(
            'btn',
            btnClassName.get(size),
            size === SizeType.middle && 'btn-active',
          )}
        >
          中
        </button>
        <button
          onClick={handleChangeSize(SizeType.large)}
          className={cn(
            'btn',
            btnClassName.get(size),
            size === SizeType.large && 'btn-active',
          )}
        >
          大
        </button>
      </div>
    </div>
  )
}

export default Header

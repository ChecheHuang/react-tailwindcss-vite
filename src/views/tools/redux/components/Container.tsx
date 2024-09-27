import { useSelector } from '../store'
import { cn } from '@/lib/utils'
function Container() {
  const theme = useSelector((state) => state.theme.theme)
  console.log('rerender')
  return (
    <div
      className={cn(
        'flex-1 w-full',
        theme === 'dark'
          ? ' bg-slate-800 text-white'
          : 'bg-white text-slate-800'
      )}
    ></div>
  )
}

export default Container

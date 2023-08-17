import { cn } from '@/lib/utils'
import router from '@/router/router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function FixedDropdown() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const displayRouter = router.filter(
    (route) => route.name !== '/' && route.name !== 'Not Found'
  )


  return (
     <div className="drawer drawer-end z-[1000]">
      <input id="drawer-id" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="drawer-id"
          className="drawer-button btn btn-sm btn-ghost fixed top-1 right-1 z-[1000]"
        >
          <Menu />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-id" className="drawer-overlay"></label>
        <ul className="menu p-4 pt-10 space-y-1 w-60 h-full  text-base-content bg-gradient-to-b from-blue-200 to-pink-200 ">
          {displayRouter.map((route) => (
            <Link
              className={cn(
                'border-2  btn   shadow-2xl',
                pathname === route.path ? 'btn-success  ' : 'btn-ghost'
              )}
              key={route.path}
              to={route.path}
            >
              {route.name.replace('/', '')}
            </Link>
          ))}
           <button
              className='border-2  btn shadow-2xl btn-ghost'
             onClick={()=>navigate(-1)}
            >
             PREV
            </button>
        </ul>
      </div>
    </div>
  )
}

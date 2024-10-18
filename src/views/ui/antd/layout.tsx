import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Aside from './components/Aside'
import Header from './components/Header'
import { useWindowInfo } from './hooks/useHook'
import AntdProvider from './provider/AntdProvider'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})
const Layout = () => {
  const { pathname } = useLocation()
  const { windowWidth } = useWindowInfo()
  const [collapsed, setCollapsed] = useState(windowWidth < 1000)
  const mainRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const isCollapsed = windowWidth < 1000
    setCollapsed(isCollapsed)
  }, [windowWidth])
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <AntdProvider>
        <section className="flex h-screen">
          <Aside collapsed={collapsed} />
          <section className="flex flex-1 flex-col overflow-y-auto">
            <Header
              toggleCollapsed={() => setCollapsed(!collapsed)}
              collapsed={collapsed}
            />
            <main
              ref={mainRef}
              className="scrollbar-thumb-dark relative h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth  bg-slate-200 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-rounded   "
            >
              <Outlet />
            </main>
          </section>
        </section>
      </AntdProvider>
    </QueryClientProvider>
  )
}

export default Layout

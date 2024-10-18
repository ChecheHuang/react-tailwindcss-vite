import { useRoutes, HashRouter as BrowserRouter } from 'react-router-dom'

import router from '@/router/router'

import ErrorBoundary from './components/ErrorBoundary'
import ProfileDrawer from './components/ProfileDrawer'

const Routes = () => {
  const routes = useRoutes(router)

  return (
    <div className="w-screen h-screen overflow-y-auto scroll-smooth bg-slate-200  scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-black scrollbar-thumb-rounded ">
      {routes}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes />
        <ProfileDrawer />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
export default App

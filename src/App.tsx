import { useRoutes, BrowserRouter } from 'react-router-dom'
import router from '@/router/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from './components/ErrorBoundary'
import FixedDropdown from './components/FixedDropdown'
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})
const Routes = () => {
  const routes = useRoutes(router)

  return routes
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
          <FixedDropdown />
        </BrowserRouter>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
export default App

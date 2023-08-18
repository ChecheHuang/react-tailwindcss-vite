import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})
function ReactQuery() {
  async function test() {
    axios.get('/users').then(function (response) {
      console.log(response.data)
    })
  }

  return (
    <button className="btn" onClick={test}>
      ReactQuery
    </button>
  )
}

export default function Provider() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQuery />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

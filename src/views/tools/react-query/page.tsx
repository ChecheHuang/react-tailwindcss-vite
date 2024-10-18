import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getPost } from './api/posts'
import CreatePost from './components/CreatePost'
import Post from './components/Post'
import PostListInfinite from './components/PostListInfinite'
import PostListPaginated from './components/PostListPaginated'
import PostsList1 from './components/PostsList1'
import PostsList2 from './components/PostsList2'

// json-server --watch --port 3000 src/views/tools/react-query/api/db.json
function ReactQuery() {
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(
    <PostsList1 />,
  )
  const queryClient = useQueryClient()

  function onHoverPostOneLink() {
    const preFetch = queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1),
    })
    console.log('preFetch', preFetch)
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 p-3 ">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostsList1 />)}
        >
          placeholderData
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostsList2 />)}
        >
          Posts List
        </button>
        <button
          className="btn btn-sm"
          onMouseEnter={onHoverPostOneLink}
          onClick={() => setCurrentPage(<Post id={1} />)}
        >
          preFetch First Post
        </button>
        <button
          className="btn btn-sm"
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          Mutation
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostListPaginated />)}
        >
          分頁keepPreviousData
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostListInfinite />)}
        >
          fetchNextPage
        </button>
      </div>
      <br />
      {currentPage}
    </>
  )
}

export default function Provider() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQuery />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

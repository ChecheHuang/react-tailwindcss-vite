import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { getPost } from './api/posts'
import CreatePost from './components/CreatePost'
import Post from './components/Post'
import PostListInfinite from './components/PostListInfinite'
import PostListPaginated from './components/PostListPaginated'
import PostsList2 from './components/PostsList2'
import PostsList1 from './components/PostsList1'

function ReactQuery() {
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(
    <PostsList1 />
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
      <div className="flex gap-4 p-3 flex-wrap ">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostsList1 />)}
        >
          Posts List 1
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostsList2 />)}
        >
          Posts List 2
        </button>
        <button
          className="btn btn-sm"
          onMouseEnter={onHoverPostOneLink}
          onClick={() => setCurrentPage(<Post id={1} />)}
        >
          First Post
        </button>
        <button
          className="btn btn-sm"
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          New Post
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostListPaginated />)}
        >
          Post List Paginated
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(<PostListInfinite />)}
        >
          Post List Infinite
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

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPostsPaginated } from '../api/posts'

export default function PostListPaginated() {
  const [page, setPage] = useState(1)

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ['posts', { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  })

  if (status === 'loading') return <h1>Loading...</h1>
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>
        Post List 分頁
        <br />
        <small>{isPreviousData && 'Previous Data'}</small>
      </h1>
      {data.posts.map((post: { id: string; title: string }) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={!data.previousPage}
        className="btn btn-xs"
        onClick={() => data.previousPage && setPage(data?.previousPage)}
      >
        Previous
      </button>
      <button
        disabled={!data.nextPage}
        className="btn btn-xs"
        onClick={() => data.nextPage && setPage(data?.nextPage)}
      >
        Next
      </button>
    </>
  )
}

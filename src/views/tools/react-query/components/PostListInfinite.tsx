import { useInfiniteQuery } from '@tanstack/react-query'

import { getPostsPaginated } from '../api/posts'

export default function PostListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    getNextPageParam: (prevData: any) => {
      // console.log('prevData', prevData)
      return prevData.nextPage
    },
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  })

  if (status === 'loading') return <h1>Loading...</h1>
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>
  // console.log(data.pages)
  return (
    <>
      <h1>Post List Infinite</h1>
      {hasNextPage && (
        <button className="btn btn-xs" onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
      <div>
        {data.pages
          .flatMap((data) => data.posts)
          .map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
      </div>
    </>
  )
}

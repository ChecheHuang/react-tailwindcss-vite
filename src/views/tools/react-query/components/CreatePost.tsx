import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { createPost } from '../api/posts'
import Post from './Post'

interface CreatePostProps {
  setCurrentPage: React.Dispatch<
    React.SetStateAction<React.ReactNode | undefined>
  >
}

export default function CreatePost({ setCurrentPage }: CreatePostProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', data.id], data)
      queryClient.invalidateQueries(['posts'], { exact: true })
      setCurrentPage(<Post id={data.id} />)
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (titleRef?.current === null || bodyRef.current === null) return
    createPostMutation.mutate({
      title: titleRef?.current.value,
      body: bodyRef?.current.value,
    })
  }

  return (
    <div className="w-full h-[200px] flex justify-center items-center">
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form className=" space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input className="input bg-white" id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input className="input bg-white" id="body" ref={bodyRef} />
        </div>
        <button className="btn" disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  )
}

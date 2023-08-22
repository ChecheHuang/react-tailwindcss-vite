import axios, { mock } from '@/lib/request'
import data from './db.json'
export const getPostsData = data.posts

mock.onGet('http://localhost:3000/posts').reply((config) => {
  const { _page, _limit } = config.params
  const result = paginateArray(getPostsData, _page, _limit)
  const headers = {
    'x-total-count': '5',
  }
  return [200, result, headers]
})
mock.onGet(/http:\/\/localhost:3000\/posts\/\d+/).reply((config) => {
  const url = config.url
  const id = url?.slice(url.lastIndexOf('/') + 1)
  const result = getPostsData.find((post) => post.id.toString() === id)
  return [200, result]
})
mock.onPost('http://localhost:3000/posts').reply((config) => {
  const res = JSON.parse(config.data)
  const data = { ...res, userId: 1, id: Date.now() }
  getPostsData.push(data)
  return [200, data]
})
export function getPosts() {
  return axios
    .get('http://localhost:3000/posts', {
      params: { _sort: 'title' },
    })
    .then((res) => res.data)
}

export function getPostsPaginated(page: number) {
  return axios
    .get('http://localhost:3000/posts', {
      params: { _page: page, _sort: 'title', _limit: 2 },
    })
    .then((res) => {
      console.log(res)
      const hasNext = page * 2 <= parseInt(res.headers['x-total-count'])
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      }
    })
}

export function getPost(id: number) {
  return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data)
}

export function createPost({ title, body }: { title: string; body: string }) {
  return axios
    .post('http://localhost:3000/posts', {
      title,
      body,
      userId: 1,
      id: Date.now(),
    })
    .then((res) => res.data)
}
function paginateArray(
  array: any[],
  _page = '1',
  _limit = array.length.toString()
) {
  const page = parseInt(_page, 10)
  const limit = parseInt(_limit, 10)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const result = array.slice(startIndex, endIndex)

  return result
}

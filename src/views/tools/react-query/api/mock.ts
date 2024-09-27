import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { users as getUsers, posts as getPostsData } from './db.json'
export const mock = new MockAdapter(axios)

mock.onGet(/http:\/\/localhost:3000\/users\/\d+/).reply((config) => {
  const url = config.url
  const id = url?.slice(url.lastIndexOf('/') + 1)
  const result = getUsers.find((user) => user.id.toString() === id)
  return [200, result]
})
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

export default axios

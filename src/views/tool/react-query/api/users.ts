import axios, { mock } from '@/lib/request'
import data from './db.json'
const getUsers = data.users

mock.onGet(/http:\/\/localhost:3000\/users\/\d+/).reply((config) => {
  const url = config.url
  const id = url?.slice(url.lastIndexOf('/') + 1)
  const result = getUsers.find((user) => user.id.toString() === id)
  return [200, result]
})
export function getUser(id: string) {
  return axios.get(`http://localhost:3000/users/${id}`).then((res) => res.data)
}

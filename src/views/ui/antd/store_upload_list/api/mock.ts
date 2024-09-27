import axios, { AxiosInstance } from 'axios'
import { store_list } from './db.json'
import MockAdapter from 'axios-mock-adapter'

let dbData = [...store_list]

const request: AxiosInstance = axios.create()
export default request

if (import.meta.env.MODE !== 'mock') {
  const mock = new MockAdapter(request)

  mock.onGet('http://localhost:3000/store_list').reply((config) => {
    const result = changeData(dbData, config.params)
    return [200, result]
  })
  mock.onPost('http://localhost:3000/store_list').reply((config) => {
    const data = JSON.parse(config.data)
    dbData.push({ id: dbData.length + 1, ...data })
    return [200, data]
  })

  mock.onGet(/http:\/\/localhost:3000\/store_list\/\d+/).reply((config) => {
    const url = config.url
    const id = url?.slice(url.lastIndexOf('/') + 1)
    return [200, dbData.find((item) => item.id === id)]
  })

  mock.onPut(/http:\/\/localhost:3000\/store_list\/\d+/).reply((config) => {
    const data = JSON.parse(config.data)
    const url = config.url
    const id = url?.slice(url.lastIndexOf('/') + 1)
    const dataIndex = dbData.findIndex((item) => item.id === id)
    const changeData = { ...dbData[dataIndex], ...data }
    dbData[dataIndex] = changeData
    return [200, changeData]
  })

  mock.onDelete(/http:\/\/localhost:3000\/store_list\/\d+/).reply((config) => {
    const url = config.url
    const id = url?.slice(url.lastIndexOf('/') + 1)
    dbData = dbData.filter((item) => item.id !== id)
    return [200, {}]
  })
}

function changeData(array: AnyObject[], params: AnyObject) {
  let newArr = [...array]
  const {
    _page = '1',
    _limit = array.length.toString(),
    caseNo,
    specialStoreNo,
    status,
  } = params
  newArr = filter(newArr, 'caseNo', caseNo)
  newArr = filter(newArr, 'specialStoreNo', specialStoreNo)
  newArr = filter(newArr, 'status', status)
  const page = parseInt(_page, 10)
  const limit = parseInt(_limit, 10)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const result = newArr.slice(startIndex, endIndex)

  return result
}
function filter(arr: any[], filterKey: string, filterValue: string) {
  return arr.filter((item) => {
    if (!filterValue) return true
    if (item[filterKey] === filterValue) return true
    return false
  })
}

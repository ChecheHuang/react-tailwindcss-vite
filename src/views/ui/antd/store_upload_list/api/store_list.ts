import { DataType, FilterInfo } from '../types'
import axios from './mock'

interface ResponseType {
  data: DataType[]
  total: number
}

export const getStoreList = async (
  filterInfo: FilterInfo,
): Promise<ResponseType> => {
  const { _page, _limit, ...rest } = filterInfo
  const total =
    (await (
      await axios.get<DataType[]>('http://localhost:3000/store_list', {
        params: rest,
      })
    ).data.length) || 100

  const res = await axios.get<DataType[]>('http://localhost:3000/store_list', {
    params: filterInfo,
  })
  return {
    data: res.data,
    total,
  }
}
export function getStore(id: string) {
  return axios
    .get<DataType>(`http://localhost:3000/store_list/${id}`)
    .then((res) => res.data)
}
export function createStore(data: Omit<DataType, 'id'>) {
  return axios
    .post<DataType>('http://localhost:3000/store_list', data)
    .then((res) => res.data)
}

export const editStore = (data: DataType) => {
  return axios
    .put<DataType>(`http://localhost:3000/store_list/${data.id}`, data)
    .then((res) => res.data)
}

export function deleteStore(id: string) {
  return axios
    .delete(`http://localhost:3000/store_list/${id}`)
    .then((res) => res.data)
}

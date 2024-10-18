import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    const data = localStorage.getItem('data')
    if (data !== null) {
      const parsedData = JSON.parse(data)
      const token = parsedData.token || ''
      if (token) {
        config.headers['authorization'] = 'Bearer ' + token
      }
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default request

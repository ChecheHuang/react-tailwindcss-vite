import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'

import TableTemplate from '../components/table/TableTemplate'
import Columns from './components/columns'

import SearchLayoutArray from './components/searchLayoutArray'
import { DataType, FilterInfo } from './types'
import { getStoreList } from './api/store_list'
import useQueryStringObj from '../hooks/useQueryStringObj'
// json-server --watch --port 3000 src/views/setting/accquiry/store_upload_list/api/db.json

const initFilterData: FilterInfo = {
  _page: '1',
  _limit: '10',
}

const Page = () => {
  const [filterInfo, setFilterInfo] =
    useQueryStringObj<FilterInfo>(initFilterData)

  const { data, isLoading } = useQuery({
    queryKey: ['store_list', { filterInfo }],
    keepPreviousData: true,
    queryFn: () => getStoreList(filterInfo),
  })

  const onPaginate = (paginationInfo: TablePaginationConfig) => {
    const _page = paginationInfo.current?.toString()
    const _limit = paginationInfo.pageSize?.toString()
    setFilterInfo({ ...filterInfo, _page, _limit })
  }
  const onSearch = (values: DataType) => {
    const filterObj: AnyObject = {}
    for (const i in values) {
      if (values[i as keyof DataType] !== undefined)
        if (i !== '招攬時間') {
          filterObj[i] = values[i as keyof DataType]
        }
    }
    setFilterInfo({ ...filterInfo, ...filterObj })
  }
  const onFilter = (filters: Record<string, FilterValue | null>) => {
    const filterObj = { ...filterInfo }
    for (const i in filters) {
      if (filters[i] === null) {
        delete filterObj[i as keyof FilterInfo]
      } else {
        filterObj[i as keyof FilterInfo] = filters[i]?.toString()
      }
    }
    setFilterInfo(filterObj)
  }

  return (
    <>
      <TableTemplate<DataType>
        data={data?.data || []}
        columns={Columns()}
        searchLayoutArray={SearchLayoutArray()}
        loading={isLoading}
        rowClassName={(record) => {
          return record.status !== 'abnormal' ? '' : 'bg-slate-300'
        }}
        templateTableProps={{ width: 100, align: 'center' }}
        onSearch={onSearch}
        // onSelect={(rows) => console.log(rows)}
        onPaginate={onPaginate}
        onSort={(sorter) => console.log(sorter)}
        onFilter={onFilter}
        pagination={{
          position: ['bottomCenter'],
          pageSize: parseInt(filterInfo?._limit || '10'),
          total: data?.total || 0,
          current: parseInt(filterInfo?._page || '1'),
        }}
      />
    </>
  )
}

export default Page

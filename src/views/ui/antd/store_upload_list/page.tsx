import { Link, useNavigate } from 'react-router-dom'
import { fakerZH_TW as faker } from '@faker-js/faker'
import { ColumnsType } from 'antd/es/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import TableTemplate, { filterOptions } from '../components/table/TableTemplate'
import { useAntd } from '../provider/AntdProvider'
import DropdownButton from '../components/button/DropdownButton'
import ExtendedButton from '../components/button/ExtendedButton'

export const columns: ColumnsType<DataType> = [
  {
    title: '案件編號',
    render: (props: DataType) => {
      return <Link to={props.key}>{props['案件編號']}</Link>
    },
    ...filterOptions,
  },
  {
    title: '資料編號',
    dataIndex: '資料編號',
  },
  {
    title: '資料名稱',
    dataIndex: '資料名稱',
  },
  {
    title: '統一編號',
    dataIndex: '統一編號',
  },
  {
    title: '招攬單位',
    dataIndex: '招攬單位',
  },
]

const Page = () => {
  const { modal, message } = useAntd()
  const navigate = useNavigate()

  const onEdit = (id: string) => {
    navigate(id)
  }
  const onDelete = (col: DataType) => {
    modal?.confirm({
      title: <div>操作有危險</div>,
      icon: <ExclamationCircleOutlined />,
      content: '刪除資料不可回復，確認刪除?',
      okText: '確認',
      cancelText: '取消',
      onOk: () => {
        console.log(col)
        message.success('刪除成功')
      },
    })
  }

  const operation: ColumnsType<DataType> = [
    {
      title: '操作',
      fixed: 'right',
      width: 40,
      key: 'operation',
      render: (props: DataType) => {
        return (
          <DropdownButton>
            <ExtendedButton
              onClick={() => {
                onEdit(props.key)
              }}
              type="success"
            >
              編輯
            </ExtendedButton>
            <ExtendedButton
              onClick={() => {
                onDelete(props)
              }}
              type="primary"
              danger
              disabled={false}
            >
              刪除
            </ExtendedButton>
          </DropdownButton>
        )
      },
    },
  ]

  return (
    <TableTemplate<DataType>
      rowClassName={(record, index) => {
        return index !== 3 ? '' : 'bg-slate-300'
      }}
      templateTableProps={{ width: 60, align: 'center' }}
      data={data}
      columns={columns.concat(operation)}
      searchLayoutArray={[
        {
          label: '案件編號',
          name: 'caseNumber',
        },
      ]}
      onSearch={(values) => console.log(values)}
      // onSelect={(rows) => console.log(rows)}
      onPaginate={(current) => console.log(current)}
      onSort={(sorter) => console.log(sorter)}
      onFilter={(filters) => console.log(filters)}
    />
  )
}

export default Page

export interface DataType {
  key: string
  案件編號: string
  資料編號: string
  資料名稱: string
  統一編號: string
  招攬單位: string
  children?: DataType[]
}

export const data: DataType[] = Array(100)
  .fill(true)
  .map((_, index) => ({
    key: (index + 1).toString(),
    案件編號: faker.string.octal({ length: 10, prefix: 'S_' }),
    資料編號: faker.number.int({ min: 1000000 }).toString(),
    資料名稱: faker.string.binary({ length: 10 }),
    統一編號: faker.number.int({ min: 1000000 }).toString(),
    招攬單位: faker.person.firstName() + '分行',
  }))

data[0].children = Array(4)
  .fill(true)
  .map((_, index) => ({
    key: (index + 1).toString(),
    案件編號: faker.string.octal({ length: 10, prefix: 'S_' }),
    資料編號: faker.number.int({ min: 1000000 }).toString(),
    資料名稱: faker.string.binary({ length: 10 }),
    統一編號: faker.number.int({ min: 1000000 }).toString(),
    招攬單位: faker.person.firstName() + '分行',
  }))

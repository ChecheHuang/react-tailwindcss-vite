import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { FilterDropdownProps } from 'antd/es/table/interface'
import type { ColumnsType } from 'antd/es/table'

import { DataType } from '../types'
import { deleteStore } from '../api/store_list'
import { useAntd } from '../../provider/AntdProvider'
import DropdownButton from '../../components/button/DropdownButton'
import ExtendedButton from '../../components/button/ExtendedButton'

const Columns = (): ColumnsType<DataType> => {
  const { modal, message } = useAntd()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteStore,
    onSuccess: () => {
      message.success('刪除成功')
      queryClient.invalidateQueries(['store_list'])
    },
    onError: (err: Error) => {
      message?.error('刪除失敗!!' + err?.message || '')
    },
  })
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
        deleteMutation(col.id)
      },
    })
  }
  return [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '案件編號',
      render: (props: DataType) => {
        return <Link to={props.id}>{props['caseNo']}</Link>
      },
    },
    {
      title: '特店編號',
      width: 140,
      dataIndex: 'specialStoreNo',
      filterDropdown,
      filterIcon,
    },
    {
      title: '特店名稱',
      dataIndex: 'specialStoreName',
    },
    {
      title: '統一編號',
      dataIndex: 'uniformNo',
      width: 140,
    },
    {
      title: '招攬單位',
      dataIndex: 'solicitationUnit',
    },
    {
      title: '狀態',
      render: (props) => {
        return <div>{props.status === 'normal' ? '正常' : '異常'}</div>
      },
    },
    {
      title: '操作',
      fixed: 'right',
      width: 90,
      key: 'operation',
      render: (props: DataType) => {
        return (
          <DropdownButton>
            <ExtendedButton
              onClick={() => {
                onEdit(props.id)
              }}
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
}

export default Columns
const filterIcon = (filtered: boolean) => (
  <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
)
const filterDropdown = (props: FilterDropdownProps) => {
  const { selectedKeys, setSelectedKeys, confirm, clearFilters } = props
  const handleReset = () => {
    clearFilters?.()
    confirm({ closeDropdown: true })
  }
  return (
    <div className="p-2">
      <Input
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        value={selectedKeys[0]}
      />
      <div className="mt-2 flex justify-around gap-2">
        <ExtendedButton
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => confirm()}
        >
          搜尋
        </ExtendedButton>
        <ExtendedButton onClick={handleReset}>重置</ExtendedButton>
        <ExtendedButton danger onClick={() => confirm({ closeDropdown: true })}>
          取消
        </ExtendedButton>
      </div>
    </div>
  )
}

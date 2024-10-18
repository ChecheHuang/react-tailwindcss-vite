import { Table, Input, Form } from 'antd'
import { Rule } from 'antd/es/form'
import { FormItemProps } from 'antd/es/form'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import {
  FilterDropdownProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface'
import { TableProps } from 'antd/lib/table/InternalTable'
import { useNavigate } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'

import Group from '../../components/Group'
import MyCard from '../../components/MyCard'
import DownloadButton from '../../components/button/DownloadButton'
import ExtendedButton from '../../components/button/ExtendedButton'
import Container from '../../components/container/Container'
import { useWindowInfo } from '../../hooks/useHook'
import { SizeType } from '../../store/modules/themeSlice'

interface TemplateProps<T> extends TableProps<T> {
  data: T[]
  columns: AnyObject[]
  onPaginate?: (pagination: TablePaginationConfig) => void
  onSort?: (sorter: SorterResult<T> | SorterResult<T>[]) => void
  onFilter?: (filters: Record<string, FilterValue | null>) => void
  onSelect?: (selectedRows: T[]) => void
  onExport?: () => void
  templateTableProps?: TemplateTableProps
  onSearch?: (value: T) => void
  searchLayoutArray?: SearchLayoutType[]
}
export interface SearchLayoutType extends FormItemProps<string> {
  label: string
  name: string
  content?: React.ReactNode
  className?: string
  rules?: Rule[]
}

type TemplateTableProps = {
  width?: number
  align?: 'center' | 'left' | 'right'
}

const TableTemplate = <T extends AnyObject>({
  data,
  columns,
  templateTableProps,
  onPaginate,
  onSort,
  onFilter,
  onSelect,
  onExport,
  onSearch,
  searchLayoutArray,
  ...rest
}: TemplateProps<T>) => {
  const width = templateTableProps?.width || 60
  const align = templateTableProps?.align || 'center'
  const { windowHeight } = useWindowInfo()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleChange: TableProps<T>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    const { action } = extra
    const actions = new Map([
      ['paginate', () => onPaginate && onPaginate(pagination)],
      ['sort', () => onSort && onSort(sorter)],
      ['filter', () => onFilter && onFilter(filters)],
    ])
    const doSomething = actions.get(action) || (() => console.log('no action'))
    doSomething?.call(this)
  }

  const handleCreate = () => {
    navigate('create')
  }

  const dataColumns: ColumnsType<T> = columns.map((col) => {
    const modifiedCol = {
      key: col.key ? col.key : col.dataIndex ? col.dataIndex : col.title,
      align,
      width,
      ...col,
    }
    return modifiedCol
  })

  const tableWidth: number = dataColumns.reduce((acc, cur) => {
    acc += cur.width as number
    return acc
  }, 0)
  const handleReset = () => {
    form.resetFields()
  }
  return (
    <Container>
      <MyCard>
        {searchLayoutArray && searchLayoutArray?.length !== 0 && (
          <Form
            className="mb-3"
            layout={'vertical'}
            form={form}
            onFinish={onSearch}
          >
            <div className="relative grid gap-x-3">
              {searchLayoutArray?.map(
                ({ label, name, content, className, rules, ...rest }) => {
                  return (
                    <Form.Item
                      className={className}
                      label={label}
                      key={name}
                      name={name}
                      rules={rules}
                      {...rest}
                    >
                      {content ? (
                        content
                      ) : (
                        <Input placeholder={`請輸入${label}`} />
                      )}
                    </Form.Item>
                  )
                },
              )}
              <div className=" col-span-4 flex items-center justify-end gap-2  ">
                <ExtendedButton onClick={handleReset} danger>
                  清除
                </ExtendedButton>
                <ExtendedButton htmlType="submit">查詢</ExtendedButton>
              </div>
            </div>
          </Form>
        )}

        <div className=" flex justify-end gap-2 ">
          <DownloadButton handleExport={onExport} data={data} />
          <ExtendedButton onClick={handleCreate}>新增</ExtendedButton>
        </div>
        <Table
          size="small"
          onChange={handleChange}
          scroll={{ x: tableWidth, y: windowHeight - 200 }}
          columns={dataColumns}
          dataSource={addKeyToObject(data)}
          pagination={{ position: ['bottomCenter'] }}
          rowSelection={
            onSelect
              ? {
                  type: 'checkbox',
                  onChange: (
                    selectedRowKeys: React.Key[],
                    selectedRows: T[],
                  ) => {
                    onSelect(selectedRows)
                  },
                }
              : undefined
          }
          {...rest}
        />
      </MyCard>
    </Container>
  )
}

export default TableTemplate

export const filterOptions = {
  filterDropdown: (props: FilterDropdownProps) => {
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
          <ExtendedButton
            danger
            onClick={() => confirm({ closeDropdown: true })}
          >
            取消
          </ExtendedButton>
        </div>
      </div>
    )
  },
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
  ),
}

function addKeyToObject(obj: any, keyField?: string): any {
  let key = 1 // 添加一个变量来跟踪索引
  return addKey(obj, keyField || '')

  function addKey(obj: any, keyField: string): any {
    if (Array.isArray(obj)) {
      return obj.map((item: any) => addKey(item, keyField))
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: any = { ...obj }
      newObj.key =
        newObj[keyField] !== undefined
          ? String(newObj[keyField])
          : String(key++)

      if (newObj.children) {
        newObj.children = addKey(newObj.children, keyField).map(
          (child: any) => {
            child.key = `${newObj.key}-${child.key}`
            return child
          },
        )
      }
      return newObj
    } else {
      return obj
    }
  }
}

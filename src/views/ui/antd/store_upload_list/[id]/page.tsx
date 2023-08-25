import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getStore, editStore, createStore } from '../api/store_list'
import { DataType } from '../types'
import { useAntd } from '../../provider/AntdProvider'
import Loading from '../../components/Loading'
import TabContainer from '../../components/container/TabContainer/TabContainer'
import MyCard from '../../components/MyCard'
import Title from '../../components/table/Title'
import Group from '../../components/Group'
import ExtendedButton from '../../components/button/ExtendedButton'

const Page = () => {
  const { id = 'create' } = useParams()
  const buttonText = id === 'create' ? '創建' : '修改'
  const queryClient = useQueryClient()
  const { message } = useAntd()
  const navigate = useNavigate()
  const { data = {}, isFetching } = useQuery({
    queryKey: ['store', id],
    queryFn: () => getStore(id),
    enabled: id !== 'create',
  })

  const { mutate: editMutation } = useMutation({
    mutationFn: editStore,
    onSuccess: () => {
      message.success('修改成功')
      queryClient.invalidateQueries(['store_list'])
      navigate(-1)
    },
    onError: (err: Error) => {
      message?.error('修改失敗!!' + err?.message || '')
    },
  })
  const { mutate: createMutation } = useMutation({
    mutationFn: createStore,
    onSuccess: (data) => {
      message.success('創建成功')
      queryClient.invalidateQueries(['store_list'])
      navigate(-1)
    },
    onError: (err: Error) => {
      message?.error('創建失敗!!' + err?.message || '')
    },
  })
  const handleEdit = (value: Omit<DataType, 'id'>) => {
    if (id === 'create') {
      createMutation(value)
    } else {
      const editData = { id, ...value }
      editMutation(editData)
    }
  }

  if (isFetching) {
    return <Loading />
  }
  return (
    <TabContainer>
      <MyCard>
        <Title title="特店上傳" />
        <Form layout={'vertical'} initialValues={data} onFinish={handleEdit}>
          <Group groupTitle="特店上傳" id="特店上傳" aria-label="特店上傳">
            <Group.Item title="特店上傳">
              <Form.Item label="案件編號" name="caseNo">
                <Input />
              </Form.Item>
              <Form.Item label="特店編號" name="specialStoreNo">
                <Input />
              </Form.Item>
              <Form.Item label="特店名稱" name="specialStoreName">
                <Input />
              </Form.Item>
              <Form.Item label="統一編號" name="uniformNo">
                <Input />
              </Form.Item>
              <Form.Item label="招攬單位" name="solicitationUnit">
                <Input />
              </Form.Item>
              <Form.Item label="狀態" name="status">
                <Input />
              </Form.Item>
            </Group.Item>
          </Group>
          <Form.Item className="col-span-full flex justify-center">
            <ExtendedButton htmlType="submit">{buttonText}</ExtendedButton>
          </Form.Item>
        </Form>
      </MyCard>
    </TabContainer>
  )
}

export default Page

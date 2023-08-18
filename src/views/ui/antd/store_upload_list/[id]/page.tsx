import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input } from 'antd'
import { data as totalData, columns } from '../page'
import { useAntd } from '../../provider/AntdProvider'
import TabContainer from '../../components/container/TabContainer/TabContainer'
import MyCard from '../../components/MyCard'
import Title from '../../components/table/Title'
import Group from '../../components/Group'
import ExtendedButton from '../../components/button/ExtendedButton'
const Page: FC = () => {
  const { id = '創建' } = useParams()
  const { message } = useAntd()

  const data = totalData.find((item) => item.key === id)
  useEffect(() => {
    message.info(id)
  }, [])
  return (
    <TabContainer>
      <MyCard>
        <Title title="資料上傳" />
        <Form
          layout={'vertical'}
          initialValues={data}
          onFinish={(value: any) => {
            message.success('修改成功')
          }}
        >
          <Group groupTitle="資料上傳" id="資料上傳" aria-label="資料上傳">
            <Group.Item title="資料上傳1">
              {columns.map((col, index) => {
                const title = col.title as string
                return (
                  <Form.Item key={index} label={title} name={title}>
                    <Input />
                  </Form.Item>
                )
              })}
            </Group.Item>
            <Group.Item title="資料上傳2">
              {columns.map((col, index) => {
                const title = col.title as string
                return (
                  <Form.Item key={index} label={title} name={title}>
                    <Input />
                  </Form.Item>
                )
              })}
            </Group.Item>
          </Group>
          <Form.Item className="col-span-full flex justify-center">
            <ExtendedButton type="warning" htmlType="submit">
              修改
            </ExtendedButton>
          </Form.Item>
        </Form>
      </MyCard>
    </TabContainer>
  )
}

export default Page

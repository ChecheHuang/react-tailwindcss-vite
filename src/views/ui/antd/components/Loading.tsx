import { Spin } from 'antd'

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

export default Loading

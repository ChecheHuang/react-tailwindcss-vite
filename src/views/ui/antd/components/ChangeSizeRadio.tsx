import { Radio } from 'antd'

const ChangeSizeRadio = () => {
  return (
    <Radio.Group>
      <Radio.Button>小</Radio.Button>
      <Radio.Button>預設</Radio.Button>
      <Radio.Button>大</Radio.Button>
    </Radio.Group>
  )
}

export default ChangeSizeRadio

import { Select } from 'antd'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { SearchLayoutType } from '../../components/table/TableTemplate'
const { RangePicker } = DatePicker
const dateFormat = 'YYYY年MM月DD日'
const searchLayoutArray = (): SearchLayoutType[] => {
  return [
    {
      label: '案件編號',
      name: 'caseNo',
      content: (
        <Select
          placeholder="選擇案件編號"
          options={[
            { value: 'S_1734452021', label: 'S_1734452021' },
            { value: 'S_3472126016', label: 'S_3472126016' },
            { value: 'S_0672575620', label: 'S_0672575620' },
          ]}
        />
      ),
    },
    {
      label: '特店編號',
      name: 'specialStoreNo',
    },
    {
      label: '狀態',
      name: 'status',
      className: 'col-span-2',
      content: (
        <Select
          className="w-full"
          placeholder="選擇狀態"
          options={[
            { value: 'normal', label: '正常' },
            { value: 'abnormal', label: '異常' },
          ]}
        />
      ),
    },
    {
      label: '招攬時間',
      name: '招攬時間',
      content: <RangePicker className="w-full" format={dateFormat} />,
      className: 'col-span-4',
      initialValue: [
        dayjs('2015/01/01', dateFormat),
        dayjs('2015/01/01', dateFormat),
      ],
    },
  ]
}

export default searchLayoutArray

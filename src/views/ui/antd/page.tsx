import Card from 'antd/es/card/Card'

import { cn } from '@/lib/utils'
import { FallOutlined, RiseOutlined } from '@ant-design/icons'
import { Line, Column } from '@ant-design/plots'
import type { LineConfig, ColumnConfig } from '@ant-design/plots'

interface Item {
  title: string
  number: number
  percent: string
  type: 'up' | 'down'
}

const SettingPage = () => {
  const items: Item[] = [
    {
      title: '當年度',
      number: 43234234,
      percent: '43%',
      type: 'up',
    },
    {
      title: '當季度',
      number: 23423325,
      percent: '53%',
      type: 'up',
    },
    {
      title: '當月份',
      number: 432443,
      percent: '23%',
      type: 'down',
    },
    {
      title: '當周',
      number: 12423,
      percent: '53%',
      type: 'down',
    },
  ]
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="grid h-32 grid-cols-4 gap-4">
        {items.map((item) => (
          <Item1 key={item.title} {...item} />
        ))}
      </div>
      <div className=" flex space-x-4">
        <div className=" w-4/6">
          <div className="mb-2 w-full">
            <h1>折線圖</h1>
          </div>
          <Card>
            <DemoLine />
          </Card>
        </div>
        <div className=" flex w-2/6 flex-col">
          <div className="mb-2 w-full">
            <h1>柱狀圖</h1>
          </div>
          <Card className="flex-1">
            <DemoColumn />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingPage

const Item1 = ({ title, number, percent, type }: Item) => {
  const Icon = type === 'up' ? RiseOutlined : FallOutlined

  return (
    <div className=" flex flex-col justify-around rounded-md bg-white p-4">
      <h2 className=" text-lg text-gray-500">{title}</h2>
      <div className="flex flex-wrap items-center">
        <div className="text-lg">{number.toLocaleString()}</div>
        <div
          className={cn(
            'ml-2 flex gap-2 rounded-md p-1 text-white',
            type === 'up' ? 'bg-blue-600' : 'bg-orange-400',
          )}
        >
          <Icon />
          {percent}
        </div>
      </div>
      <div className="text-sm text-gray-400">
        You made an extra
        <span
          className={cn(
            type === 'up' ? 'text-blue-600' : 'text-orange-400',
            'mx-1',
          )}
        >
          35,000
        </span>
        this year
      </div>
    </div>
  )
}

const DemoLine = () => {
  const config: LineConfig = {
    data: lineData,
    autoFit: true,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v: string) => `${(parseInt(v) / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2000,
      },
    },
  }

  return <Line {...config} />
}
const DemoColumn = () => {
  const config: ColumnConfig = {
    data: columnData,
    isGroup: true,
    xField: '月份',
    yField: '月均降雨量',
    seriesField: 'name',
    dodgePadding: 2,
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  }

  return <Column {...config} />
}

const lineData = [
  { name: 'China', year: '2000', gdp: 1211346869605.24 },
  { name: 'China', year: '2001', gdp: 1339395718865.3 },
  { name: 'China', year: '2002', gdp: 1470550015081.55 },
  { name: 'China', year: '2003', gdp: 1660287965662.68 },
  { name: 'China', year: '2004', gdp: 1955347004963.27 },
  { name: 'China', year: '2005', gdp: 2285965892360.54 },
  { name: 'China', year: '2006', gdp: 2752131773355.16 },
  { name: 'China', year: '2007', gdp: 3550342425238.25 },
  { name: 'China', year: '2008', gdp: 4594306848763.08 },
  { name: 'China', year: '2009', gdp: 5101702432883.45 },
  { name: 'China', year: '2010', gdp: 6087164527421.24 },
  { name: 'China', year: '2011', gdp: 7551500425597.77 },
  { name: 'China', year: '2012', gdp: 8532230724141.76 },
  { name: 'China', year: '2013', gdp: 9570405758739.79 },
  { name: 'China', year: '2014', gdp: 10438529153237.6 },
  { name: 'China', year: '2015', gdp: 11015542352468.9 },
  { name: 'China', year: '2016', gdp: 11137945669350.6 },
  { name: 'China', year: '2017', gdp: 12143491448186.1 },
  { name: 'China', year: '2018', gdp: 13608151864637.9 },
  { name: 'United States', year: '2000', gdp: 10252345464000 },
  { name: 'United States', year: '2001', gdp: 10581821399000 },
  { name: 'United States', year: '2002', gdp: 10936419054000 },
  { name: 'United States', year: '2003', gdp: 11458243878000 },
  { name: 'United States', year: '2004', gdp: 12213729147000 },
  { name: 'United States', year: '2005', gdp: 13036640229000 },
  { name: 'United States', year: '2006', gdp: 13814611414000 },
  { name: 'United States', year: '2007', gdp: 14451858650000 },
  { name: 'United States', year: '2008', gdp: 14712844084000 },
  { name: 'United States', year: '2009', gdp: 14448933025000 },
  { name: 'United States', year: '2010', gdp: 14992052727000 },
  { name: 'United States', year: '2011', gdp: 15542581104000 },
  { name: 'United States', year: '2012', gdp: 16197007349000 },
  { name: 'United States', year: '2013', gdp: 16784849190000 },
  { name: 'United States', year: '2014', gdp: 17521746534000 },
  { name: 'United States', year: '2015', gdp: 18219297584000 },
  { name: 'United States', year: '2016', gdp: 18707188235000 },
  { name: 'United States', year: '2017', gdp: 19485393853000 },
  { name: 'United States', year: '2018', gdp: 20544343456936.5 },
  { name: 'United Kingdom', year: '2000', gdp: 1657816613708.58 },
  { name: 'United Kingdom', year: '2001', gdp: 1640246149417.01 },
  { name: 'United Kingdom', year: '2002', gdp: 1784473920863.31 },
  { name: 'United Kingdom', year: '2003', gdp: 2053018775510.2 },
  { name: 'United Kingdom', year: '2004', gdp: 2416931526913.22 },
  { name: 'United Kingdom', year: '2005', gdp: 2538680000000 },
  { name: 'United Kingdom', year: '2006', gdp: 2713749770009.2 },
  { name: 'United Kingdom', year: '2007', gdp: 3100882352941.18 },
  { name: 'United Kingdom', year: '2008', gdp: 2922667279411.76 },
  { name: 'United Kingdom', year: '2009', gdp: 2410909799034.12 },
  { name: 'United Kingdom', year: '2010', gdp: 2475244321361.11 },
  { name: 'United Kingdom', year: '2011', gdp: 2659310054646.23 },
  { name: 'United Kingdom', year: '2012', gdp: 2704887678386.72 },
  { name: 'United Kingdom', year: '2013', gdp: 2786022872706.81 },
  { name: 'United Kingdom', year: '2014', gdp: 3063803240208.01 },
  { name: 'United Kingdom', year: '2015', gdp: 2928591002002.51 },
  { name: 'United Kingdom', year: '2016', gdp: 2694283209613.29 },
  { name: 'United Kingdom', year: '2017', gdp: 2666229179958.01 },
  { name: 'United Kingdom', year: '2018', gdp: 2855296731521.96 },
  { name: 'Russian', year: '2000', gdp: 259710142196.94 },
  { name: 'Russian', year: '2001', gdp: 306602070620.5 },
  { name: 'Russian', year: '2002', gdp: 345470494417.86 },
  { name: 'Russian', year: '2003', gdp: 430347770731.79 },
  { name: 'Russian', year: '2004', gdp: 591016690742.8 },
  { name: 'Russian', year: '2005', gdp: 764017107992.39 },
  { name: 'Russian', year: '2006', gdp: 989930542278.7 },
  { name: 'Russian', year: '2007', gdp: 1299705764823.62 },
  { name: 'Russian', year: '2008', gdp: 1660846387624.78 },
  { name: 'Russian', year: '2009', gdp: 1222644282201.86 },
  { name: 'Russian', year: '2010', gdp: 1524917468442.01 },
  { name: 'Russian', year: '2011', gdp: 2051661732059.78 },
  { name: 'Russian', year: '2012', gdp: 2210256976945.38 },
  { name: 'Russian', year: '2013', gdp: 2297128039058.21 },
  { name: 'Russian', year: '2014', gdp: 2059984158438.46 },
  { name: 'Russian', year: '2015', gdp: 1363594369577.82 },
  { name: 'Russian', year: '2016', gdp: 1282723881134.01 },
  { name: 'Russian', year: '2017', gdp: 1578624060588.26 },
  { name: 'Russian', year: '2018', gdp: 1657554647149.87 },
  { name: 'Japan', year: '2000', gdp: 4887519660744.86 },
  { name: 'Japan', year: '2001', gdp: 4303544259842.72 },
  { name: 'Japan', year: '2002', gdp: 4115116279069.77 },
  { name: 'Japan', year: '2003', gdp: 4445658071221.86 },
  { name: 'Japan', year: '2004', gdp: 4815148854362.11 },
  { name: 'Japan', year: '2005', gdp: 4755410630912.14 },
  { name: 'Japan', year: '2006', gdp: 4530377224970.4 },
  { name: 'Japan', year: '2007', gdp: 4515264514430.57 },
  { name: 'Japan', year: '2008', gdp: 5037908465114.48 },
  { name: 'Japan', year: '2009', gdp: 5231382674593.7 },
  { name: 'Japan', year: '2010', gdp: 5700098114744.41 },
  { name: 'Japan', year: '2011', gdp: 6157459594823.72 },
  { name: 'Japan', year: '2012', gdp: 6203213121334.12 },
  { name: 'Japan', year: '2013', gdp: 5155717056270.83 },
  { name: 'Japan', year: '2014', gdp: 4850413536037.84 },
  { name: 'Japan', year: '2015', gdp: 4389475622588.97 },
  { name: 'Japan', year: '2016', gdp: 4926667087367.51 },
  { name: 'Japan', year: '2017', gdp: 4859950558538.97 },
  { name: 'Japan', year: '2018', gdp: 4971323079771.87 },
]
const columnData = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', 月份: 'May', 月均降雨量: 47 },
  { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
]

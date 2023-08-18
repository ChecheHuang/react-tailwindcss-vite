interface LotteryRuleState {
  顯示中獎資訊: string[]
  抽獎規則: string[]
}
interface PrizeType {
  id: string
  prize: string
  img: string
  quantity: number
}
interface LotteryType extends LotteryDefaultType {
  [key: string]: any
}

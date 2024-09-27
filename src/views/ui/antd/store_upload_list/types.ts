export interface DataType {
  id: string
  caseNo: string
  specialStoreNo: string
  specialStoreName: string
  uniformNo: string
  solicitationUnit: string
  status: string
  children?: DataType[]
}
export interface FilterInfo extends Partial<Omit<DataType, 'id' | 'children'>> {
  _page?: string
  _limit?: string
}

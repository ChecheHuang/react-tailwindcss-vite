import { FC, useState } from 'react'
import ExtendedButton from './ExtendedButton'
import * as XLSX from 'xlsx'

interface DownloadButtonProps {
  data: AnyObject[]
  handleExport?: () => void
}

const DownloadButton: FC<DownloadButtonProps> = ({
  data = [],
  handleExport,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  function handleOnExport() {
    setLoading(true)
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, 'excel')
    XLSX.writeFile(wb, 'Excel.xlsx')
    setLoading(false)
  }

  const onClickHandler = handleExport ? handleExport : handleOnExport

  return (
    <>
      <ExtendedButton
        className="bg-green-800 hover:!bg-green-700"
        type="primary"
        onClick={onClickHandler}
        loading={loading}
      >
        下載Excel
      </ExtendedButton>
    </>
  )
}

export default DownloadButton

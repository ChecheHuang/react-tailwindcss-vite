import { Button } from 'antd'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { useState } from 'react'

import { Worker, Viewer, LocalizationMap } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import zh_TW from '@react-pdf-viewer/locales/lib/zh_TW.json'

import file from '../1.pdf'

function PdfPage() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const [pdfFile, setPdfFile] = useState<null | string>(file)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFile = e.target.files && e.target.files[0]
      if (selectedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = (e) => {
          const result = e.target?.result as string
          setPdfFile(result)
        }
      }
    }
  }
  return (
    <div>
      <div className="my-2 flex gap-2"></div>

      <Button type="primary">
        <input
          id="fileUpload"
          onChange={handleFile}
          type="file"
          className=" hidden"
        />
        <label className=" cursor-pointer" htmlFor="fileUpload">
          選擇檔案
        </label>
      </Button>
      <div className=" m-auto   p-4 ">
        {pdfFile && (
          <Worker workerUrl={pdfWorker}>
            <Viewer
              localization={zh_TW as unknown as LocalizationMap}
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        )}
      </div>
    </div>
  )
}

export default PdfPage

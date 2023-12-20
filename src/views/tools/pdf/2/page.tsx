import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import file from '../1.pdf'

import { Worker, Viewer, LocalizationMap } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import zh_TW from '@react-pdf-viewer/locales/lib/zh_TW.json'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
function TestPage() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  return (
    <div>
      <div className="my-2 flex gap-2"></div>
      <div className=" m-auto h-[90vh] w-[80vw] bg-slate-400 ">
        {file && (
          <Worker workerUrl={pdfWorker}>
            <Viewer
              localization={zh_TW as unknown as LocalizationMap}
              fileUrl={file}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        )}
      </div>
    </div>
  )
}

export default TestPage

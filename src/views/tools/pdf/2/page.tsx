import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import React from 'react'
import { useState } from 'react'
//顯示
import { Worker } from '@react-pdf-viewer/core'
import { Viewer, ScrollMode } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
//放大縮小
import { zoomPlugin } from '@react-pdf-viewer/zoom'

//頁數
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation'
import file from '../1.pdf'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/page-navigation/lib/styles/index.css'

import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode'

import { getFilePlugin } from '@react-pdf-viewer/get-file'

import { LayerRenderStatus } from '@react-pdf-viewer/core'
import { Button } from 'antd'

function TestPage() {
  const [pdfFile, setPdfFile] = useState<null | string>(file)

  const customCanvasPluginInstance = {
    onCanvasLayerRender: (e: any) => {
      if (e.status !== LayerRenderStatus.DidRender) {
        return
      }
      const canvas = e.ele
      const ctx = canvas.getContext('2d')
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const [fontSize, fontType] = ctx.font.split(' ')

      ctx.textAlign = 'center'
      ctx.font = `${parseInt(fontSize, 10) * e.scale * 4}px ${fontType}`

      ctx.fillStyle = 'rgba(204, 204, 204, 0.5)'
      ctx.fillText('浮水印', centerX, centerY)
    },
  }
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: () => {
      return '下載檔案'
    },
  })
  const { Download } = getFilePluginInstance

  const scrollModePluginInstance = scrollModePlugin()
  const { SwitchScrollMode } = scrollModePluginInstance
  //頁數
  const pageNavigationPluginInstance = pageNavigationPlugin()

  const { CurrentPageLabel, GoToNextPage, GoToPreviousPage } =
    pageNavigationPluginInstance
  //放大縮小
  const zoomPluginInstance = zoomPlugin()
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance
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
      <div className="my-2 flex gap-2">
        <input
          id="fileUpload"
          onChange={handleFile}
          type="file"
          className=" hidden"
        />
        <Button type="primary">
          <label className=" cursor-pointer" htmlFor="fileUpload">
            選擇檔案
          </label>
        </Button>
        <SwitchScrollMode mode={ScrollMode.Horizontal}>
          {(props) => <Button onClick={props.onClick}>水平滑動</Button>}
        </SwitchScrollMode>
        <ZoomOut>
          {(props) => <Button onClick={props.onClick}>縮小</Button>}
        </ZoomOut>
        <CurrentScale>
          {(props) => (
            <div className="flex items-center">{`${Math.round(
              props.scale * 100
            )}%`}</div>
          )}
        </CurrentScale>
        <ZoomIn>
          {(props) => <Button onClick={props.onClick}>放大</Button>}
        </ZoomIn>
        <GoToPreviousPage>
          {(props) => (
            <Button disabled={props.isDisabled} onClick={props.onClick}>
              上一頁
            </Button>
          )}
        </GoToPreviousPage>
        <CurrentPageLabel>
          {(props) => (
            <div className="flex items-center">
              {`${props.currentPage + 1}
               / ${props.numberOfPages}`}
            </div>
          )}
        </CurrentPageLabel>
        <GoToNextPage>
          {(props) => (
            <Button disabled={props.isDisabled} onClick={props.onClick}>
              下一頁
            </Button>
          )}
        </GoToNextPage>
        <Download>
          {(props) => <Button onClick={props.onClick}>下載</Button>}
        </Download>
      </div>
      <div className=" m-auto h-[73vh] w-[80vw] bg-slate-400 ">
        {pdfFile && (
          <Worker workerUrl={pdfWorker}>
            <Viewer
              plugins={[
                zoomPluginInstance,
                scrollModePluginInstance,
                pageNavigationPluginInstance,
                getFilePluginInstance,
                customCanvasPluginInstance,
              ]}
              fileUrl={pdfFile}
            />
          </Worker>
        )}
      </div>
    </div>
  )
}

export default TestPage

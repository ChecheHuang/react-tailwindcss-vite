import { Button, Popover, Input, Select } from 'antd'
import { fabric } from 'fabric'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LuPenLine } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import { useInput } from '@/hooks/useHook'

// fabric.Object.prototype.transparentCorners = false
// fabric.Object.prototype.cornerColor = 'blue'
fabric.Object.prototype.cornerStyle = 'circle'

const Page = () => {
  const fileId = useParams().fileId as string

  const [open, setOpen] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const [canvas, setCanvas] = useState<Nullable<fabric.Canvas>>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { inputProps, reset } = useInput('')
  const [isDrawingMode, setIsDrawingMode] = useState(false)

  const [isChangeText, setIsChangeText] = useState(false)
  const [currentFontObject, setCurrentFontObject] = useState({
    fontFamily: '標楷體',
    fontWeight: 400,
  })

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleAddText = () => {
    if (!canvas) return
    canvas.add(
      new fabric.IText(inputProps.value, {
        fontFamily: '標楷體',
        fontWeight: 400,
        backgroundColor: 'white',
      }),
    )

    setOpen(false)
    reset()
  }
  const handleFontFamilyChange = (fontFamily: string) => {
    handleFontChange('fontFamily', fontFamily)
    setCurrentFontObject((prev) => ({ ...prev, fontFamily }))
  }
  const handleFontWeightChange = (fontWeight: number) => {
    handleFontChange('fontWeight', fontWeight)
    setCurrentFontObject((prev) => ({ ...prev, fontWeight }))
  }

  const handleFontChange = (
    type: 'fontFamily' | 'fontWeight',
    value: string | number,
  ) => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject && activeObject instanceof fabric.IText) {
      activeObject.set(type, value)
      canvas.renderAll()
    }
  }

  const handleDelete = useCallback(() => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      canvas.remove(activeObject)
      canvas.renderAll()
    }
  }, [canvas])

  const handleAddDate = () => {
    if (!canvas) return
    canvas.add(
      new fabric.IText(new Date().toLocaleString(), {
        fontFamily: '標楷體',
        fontWeight: 400,
        fontSize: 14,
        backgroundColor: 'white',
        top: 20,
        left: 830,
      }),
    )
  }

  const handlePencilBrush = () => {
    const brushColor = 'hotpink'
    const brushSize = 30

    const getDrawCursor = () => {
      const circle = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushSize}" 
			/>
		</svg>
	`

      return `data:image/svg+xml;base64,${window.btoa(circle)}`
    }
    if (!canvas) return
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.width = 20
    canvas.freeDrawingBrush.color = 'white'
    canvas.freeDrawingCursor = `url(${getDrawCursor()}) ${brushSize / 2} ${
      brushSize / 2
    }, crosshair`
    canvas.isDrawingMode = !canvas.isDrawingMode
    setIsDrawingMode(!isDrawingMode)
  }

  const handleDownload = () => {
    if (!canvas) return
    const dataURL = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'image.png'
    link.click()
  }

  useEffect(() => {
    const imageUrl =
      'https://images.pexels.com/photos/434341/pexels-photo-434341.jpeg?auto=compress&cs=tinysrgb&w=600'
    fabric.Image.fromURL(imageUrl, (img) => {
      const { height, width } = img
      if (!height || !width) {
        console.error('Failed to load image!')
        return
      }

      const ratio = 1000 / width
      const scaledWidth = width * ratio
      const scaledHeight = height * ratio

      img.scaleToWidth(scaledWidth)
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: scaledWidth,
        height: scaledHeight,
      })
      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas))

      setCanvas(newCanvas)
    })

    return () => {}
  }, [fileId])

  useEffect(() => {
    if (!canvas) return
    canvas.on('mouse:down', () => {
      const activeObject = canvas.getActiveObject() as unknown as {
        fontFamily: string
        fontWeight: number
      }
      if (!activeObject) return
      const { fontFamily, fontWeight } = activeObject
      setIsChangeText(true)
      setCurrentFontObject({ fontFamily, fontWeight })
    })
    canvas.on('selection:cleared', () => {
      setIsChangeText(false)
    })
    canvas.on('object:added', (event) => {
      const target = event.target
      if (target) {
        canvas.setActiveObject(target)
        setIsChangeText(true)
      }
    })

    return () => {
      canvas.off('mouse:down')
      canvas.off('selection:cleared')
    }
  }, [canvas])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') handleDelete()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleDelete])

  return (
    <>
      <div className="mt-2 flex w-full flex-col flex-wrap items-center">
        <div className="flex  flex-wrap gap-2 p-2">
          <Popover
            trigger="click"
            open={open}
            onOpenChange={(newOpen: boolean) => {
              setOpen(newOpen)
            }}
            content={
              <div className="flex gap-2">
                <Input {...inputProps} className=" w-28" />
                <Button onClick={handleAddText} type="primary">
                  確定
                </Button>
              </div>
            }
          >
            <Button type="primary">新增文字</Button>
          </Popover>
          <Select
            disabled={!isChangeText}
            placeholder="選擇字體"
            className="w-28"
            {...(isChangeText && { value: currentFontObject.fontFamily })}
            onChange={handleFontFamilyChange}
            options={[
              { value: '標楷體', label: '標楷體' },
              { value: '新細明體', label: '新細明體' },
            ]}
          />
          <Select
            disabled={!isChangeText}
            placeholder="選擇粗細"
            className="w-28"
            {...(isChangeText && { value: currentFontObject.fontWeight })}
            onChange={handleFontWeightChange}
            options={[
              { value: 400, label: '正常' },
              { value: 700, label: '粗體' },
            ]}
          />
          <Button
            type={isDrawingMode ? 'primary' : 'default'}
            onClick={() => handlePencilBrush()}
          >
            <LuPenLine />
          </Button>
          <Button onClick={handleAddDate}>增加日期</Button>
          <Button onClick={handleDelete}>刪除</Button>
          <Button onClick={handlePrint}>列印</Button>
          <Button onClick={handleDownload}>下載</Button>
        </div>
        <div className="flex w-full justify-center " ref={componentRef}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </>
  )
}

export default Page

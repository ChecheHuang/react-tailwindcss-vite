import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import { cn } from '@/lib/utils'

import Clock from './components/Clock'
import Text from './components/Text'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import './styles.css'

const StudyPage = () => {
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        data-section="study"
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary p-4 md:flex-row md:p-2 md:gap-2"
      >
        <div className="max-w-md p-4  md:w-1/3 ">
          <Text text="STEP1：找出你最想問這本書的一個問題" delay={150} />
          <br />
          <Text text="STEP2：限時30分鐘快速摘出16個關鍵字" delay={150} />
          <br />
          <Text text="STEP3：針對這16個關鍵字，整理出3到5個重點" delay={150} />
          <br />
          <Text text="STEP4：複述心得" delay={150} />
        </div>
        <div className="flex flex-col items-center w-full  max-w-4xl gap-2 md:w-2/3">
          <div ref={printRef}>
            <div
              className={cn(
                'grid grid-cols-1 grid-rows-5 gap-2 bg-white rounded-lg opacity-80 p-4 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-5 md:grid-rows-5 md:w-full md:h-[500px]',
                'aspect-[1.414/1] ',
              )}
            >
              <div className="space-y-1 col-span-1 md:col-span-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="book" className="w-12 text-black">
                    書名
                  </Label>
                  <Input id="book" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="question" className="w-12 text-black">
                    問題
                  </Label>
                  <Input id="question" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="motivation" className="w-12 text-black">
                    動機
                  </Label>
                  <Input id="motivation" />
                </div>
              </div>
              {Array(16)
                .fill('')
                .map((_, index) => (
                  <Textarea
                    placeholder={`關鍵字${index + 1}`}
                    key={index}
                    className="resize-none"
                  />
                ))}
              <div className="col-span-1 md:col-start-4 md:row-start-1 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="mainPoint" className="w-12 text-black">
                    要點
                  </Label>
                  <Textarea id="mainPoint" className="resize-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:row-start-2 md:col-start-5 md:row-span-2">
                <Label htmlFor="aware" className="w-12 text-black">
                  察覺點
                </Label>
                <Textarea id="aware" className="resize-none flex-1" />
              </div>
              <div className="flex flex-col gap-2 md:row-start-4 md:col-start-5 md:row-span-2">
                <Label htmlFor="summarize" className="w-12 text-black">
                  總結
                </Label>
                <Textarea id="summarize" className="resize-none flex-1" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Clock />
            <Button onClick={handlePrint}>列印</Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default StudyPage

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import Step from './Step'

const Page = () => {
  const [step, setStep] = useState(1)

  return (
    <div className="w-[500px] bg-yellow-200">
      <div className="flex items-center gap-2">
        <Button onClick={() => setStep((prev) => prev - 1)}>-</Button>
        {step}
        <Button onClick={() => setStep((prev) => prev + 1)}>+</Button>
      </div>
      <Step current={step}>
        <Step.Item title="選擇幣種">
          <div className="h-[300px]">step1</div>
        </Step.Item>
        <Step.Item title="提現地址">
          <div className="h-[200px]">step2</div>
        </Step.Item>
        <Step.Item title="提現數量">
          <div className="h-[100px]">step2</div>
        </Step.Item>
        <Step.Item title="提現數量">
          <div className="h-[100px]">step2</div>
        </Step.Item>
      </Step>
    </div>
  )
}

export default Page

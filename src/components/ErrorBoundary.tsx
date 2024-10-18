import errorLottie from '@/assets/lottie/error.json'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import Lottie from 'lottie-react'
import { Button } from './ui/button'

function MyErrorBoundary({ children }: { children: React.ReactNode }) {
  function fallbackRender({ error,  resetErrorBoundary: fn}: FallbackProps) {
    const resetErrorBoundary = ()=>{
      fn()
      window.location.reload()
    }

    return (
      <div
        className="flex  flex-col items-center justify-center bg-white"
        role="alert"
      >
        <p>Something went wrong:</p>
        <div className="w-full text-center whitespace-pre-wrap" style={{ color: 'red' }}>
          {error.message}
        </div>
        <Button onClick={resetErrorBoundary}>
          重新載入
        </Button>
        <Lottie
          className="h-[80vh]"
          onClick={resetErrorBoundary}
          animationData={errorLottie}
        />
      </div>
    )
  }
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export default MyErrorBoundary
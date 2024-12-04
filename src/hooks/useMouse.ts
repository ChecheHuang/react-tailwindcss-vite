import { useState, useEffect, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
}

function useMouseY(): MousePosition {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })

  const mouseListener = useCallback((event: MouseEvent) => {
    setMousePos({ x: event.pageX, y: event.pageY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', mouseListener)
    return () => {
      window.removeEventListener('mousemove', mouseListener)
    }
  }, [mouseListener])

  return mousePos
}

export default useMouseY

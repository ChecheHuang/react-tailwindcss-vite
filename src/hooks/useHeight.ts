import { useState, useEffect } from 'react'

function useHeight(className: string): number {
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement
      setContainerHeight(target.scrollTop)
    }

    const container = document.querySelector(className) as HTMLElement
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [className])

  return containerHeight
}

export default useHeight

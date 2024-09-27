import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {debounce} from 'lodash'
export function useWindowInfo() {
  const [windowInfo, setWindowInfo] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  })

  const updateWindow = useCallback(() => {
    setWindowInfo({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateWindow = useCallback(debounce(updateWindow, 200), [
    debounce,
  ])

  useEffect(() => {
    window.addEventListener('resize', debouncedUpdateWindow)

    return () => {
      window.removeEventListener('resize', debouncedUpdateWindow)
    }
  }, [debouncedUpdateWindow])

  return windowInfo
}

function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  const dep = deps?.map((item) => JSON.stringify(item))

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep)
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}



export const useInput = (
  initialValue: string,
): {
  inputProps: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  reset: () => void
  setInput: (value: string) => void
} => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const setInput = (value: string) => setValue(value)

  const reset = () => {
    setValue(initialValue)
  }

  return { inputProps: { value, onChange: handleChange }, reset, setInput }
}

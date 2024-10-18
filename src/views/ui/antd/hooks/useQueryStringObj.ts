import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUpdateEffect } from 'usehooks-ts'

export default function useQueryStringObj<T>(
  initialState: T,
): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(initialState)
  const [params, setParams] = useSearchParams()

  const paramsObject = useMemo(() => {
    const paramsObject: Record<string | number, any> = {}
    for (const [name, value] of params) {
      paramsObject[name] = value
    }
    return paramsObject
  }, [params])

  useEffect(() => {
    setState(paramsObject as T)
  }, [])

  useUpdateEffect(() => {
    setParams(state as Record<string | number, any>)
  }, [state])

  return [state, setState]
}

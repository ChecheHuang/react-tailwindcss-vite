import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

type MyContextType = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const MyContext = createContext<MyContextType | undefined>(undefined)
export const useMyContext = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext 必須在 MyProvider 中使用')
  }
  return context
}
const ContextPage = () => {
  const [value, setValue] = useState<string>('初始值')

  return (
    <MyContext.Provider value={{ value, setValue }}>
      <MyComponent />
    </MyContext.Provider>
  )
}

export default ContextPage

const MyComponent = () => {
  const { value, setValue } = useMyContext()

  return (
    <div className="rounded bg-gray-100 p-4 shadow-md">
      <p className="mb-2 text-lg font-semibold">當前值: {value}</p>
      <button
        onClick={() => setValue('新值')}
        className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        更新值
      </button>
    </div>
  )
}

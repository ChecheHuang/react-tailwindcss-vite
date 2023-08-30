import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillDelete } from 'react-icons/ai'
import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { cn } from '@/lib/utils'
import { toast } from 'react-toastify'
import { IoClose } from 'react-icons/io5'
import Input from '../inputs/Input'
import { cn } from '@/lib/utils'
import Item from '../Item'

const initPeople: PeopleType[] = [
  // {
  //   id: '1',
  //   姓名: '黃阿狗',
  //   次數: 1,
  // },
  // {
  //   id: '2',
  //   姓名: '連成公',
  //   次數: 3,
  // },
  // {
  //   id: '3',
  //   姓名: '陳大美',
  //   次數: 5,
  // },
]

interface PeopleDefault {
  id: string
  次數: number
}
interface PeopleType extends PeopleDefault {
  [key: string]: any
}
interface SetLotteryListProps {
  setLotteryList: React.Dispatch<React.SetStateAction<LotteryType[]>>
  columns: string[]
  setColumns: React.Dispatch<React.SetStateAction<string[]>>
}

export type SetLotteryListRef = {
  columns: string[]
}
const SetLotteryList: React.FC<SetLotteryListProps> = ({
  setLotteryList,
  columns,
  setColumns,
}) => {
  const addColumnRef = useRef<HTMLInputElement>(null)
  const [isSettingComplete, SetIsSettingComplete] = useState(false)
  const [people, setPeople] = useState<PeopleType[]>(initPeople)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()
  const addPeople = (data: PeopleType | PeopleType[]) =>
    setPeople((prev) => [...(Array.isArray(data) ? data : [data]), ...prev])
  const removePeople = (id: string) =>
    setPeople((prev) => [...prev].filter((people) => people.id !== id))

  function readExcel(e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = e.target.files?.[0]
    if (file) {
      const promise = new Promise<Array<any>>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
          const bufferArray = e.target?.result as ArrayBuffer
          const wb = XLSX.read(bufferArray, { type: 'buffer' })
          const wsName = wb.SheetNames[0]
          const ws = wb.Sheets[wsName]
          const data = XLSX.utils.sheet_to_json(ws)
          resolve(data)
        }
        fileReader.onerror = (error) => {
          reject(error)
        }
      })
      promise.then((data) => {
        const excelCols = Object.keys(data[0])
        const isContinue = columns
          .filter((col) => col !== '次數')
          .every((value) => excelCols.includes(value))
        if (!isContinue) {
          return toast.error('匯入失敗，確認您的檔案格式', { autoClose: 500 })
        }
        const people = data.map((person) => {
          const newPerson = { ...person, id: uuidv4() }
          const parsedCount = parseInt(newPerson['次數'])

          if (isNaN(parsedCount)) {
            newPerson['次數'] = 1
          } else {
            newPerson['次數'] = parsedCount
          }

          return newPerson
        })
        addPeople(people)
        toast.success('成功加入', { autoClose: 500 })
      })
    }
    e.target.value = ''
  }
  function handleAddColumn() {
    if (!addColumnRef.current) return
    const newCol = addColumnRef.current
    const newColValue = newCol?.value
    if (!newColValue) {
      newCol.focus()
      toast.info('請輸入要加入的欄位', { autoClose: 500 })
      return
    }
    if (columns.includes(newColValue)) {
      toast.error('已經加入欄位', { autoClose: 500 })
      return
    }

    setColumns((prev) => [newColValue, ...prev])
    newCol.value = ''
    newCol.focus()
    toast.success('成功加入欄位', { autoClose: 500 })
  }
  const handleAddPeople: SubmitHandler<FieldValues> = (data) => {
    addPeople({
      id: uuidv4(),
      ...data,
      次數: parseInt(data['次數']),
    } as PeopleType)
    toast.dark('成功加入', { autoClose: 500 })
    reset()
  }
  const peopleInfo = useMemo(
    () => ({
      length: people.length,
      total: people.reduce((prev, current) => prev + current['次數'], 0),
    }),
    [people]
  )
  useEffect(() => {
    setLotteryList(
      people.reduce((acc, { 次數, ...rest }) => {
        const person = { ...rest }
        for (let i = 0; i < 次數; i++) {
          acc = [...acc, person]
        }
        return acc
      }, [] as LotteryType[])
    )
  }, [people, setLotteryList])
  return (
    <Item title="加入抽獎名單">
      {!isSettingComplete ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <div className="flex w-[350px] flex-wrap items-center gap-2">
            欄位
            {columns.map((column) => (
              <div className="badge badge-info" key={column}>
                {column}
                <IoClose
                  onClick={() =>
                    setColumns((prev) =>
                      prev.filter((item) => item !== column || item === '次數')
                    )
                  }
                  className="ml-1 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="grid grid-cols-10 gap-3">
              <input
                placeholder="輸入要加入的欄位"
                type="text"
                className="input-secondary input col-span-7 "
                ref={addColumnRef}
              />
              <button
                onClick={handleAddColumn}
                className="btn-secondary btn col-span-3 "
              >
                加入欄位
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (columns.length === 1) {
                toast.error('至少加入一個欄位', { autoClose: 500 })
                return
              }
              SetIsSettingComplete(true)
              localStorage.setItem('columns', JSON.stringify(columns))
            }}
            className="btn-primary btn"
            disabled={columns.length === 1}
          >
            設定完成
          </button>
        </div>
      ) : (
        <>
          <input
            className="hidden"
            id="file"
            type="file"
            onChange={readExcel}
          />
          <label
            htmlFor="file"
            className={cn(
              ' btn-neutral btn absolute text-white sm:-top-8 sm:right-10 ',
              'btn-sm -top-6 right-0 sm:btn-md '
            )}
          >
            匯入EXCEL
          </label>
          <form
            onSubmit={handleSubmit(handleAddPeople)}
            style={{
              gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`,
            }}
            className="mt-4 grid gap-4"
          >
            {columns.map((column) => {
              const isFreq = column === '次數'
              return (
                <React.Fragment key={column}>
                  <Input
                    defaultValue={isFreq ? '1' : ''}
                    errors={errors}
                    register={register}
                    required
                    id={column}
                    label={column}
                    rule={isFreq ? { min: 1 } : {}}
                    type={isFreq ? 'number' : 'text'}
                  />
                </React.Fragment>
              )
            })}

            <button
              type="submit"
              className="text-dark btn-secondary btn whitespace-nowrap"
            >
              加入抽獎
            </button>
          </form>
          <div className="h-full  w-full overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900 ">
            {people.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`,
                  }}
                  className="  grid  grid-rows-[40px]  place-items-center gap-4"
                >
                  {columns.map((column) => (
                    <div
                      className={cn(
                        ' w-full   cursor-pointer overflow-hidden text-ellipsis text-center ',
                        ' transition duration-500 ease-in-out hover:break-words hover:text-orange-900'
                      )}
                      key={column}
                    >
                      {item[column]}
                    </div>
                  ))}
                  <div>
                    <button
                      className="group btn-primary btn-sm btn"
                      onClick={() => removePeople(item.id)}
                    >
                      <AiFillDelete className=" text-2xl text-base-100 transition duration-200 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex w-full justify-center">
            共{peopleInfo.length}個人，{peopleInfo.total}次抽獎次數
          </div>
        </>
      )}
    </Item>
  )
}

export default SetLotteryList

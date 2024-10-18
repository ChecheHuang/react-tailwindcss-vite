import React, { useMemo } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillDelete } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { cn } from '@/lib/utils'

import defaultPrize from '../../images/defaultPrize.jpeg'
import smallImg from '../../images/small.png'
import Item from '../Item'
import Input from '../inputs/Input'

interface SetPrizeProps {
  addPrize: (data: PrizeType) => void
  removePrize: (id: string) => void
  prizes: PrizeType[]
}

const SetPrize: React.FC<SetPrizeProps> = ({
  addPrize,
  removePrize,
  prizes,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      prize: '',
      quantity: 1,
      img: defaultPrize,
    },
  })
  const handleAddPrize: SubmitHandler<FieldValues> = (data) => {
    addPrize({ id: uuidv4(), ...data } as PrizeType)
    toast.dark('成功加入', { autoClose: 500 })
    reset()
  }
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const reader = new FileReader()
    reader.onload = function () {
      setValue('img', reader.result as string)
    }
    reader.readAsDataURL(e.target.files[0])
    e.target.value = ''
  }

  const total = useMemo(
    () => prizes.reduce((prev, current) => prev + current.quantity, 0),
    [prizes],
  )
  return (
    <Item title="設定獎項">
      <form
        className="mt-4 grid grid-cols-4 gap-4"
        onSubmit={handleSubmit(handleAddPrize)}
      >
        <Input
          errors={errors}
          register={register}
          id="prize"
          label="獎品"
          type="text"
        />
        <Input
          errors={errors}
          register={register}
          id="quantity"
          label="數量"
          type="number"
          rule={{ min: 1 }}
        />

        <input
          id="imgFile"
          {...register('img', { onChange: handleUploadFile })}
          className="hidden"
          type="file"
        />
        <label
          htmlFor="imgFile"
          className="  btn-primary btn w-full whitespace-nowrap font-thin text-white"
        >
          上傳圖片
        </label>
        <button
          type="submit"
          className="text-dark btn-secondary btn whitespace-nowrap "
        >
          加入獎項
        </button>
      </form>
      <div className="h-full  w-full overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900 ">
        {prizes.map(({ prize, img, quantity, id }) => {
          return (
            <div
              key={id}
              className="  grid grid-cols-4 grid-rows-[100px]  place-items-center gap-4"
            >
              <div
                className={cn(
                  ' w-full   cursor-pointer overflow-hidden text-ellipsis text-center ',
                  ' transition duration-500 ease-in-out hover:break-words hover:text-orange-900',
                )}
              >
                {prize}
              </div>
              <div>{quantity}</div>
              <div className="h-full overflow-hidden p-2">
                <LazyLoadImage
                  height={'100%'}
                  alt=""
                  src={img}
                  placeholderSrc={smallImg}
                  effect="blur"
                />
              </div>

              <div>
                <button
                  className="group btn-primary btn"
                  onClick={() => removePrize(id)}
                >
                  <AiFillDelete className=" text-2xl text-base-100 transition duration-200 group-hover:text-red-500" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex w-full justify-center">共{total}個獎項</div>
    </Item>
  )
}

export default SetPrize

import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { UserFormSchemaWithAddress } from '../models/User'
import type { UserFormWithAddress } from '../models/User'

export default function Form() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<UserFormWithAddress>({
    resolver: zodResolver(UserFormSchemaWithAddress),
  })

  const onSubmit: SubmitHandler<UserFormWithAddress> = (data) => {
    // console.log(data.name)
    // console.log(data)
  }

  // console.log(isValid)

  return (
    <>
      <button
        onClick={() => trigger()}
        className="mb-2 rounded bg-gray-300 p-2 text-xl"
      >
        Display Data Requirements
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-3xl flex-col gap-2"
      >
        <label htmlFor="name" className="text-xl text-white">
          Name:
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="rounded-md p-2 text-xl"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.name?.message}
          </p>
        )}

        <label htmlFor="username" className="text-xl text-white">
          Username:
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className="rounded-md p-2 text-xl"
          placeholder="johndoe90"
        />
        {errors.username && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.username?.message}
          </p>
        )}

        <label htmlFor="email" className="text-xl text-white">
          Email:
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="rounded-md p-2 text-xl"
          placeholder="johndoe90@hotmail.com"
        />
        {errors.email && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.email?.message}
          </p>
        )}

        <label htmlFor="street" className="text-xl text-white">
          Street:
        </label>
        <input
          id="street"
          type="text"
          {...register('address.street')}
          className="rounded-md p-2 text-xl"
          placeholder="555 Sycamore St."
        />
        {errors?.address?.street && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.address.street?.message}
          </p>
        )}

        <label htmlFor="suite" className="text-xl text-white">
          Suite/Apt:
        </label>
        <input
          id="suite"
          type="text"
          {...register('address.suite')}
          className="rounded-md p-2 text-xl"
          placeholder="212 B"
        />
        {errors?.address?.suite && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.address.suite?.message}
          </p>
        )}

        <label htmlFor="city" className="text-xl text-white">
          City:
        </label>
        <input
          id="city"
          type="text"
          {...register('address.city')}
          className="rounded-md p-2 text-xl"
          placeholder="Kansas City"
        />
        {errors?.address?.city && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.address.city?.message}
          </p>
        )}

        <label htmlFor="zipcode" className="text-xl text-white">
          Zip Code:
        </label>
        <input
          id="zipcode"
          type="text"
          {...register('address.zipcode')}
          className="rounded-md p-2 text-xl"
          placeholder="55555-1234"
        />
        {errors?.address?.zipcode && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.address.zipcode?.message}
          </p>
        )}

        <label htmlFor="phone" className="text-xl text-white">
          Phone:
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="rounded-md p-2 text-xl"
          placeholder="555-555-5555"
        />
        {errors.phone && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.phone?.message}
          </p>
        )}

        <label htmlFor="website" className="text-xl text-white">
          Website:
        </label>
        <input
          id="website"
          type="text"
          {...register('website')}
          className="rounded-md p-2 text-xl"
          placeholder="https://your-website.com"
        />
        {errors.website && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.website?.message}
          </p>
        )}

        <label htmlFor="company-name" className="text-xl text-white">
          Company Name:
        </label>
        <input
          id="company-name"
          type="text"
          {...register('company.name')}
          className="rounded-md p-2 text-xl"
          placeholder="Acme Co."
        />
        {errors?.company?.name && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.company.name?.message}
          </p>
        )}

        <label htmlFor="company-slogan" className="text-xl text-white">
          Company Slogan:
        </label>
        <input
          id="company-slogan"
          type="text"
          {...register('company.catchPhrase')}
          className="rounded-md p-2 text-xl"
          placeholder="Coyote's One Stop Shop"
        />
        {errors?.company?.catchPhrase && (
          <p className="self-start rounded-md bg-yellow-100 px-2 py-1 italic text-red-500">
            {errors.company.catchPhrase?.message}
          </p>
        )}

        <button
          type="submit"
          className="max-w-[10rem] rounded-md bg-gray-300 p-2 text-3xl"
        >
          Submit
        </button>
      </form>
    </>
  )
}

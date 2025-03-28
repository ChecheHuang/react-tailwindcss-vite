import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function prefix(prefix: string, className: string) {
  return className
    .split(' ')
    .filter((i) => i !== '')
    .map((i) => prefix + ':' + i)
    .join(' ')
}
export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const createArray = (length: number) => [...Array(length)]

export const wait = (number: number) =>
  new Promise((resolve) => setTimeout(resolve, number))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  ms = 300,
) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export const filterObjectValueByArg = <T extends AnyObject>(
  obj: T,
  ...arg: unknown[]
) => {
  const newObj = {} as T
  for (const key in obj) {
    const isObj = !!Object.prototype.hasOwnProperty.call(obj, key)
    if (!isObj) throw new Error('not an object')
    const isSkip = arg.reduce((acc, cur) => acc || obj[key] === cur, false)
    if (!isSkip) newObj[key] = obj[key]
  }
  return newObj
}

export function catchError<T>(
  promise: Promise<T>,
): Promise<[undefined, T] | [Error]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      return [error]
    })
}

export function catchErrorTyped<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      if (errorsToCatch == undefined) {
        return [error]
      }
      throw error
    })
}

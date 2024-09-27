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

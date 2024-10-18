import { expect, test } from 'vitest'

import { interpolation, combine } from './04-animated'

test('映射', () => {
  const f = interpolation([0, 1], [0, 100])
  expect(f(0.25)).toBe(25)
  expect(f(5)).toBe(100)
  expect(f(-1)).toBe(0)
})

test('組合', () => {
  const add3 = (x: number) => x + 3
  const addStr = (x: number) => x + '@str'
  const f = combine(add3, addStr)
  expect(f(10)).toBe('13@str')
})

import { expect, test } from 'vitest'

import { display, displayProducts, displayTotal, checkout, main } from './page'

test('display', () => {
  const testCase = {
    products: [
      {
        name: '乖乖(椰子口味)',
        size: 'K0132',
        price: 20,
      },
      {
        name: '乖乖(椰子口味)',
        size: 'K0132',
        price: 20,
      },
    ],
    total: 40,
  }

  const expected = `
- 乖乖(椰子口味)     $20.00
- 乖乖(椰子口味)     $20.00
Total: $40.00
    `.trim()

  expect(display([displayProducts, displayTotal])(testCase)).toBe(expected)
})

test('checkout', () => {
  const products = [
    {
      name: '乖乖(椰子口味)',
      size: 'K0132',
      price: 20,
    },
    {
      name: '乖乖(椰子口味)',
      size: 'K0132',
      price: 20,
    },
  ]

  const expected = {
    products: [
      {
        name: '乖乖(椰子口味)',
        size: 'K0132',
        price: 20,
      },
      {
        name: '乖乖(椰子口味)',
        size: 'K0132',
        price: 20,
      },
    ],
    total: 40,
  }

  expect(checkout(products)).toStrictEqual(expected)
})

test('main', () => {
  const products = [
    {
      name: '[芋茶園]特撰烏龍茶550ml(24入)',
      size: 'DRINK-123',
      price: 600,
      tags: ['熱銷飲品'],
    },
    {
      name: '[芋茶園]特撰烏龍茶550ml(24入)',
      size: 'DRINK-123',
      price: 600,
      tags: ['熱銷飲品'],
    },
    {
      name: '[芋茶園]特撰烏龍茶550ml(24入)',
      size: 'DRINK-123',
      price: 600,
      tags: ['熱銷飲品'],
    },
  ]

  const expected = `
- [芋茶園]特撰烏龍茶550ml(24入)     $600.00
- [芋茶園]特撰烏龍茶550ml(24入)     $600.00
- [芋茶園]特撰烏龍茶550ml(24入)     $600.00
- 符合折扣[任2箱結帳88折],折抵144元
Total: $1,656.00
    `.trim()

  expect(main(products)).toBe(expected)
})

import { Monoid } from './Algebraic'

interface Group<A> extends Monoid<A> {
  inverse: (a: A) => A
}

const addGroup: Group<number> = {
  concat: (x, y) => x + y,
  empty: 0,
  inverse: (x) => -x,
}

const walletBalance = addGroup.concat(
  addGroup.empty,
  addGroup.concat(80, addGroup.concat(20, addGroup.inverse(10)))
)
console.log(walletBalance)

type Encrypt = (plainText: string, key: number) => string
type Decrypt = (cipherText: string, key: number) => string

const alphabets = 'abcdefghijklmnopqrstuvwxyz'

const caesarGroup: Group<number> = {
  concat: (x, y) => (x + y) % alphabets.length,
  empty: 0,
  inverse: (a) => (alphabets.length - a) % alphabets.length,
}

const encrypt: Encrypt = (plainText, key) =>
  plainText
    .toLowerCase()
    .split('')
    .map((c) => {
      const index = alphabets.indexOf(c)
      if (index === -1) return c
      const newIndex = caesarGroup.concat(index, key)
      return alphabets[newIndex]
    })
    .join('')

const decrypt: Decrypt = (cipherText, key) =>
  encrypt(cipherText, caesarGroup.inverse(key))

console.log(encrypt('hello', 3))
console.log(decrypt('khoor', 3))

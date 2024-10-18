// https://hackmd.io/3LOcCnYARA2YWaPX6K8nBQ

interface Binary<A, B, C> {
  (a: A, b: B): C
}
interface Unary<A, B> {
  (a: A): B
}

function map<A, B>(fn: Unary<A, B>) {
  return function (list: A[]) {
    const result: B[] = []
    for (const item of list) {
      result.push(fn(item))
    }
    return result
  }
}

function flatten<T>(array: Array<T | T[]>): T[] {
  return array.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

function box<A>(x: A) {
  function pipe<B>(fn: Unary<A, B>) {
    return box(fn(x))
  }
  function unwrap() {
    return x
  }

  return { pipe, unwrap }
}

function prop<A, K extends keyof A>(key: K) {
  return function (obj: A) {
    return obj[key]
  }
}

function reduce<A, B>(fn: Binary<A, B, A>) {
  return function (initial: A) {
    return function (list: B[]) {
      for (const item of list) {
        initial = fn(initial, item)
      }
      return initial
    }
  }
}

function isNotNull<A>(x: A): x is NonNullable<A> {
  return x != null
}

function maybe<A>(x: A) {
  function pipe<B>(fn: Unary<NonNullable<A>, B>) {
    const y = isNotNull(x) ? fn(x) : (x as unknown as undefined)
    return maybe(y)
  }
  function unwrap() {
    return x
  }
  return { pipe, unwrap }
}
const applyTo =
  <A, B>(x: A) =>
  (fn: Unary<A, B>) =>
    fn(x)

const includes = (value: unknown) => (list: unknown[]) => list.includes(value)

function filter<T>(predicate: Unary<T, boolean>) {
  return function (list: T[]) {
    const result: T[] = []
    for (const item of list) {
      if (predicate(item)) {
        result.push(item)
      }
    }
    return result
  }
}

function splitEvery(count: number) {
  return function <T>(list: T[]) {
    const result = []
    let idx = 0
    while (idx < list.length) {
      result.push(list.slice(idx, idx + count))
      idx += count
    }
    return result
  }
}

function displayCurrency(value: number) {
  return new Intl.NumberFormat('us', {
    minimumFractionDigits: 2,
  }).format(value)
}

const length = (list: unknown[]) => list.length
const gte = (y: number) => (x: number) => x >= y

const sum = reduce((a: number, b: number) => a + b)
const join = (token: string) => (list: unknown[]) => list.join(token)

// ---------------------------------------------

interface Product {
  name: string
  sku: string
  price: number
  tags: string[]
}

interface Discount {
  rule: string
  products: Product[]
  amount: number
}

interface Bill {
  products: Product[]
  total: number
  discounts?: Discount[]
}

interface Display {
  (bill: Bill): string | string[]
}

interface Rule {
  name: string
  check: (products: Product[]) => Discount | undefined
}

interface CumulativeQuantityDiscountProps {
  name: string
  count: number
  rate: number
  applyTag: string
}

function displayProduct(product: Product) {
  return `- ${product.name}     $${displayCurrency(product.price)}`
}

function displayDiscount(discount: Discount) {
  return `- 符合折扣[${discount.rule}],折抵${discount.amount}元`
}

export const displayDiscounts = ({ discounts }: Bill) =>
  maybe(discounts).pipe(map(displayDiscount)).unwrap() || []

export const displayProducts = (bill: Bill) =>
  box(bill).pipe(prop('products')).pipe(map(displayProduct)).unwrap()

export const displayTotal = (bill: Bill) =>
  `Total: $${displayCurrency(bill.total)}`

function applyDiscountRule(bill: Bill, rule: Rule): Bill {
  //計算折扣
  const discount = rule.check(bill.products)
  //沒有折扣
  if (!discount) return bill
  //總價=原價-折扣
  const total = bill.total - discount.amount
  //回傳帳單
  const discounts = bill.discounts ? [...bill.discounts, discount] : [discount]

  return { ...bill, total, discounts }
}

function applyDiscountRules(rules: Rule[]) {
  return function (bill: Bill) {
    return reduce(applyDiscountRule)(bill)(rules)
  }
}

export const display = (fns: Display[]) => (bill: Bill) => {
  return box(
    flatten([
      map(applyTo(bill))(fns),
      //
    ]),
  )
    .pipe(join('\n'))
    .unwrap()
}

export function checkout(products: Product[]): Bill {
  const total = box(products)
    .pipe(map(prop('price')))
    .pipe(sum(0))
    .unwrap()

  return { products, total }
}

const matchTag = (tag: string) => (product: Product) =>
  box(product).pipe(prop('tags')).pipe(includes(tag)).unwrap()

function CumulativeQuantityDiscount({
  name,
  count,
  rate,
  applyTag,
}: CumulativeQuantityDiscountProps) {
  function check(products: Product[]): Discount | undefined {
    const match = matchTag(applyTag)
    //確認商品是否滿足要求

    //products
    const satisfied = box(products)
      .pipe(filter(match))
      .pipe(length)
      .pipe(gte(count))
      .unwrap()

    if (!satisfied) return

    //實際符合條件的商品
    const matched = box(products)
      .pipe(filter(match))
      .pipe(splitEvery(count))
      .pipe(filter((group) => group.length >= count))
      .pipe(flatten)
      .unwrap()

    //計算折扣金額
    const amount = box(matched)
      .pipe(map(prop('price')))
      .pipe(map((x) => x * rate))
      .pipe(sum(0))
      .unwrap()

    return { rule: name, products: matched, amount }
  }
  return { name, check }
}

export function main(products: Product[]) {
  return (
    box(products)
      //進行計算
      .pipe(checkout)

      // 顯示折扣
      .pipe(
        applyDiscountRules([
          //
          CumulativeQuantityDiscount({
            name: '任2箱結帳88折',
            count: 2,
            rate: 0.12,
            applyTag: '熱銷飲品',
          }),
        ]),
      )

      // 顯示結果
      .pipe(
        display([
          //商品
          displayProducts,
          //折扣
          displayDiscounts,
          //金額
          displayTotal,
          //
        ]),
      )
      .unwrap()
  )
}

const FP = () => {
  return <>npm run test</>
}

export default FP

const Page = () => {
  {
    /**
     * TODO :JQuery offset 遞迴方法實現
     */
    ;(function () {
      console.log('JQuery offset遞迴方法實現')
      //* 模擬jQuery的offset方法實現
      function getOffset(element: HTMLElement) {
        //* 初始化位置數據
        let offsetData = {
          top: 0,
          left: 0,
        }

        //* 遞迴計算元素的偏移量
        function calculateOffset(el: HTMLElement | null) {
          //* 如果元素不存在，則返回
          if (!el) return

          //* 累加當前元素的偏移量
          offsetData.top += el.offsetTop
          offsetData.left += el.offsetLeft

          //* 如果還有offsetParent，繼續遞迴計算
          if (el.offsetParent) {
            calculateOffset(el.offsetParent as HTMLElement)
          }
        }

        //* 開始計算偏移量
        calculateOffset(element)

        //* 返回最終計算結果
        return offsetData
      }

      //* 使用示例
      const demoElement = document.createElement('div')
      document.body.appendChild(demoElement)
      const position = getOffset(demoElement)
      console.log('Element offset:', position)
    })
  }

  {
    /**
     * TODO :JQuery offset getBoundingClientRect方法實現
     */
    ;(function () {
      console.log('JQuery offset getBoundingClientRect方法實現')
      //* 使用 getBoundingClientRect 實現 offset 功能
      function getOffset(element: HTMLElement) {
        //* 獲取元素的位置資訊
        const rect = element.getBoundingClientRect()

        //* 獲取當前滾動位置
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop

        //* 計算實際偏移量（相對於文檔）
        return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
        }
      }

      //* 使用示例
      const demoElement = document.createElement('div')
      document.body.appendChild(demoElement)
      const position = getOffset(demoElement)
      console.log('Element offset:', position)
    })
  }

  {
    /**
     * TODO :透過reduce 實現 runPromiseSequence
     */
    ;(function () {
      console.log('透過reduce 實現 runPromiseSequence')
      //* 定義一個範例 Promise 函數
      const createPromise = (val: number) => {
        return () =>
          new Promise((resolve) => {
            setTimeout(() => {
              console.log(val)
              resolve(val)
            }, 1000)
          })
      }

      //* 創建一系列 Promise 函數
      const promiseFns = [createPromise(1), createPromise(2), createPromise(3)]

      //* 使用 reduce 實現按順序執行 Promise
      const runPromiseSequence = (promiseFns: (() => Promise<any>)[]) => {
        return promiseFns.reduce(
          (promise, currentFn) => promise.then(() => currentFn()),
          Promise.resolve(),
        )
      }

      //* 執行示例
      runPromiseSequence(promiseFns).then(() => {
        console.log('All promises completed')
      })
    })
  }

  {
    /**
     * TODO :透過reduce 實現pipe
     */
    ;(function () {
      console.log('透過reduce 實現pipe')
      //* 定義一些範例函數
      const add5 = (x: number) => x + 5
      const multiply2 = (x: number) => x * 2
      const subtract3 = (x: number) => x - 3

      //* 實現pipe函數，使用reduce將多個函數組合成一個
      const pipe = (...fns: Function[]) => {
        return (initialValue: any) =>
          fns.reduce((result, fn) => fn(result), initialValue)
      }

      //* 使用pipe組合函數
      const calculateValue = pipe(add5, multiply2, subtract3)

      //* 測試結果 (例如: 10 -> 15 -> 30 -> 27)
      const result = calculateValue(10)
      console.log('Final result:', result)
    })
  }

  {
    /**
     * TODO :實現一個reduce
     */
    ;(function () {
      console.log('實現一個reduce')
      //* 擴展 Array 原型，添加自定義的 myReduce 方法
      Array.prototype.reduce = function <T, U>(
        callback: (acc: U, cur: T, idx: number, arr: T[]) => U,
        initialValue?: U,
      ) {
        //* 獲取陣列
        const array = this

        //* 檢查陣列是否為空且沒有初始值
        if (array.length === 0 && initialValue === undefined) {
          throw new TypeError('Reduce of empty array with no initial value')
        }

        //* 設定初始值和起始索引
        let accumulator = initialValue
        let startIndex = 0

        //* 如果沒有提供初始值，使用陣列第一個元素作為初始值
        if (initialValue === undefined) {
          accumulator = array[0] as unknown as U
          startIndex = 1
        }

        //* 遍歷陣列，執行 reduce 操作
        for (let i = startIndex; i < array.length; i++) {
          accumulator = callback(accumulator as U, array[i], i, array)
        }

        return accumulator
      }

      //* 測試示例
      const numbers = [1, 2, 3, 4, 5]
      const sum = numbers.reduce((acc, cur) => acc + cur, 0)
      console.log('Sum:', sum) // 預期輸出: 15

      const product = numbers.reduce((acc, cur) => acc * cur, 1)
      console.log('Product:', product) // 預期輸出: 120
    })()
  }

  {
    /**
     * TODO :實現compose
     */
    ;(function () {
      console.log('實現compose')
      //* 定義一些範例函數
      const addPrefix = (str: string) => `prefix_${str}`
      const addSuffix = (str: string) => `${str}_suffix`
      const toUpperCase = (str: string) => str.toUpperCase()

      //* 實現 compose 函數，從右到左組合多個函數
      const compose = (...fns: Function[]) => {
        return (initialValue: any) =>
          fns.reduceRight((result, fn) => fn(result), initialValue)
      }

      //* 使用 compose 組合函數
      const processString = compose(addPrefix, toUpperCase, addSuffix)

      //* 測試結果 (例如: "hello" -> "hello_suffix" -> "HELLO_SUFFIX" -> "prefix_HELLO_SUFFIX")
      const result = processString('hello')
      console.log('Composed result:', result)

      //* 也可以用於數字處理
      const add2 = (x: number) => x + 2
      const multiply3 = (x: number) => x * 3
      const square = (x: number) => x * x

      const mathOperations = compose(square, multiply3, add2)
      console.log('Math result:', mathOperations(4)) // (4 + 2) * 3 ^ 2
    })
  }

  {
    /**
     * TODO :lodash 實現compose
     */
    ;(function () {
      console.log('lodash 實現compose')
      //* 定義一些示例函數
      const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1)
      const addExclamation = (str: string) => str + '!'
      const repeatTwice = (str: string) => str + ' ' + str

      //* lodash風格的compose實現
      function compose(...funcs: Function[]) {
        //* 如果沒有函數，返回一個identity函數
        if (funcs.length === 0) {
          return (arg: any) => arg
        }

        //* 如果只有一個函數，直接返回該函數
        if (funcs.length === 1) {
          return funcs[0]
        }

        //* 從右到左組合多個函數
        return function (this: any) {
          //* 獲取傳入的參數
          let args = arguments
          //* 從最右邊的函數開始
          let index = funcs.length - 1
          //* 先執行最後一個函數
          let result = funcs[index].apply(this, args)

          //* 從右到左依次執行每個函數
          while (index--) {
            result = funcs[index].call(this, result)
          }

          return result
        }
      }

      //* 創建組合函數
      const enhance = compose(repeatTwice, addExclamation, capitalize)

      //* 測試組合函數
      const result = enhance('hello')
      console.log('Lodash compose result:', result) // 輸出: "Hello! Hello!"

      //* 測試帶有this上下文的情況
      const obj = {
        prefix: 'Mr.',
        format: function (str: string) {
          return this.prefix + ' ' + str
        },
      }

      const enhanceWithContext = compose(repeatTwice, obj.format.bind(obj))
      console.log('With context:', enhanceWithContext('Smith')) // 輸出: "Mr. Smith Mr. Smith"
    })
  }

  {
    /**
     * TODO :bind的進階實現
     */
    ;(function () {
      console.log('bind的進階實現')
      //* 擴展 Function 原型，實現自定義的 bind 方法
      Function.prototype.bind = function <T>(
        this: Function,
        context: T,
        ...args: any[]
      ) {
        //* 保存原函數的引用
        const originalFn = this
        //* 獲取bind調用時傳入的預設參數
        const bindArgs = args

        //* 創建一個空函數作為中介，用於原型鍊的處理
        function EmptyFn(this: any) {
          return originalFn.apply(this, arguments)
        }
        //* 將空函數的原型指向原函數的原型
        if (originalFn.prototype) {
          EmptyFn.prototype = originalFn.prototype
        }

        //* 創建最終返回的綁定函數
        function boundFn(this: any, ...fnArgs: any[]) {
          //* 合併bind時的參數和調用時的參數
          const allArgs = bindArgs.concat(fnArgs)

          //* 判斷是否是作為構造函數使用
          return originalFn.apply(
            this instanceof EmptyFn ? this : context,
            allArgs,
          )
        }

        //* 設置原型鍊，確保綁定函數的實例可以繼承原函數的原型方法
        if (originalFn.prototype) {
          boundFn.prototype = Object.create(originalFn.prototype)
        }

        //* 返回綁定後的新函數
        return boundFn
      }
    })
  }

  {
    /**
     * TODO :實現apply
     */
    ;(function () {
      console.log('實現apply')
      //* 擴展 Function 原型，實現自定義的 apply 方法
      Function.prototype.apply = function (context: any, args: any[] = []) {
        //* 如果傳入的上下文為 null 或 undefined，則使用全域對象
        context = context || window

        //* 創建一個唯一的屬性名，避免覆蓋已有屬性
        const fnKey = Symbol()

        //* 將當前函數保存到上下文對象中
        context[fnKey] = this

        //* 使用傳入的上下文調用函數，並傳入參數數組
        const result = context[fnKey](...args)

        //* 刪除臨時添加的函數屬性
        delete context[fnKey]

        //* 返回函數執行結果
        return result
      }

      //* 測試示例
      const person = {
        name: 'John',
        age: 30,
      }

      function greet(this: any, prefix: string, suffix: string) {
        return `${prefix} ${this.name}, you are ${this.age} years old ${suffix}`
      }

      //* 使用自定義的 apply 方法
      const result = greet.apply(person, ['Hello', '!'])
      console.log('Apply result:', result)

      //* 測試空上下文
      const globalResult = greet.apply(null, ['Hi', '...'])
      console.log('Global context result:', globalResult)
    })
  }

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

const Page = () => {
  /**
   * TODO :Javascript資料類型及其判斷
   */
  {
    ;(function () {
      console.log('Javascript資料類型及其判斷')
      //* 1. typeof 運算符
      //* 最基本的類型判斷，但對於複雜類型支援有限
      const num = 42
      const str = 'hello'
      const bool = true
      const undef = undefined
      const nul = null
      const obj = {}
      const arr: any[] = []
      const func = function () {}

      console.log(typeof num) // 'number'
      console.log(typeof str) // 'string'
      console.log(typeof bool) // 'boolean'
      console.log(typeof undef) // 'undefined'
      console.log(typeof nul) // 'object' (這是一個已知的問題)
      console.log(typeof obj) // 'object'
      console.log(typeof arr) // 'object' (無法區分陣列)
      console.log(typeof func) // 'function'

      //* 2. instanceof 運算符
      //* 用於檢查物件是否為特定類別的實例
      class CustomClass {}
      const custom = new CustomClass()
      const array = [1, 2, 3]
      const date = new Date()

      console.log(custom instanceof CustomClass) // true
      console.log(array instanceof Array) // true
      console.log(date instanceof Date) // true

      //* 3. constructor 和 Object.prototype.toString
      //* 更精確的類型判斷方式
      const types = [
        42,
        'string',
        true,
        [],
        {},
        new Date(),
        /regex/,
        function () {},
        null,
        undefined,
      ]

      types.forEach((item) => {
        //* 使用 constructor 判斷（對 null 和 undefined 無效）
        if (item && item.constructor) {
          console.log(`Constructor: ${item.constructor.name}`)
        }

        //* 使用 Object.prototype.toString
        console.log(`toString: ${Object.prototype.toString.call(item)}`)
      })
    })
  }

  /**
   * TODO :Javascript資料類型及其轉換
   */
  {
    ;(async function () {
      console.log('Javascript資料類型及其轉換')
      //* 1. 字串轉數字
      const strNum = '123'
      const num1 = Number(strNum)
      const num2 = parseInt(strNum, 10)
      const num3 = +strNum

      console.log(num1) // 123
      console.log(num2) // 123
      console.log(num3) // 123

      //* 2. 數字轉字串
      const num = 123
      const str1 = num.toString()
      const str2 = String(num)
      const str3 = num + ''

      console.log(str1) // '123'
      console.log(str2) // '123'
      console.log(str3) // '123'

      //* 3. 布林值轉字串
      const bool = true
      const boolStr1 = bool.toString()
      const boolStr2 = String(bool)

      console.log(boolStr1) // 'true'
      console.log(boolStr2) // 'true'

      //* 4. 字串轉布林值
      const strBool = 'true'
      const bool1 = strBool === 'true'
      const bool2 = Boolean(strBool)

      console.log(bool1) // true
      console.log(bool2) // true

      //* 5. 物件轉 JSON 字串
      const obj = { a: 1, b: 2 }
      const jsonStr = JSON.stringify(obj)

      console.log(jsonStr) // '{"a":1,"b":2}'

      //* 6. JSON 字串轉物件
      const jsonString = '{"a":1,"b":2}'
      const jsonObj = JSON.parse(jsonString)

      console.log(jsonObj) // { a: 1, b: 2 }

      //* 7. 檢查 NaN
      const notANumber = NaN
      console.log(isNaN(notANumber)) // true
      console.log(Number.isNaN(notANumber)) // true

      //* 8. 布林值轉數字
      const boolToNum1 = Number(true)
      const boolToNum2 = +false

      console.log(boolToNum1) // 1
      console.log(boolToNum2) // 0

      //* 9. 數字轉布林值
      const numToBool1 = Boolean(1)
      const numToBool2 = !!0

      console.log(numToBool1) // true
      console.log(numToBool2) // false
    })
  }

  /**
   * TODO :Javascript函數參數傳遞
   */
  {
    ;(async function () {
      console.log('Javascript函數參數傳遞')
      //* 1. 基本類型傳遞（值傳遞）
      function changeValue(val: number) {
        val = 100
      }
      let num = 50
      changeValue(num)
      console.log(num) // 50，原始值不變

      //* 2. 複合類型傳遞（引用傳遞）
      function changeObject(obj: { prop: number }) {
        obj.prop = 100
      }
      let myObj = { prop: 50 }
      changeObject(myObj)
      console.log(myObj.prop) // 100，原始物件被改變

      //* 3. 傳遞函數作為參數
      function executeFunction(fn: () => void) {
        fn()
      }
      function sayHello() {
        console.log('Hello!')
      }
      executeFunction(sayHello) // 'Hello!'

      //* 4. 傳遞帶有回呼函數的物件
      function processData(data: {
        value: number
        callback: (val: number) => void
      }) {
        data.callback(data.value)
      }
      processData({
        value: 42,
        callback: (val) => {
          console.log(`Callback with value: ${val}`) // 'Callback with value: 42'
        },
      })
    })()
  }

  /**
   * TODO :cannot read property of undefined 問題解決方案
   */
  {
    ;(async function () {
      console.log('cannot read property of undefined 問題解決方案')
      //* 1. 檢查變數是否為 undefined
      const obj: any = undefined
      try {
        console.log(obj.property)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message) // 'Error: Cannot read property 'property' of undefined'
        } else {
          console.error('Unknown error', error)
        }
      }

      //* 2. 使用可選鏈接操作符 (Optional Chaining)
      const safeAccess = obj?.property
      console.log(safeAccess) // undefined，不會拋出錯誤

      //* 3. 提供預設值
      const defaultValue = obj?.property || 'default value'
      console.log(defaultValue) // 'default value'

      //* 4. 檢查物件是否存在
      if (obj && obj.property) {
        console.log(obj.property)
      } else {
        console.log('Property does not exist') // 'Property does not exist'
      }
    })()
  }

  /**
   * TODO :type.js原始程式解讀
   */
  {
    ;(async function () {
      console.log('type.js原始程式解讀')
      //* type.js 原始程式解讀
      //* 這是一個簡單的 type.js 模擬範例，展示如何使用 JavaScript 來實現基本的類型檢查功能

      //* 定義一個 type 函數，用於檢查變數的類型
      function type(value: any) {
        //* 使用 Object.prototype.toString 來獲取變數的類型
        const typeString = Object.prototype.toString.call(value)
        //* 從類型字串中提取出具體的類型名稱
        const typeName = typeString.match(/\[object (\w+)\]/)?.[1] || 'unknown'
        return typeName.toLowerCase()
      }

      //* 測試 type 函數
      console.log(type(42)) // 'number'
      console.log(type('hello')) // 'string'
      console.log(type(true)) // 'boolean'
      console.log(type(undefined)) // 'undefined'
      console.log(type(null)) // 'null'
      console.log(type({})) // 'object'
      console.log(type([])) // 'array'
      console.log(type(() => {})) // 'function'
      console.log(type(new Date())) // 'date'
      console.log(type(/regex/)) // 'regexp'

      //* 自定義類別的類型檢查
      class CustomClass {}
      const customInstance = new CustomClass()
      console.log(type(customInstance)) // 'object'，因為自定義類別會被識別為一般物件
    })()
  }

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

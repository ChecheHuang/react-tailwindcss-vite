'use client'

const Page = () => {
  {
    /**
     * TODO :作用域
     */
    ;(function () {
      // 全域變數
      var globalVar = "I'm global"

      // 外部函數
      function outer() {
        // 外部作用域變數
        var outerVar = "I'm from outer"

        // 內部函數
        function inner() {
          // 內部作用域變數
          var innerVar = "I'm from inner"

          // 內部函數可以訪問所有外部作用域變數
          console.log(innerVar) // "I'm from inner"
          console.log(outerVar) // "I'm from outer"
          console.log(globalVar) // "I'm global"
        }

        // 外部函數只能訪問自己和全域作用域
        console.log(outerVar) // "I'm from outer"
        console.log(globalVar) // "I'm global"
        // console.log(innerVar)   // ReferenceError: innerVar is not defined

        inner()
      }

      outer()
    })
  }

  {
    /**
     * TODO :暫時性死區
     */
    ;(function () {
      //* 在TDZ(暫時性死區)中，let和const聲明的變數在區塊開始到實際宣告這段期間不能被存取
      //* 這個例子展示了TDZ的運作方式
      let x = 'outer scope'

      function demo() {
        //* 這裡開始就是 y 的TDZ
        console.log(x) //* 可以訪問外部的x
        //console.log(y) //* 這裡會報錯，因為y還在TDZ中

        let y = 'inner scope' //* y的TDZ結束
        console.log(y) //* 現在可以安全訪問y
      }

      function anotherDemo() {
        //* 這裡展示變數提升和TDZ的區別
        // console.log(foo) //* undefined (因為var會提升)
        // console.log(bar) //* 會拋出ReferenceError (因為let不會提升)

        var foo = 1
        let bar = 2
      }
    })
  }

  {
    /**
     * TODO :執行上下文
     * 預先編譯過程應注意三點
     * 變數宣告
     * 變數宣告提升,但值為undefined
     * 對所有非運算式的函數宣告進行提升
     */
    ;() => {
      //*寫個執行上下文的demo 並且加上註解 用 //*開頭
      //* 全局執行上下文
      //* 變量 globalNumber 被創建並賦值
      var globalNumber = 100

      //* 函數聲明，會在執行上下文創建時被提升
      function outerFunction() {
        //* 進入 outerFunction 執行上下文
        //* 創建局部變量
        var localNumber = 200

        //* 內部函數聲明
        function innerFunction() {
          //* 進入 innerFunction 執行上下文
          //* 可以訪問所有外部變量
          var result = globalNumber + localNumber
          console.log('Inside innerFunction:', result)
        }

        console.log('Inside outerFunction:', localNumber)
        //* 調用內部函數
        innerFunction()
      }

      //* 調用外部函數
      outerFunction()
    }
  }

  {
    /**
     * TODO :呼叫堆疊
     */
    ;(function () {
      //* 示範呼叫堆疊的執行順序
      function firstFunction() {
        console.log('1. 進入 firstFunction')
        secondFunction()
        console.log('5. 離開 firstFunction')
      }

      function secondFunction() {
        console.log('2. 進入 secondFunction')
        thirdFunction()
        console.log('4. 離開 secondFunction')
      }

      function thirdFunction() {
        console.log('3. 進入並離開 thirdFunction')
      }

      //* 呼叫堆疊從這裡開始
      firstFunction()

      //* 輸出順序將會是:
      //* 1. 進入 firstFunction
      //* 2. 進入 secondFunction
      //* 3. 進入並離開 thirdFunction
      //* 4. 離開 secondFunction
      //* 5. 離開 firstFunction
    })
  }

  {
    /**
     * TODO :閉包
     */
    ;(function () {
      console.log('閉包')
      //* 基本的計數器閉包
      function createCounter() {
        //* 在外部函數中宣告的變數
        let count = 0

        //* 返回一個內部函數，它可以訪問 count 變數
        return {
          increment: function () {
            count++
            console.log(count)
          },
          decrement: function () {
            count--
            console.log(count)
          },
          getCount: function () {
            return count
          },
        }
      }

      //* 創建一個計數器實例
      const counter = createCounter()

      //* 即使外部函數已經執行完畢，內部函數仍然可以訪問 count 變數
      counter.increment() // 輸出: 1
      counter.increment() // 輸出: 2
      counter.decrement() // 輸出: 1
      console.log(counter.getCount()) // 輸出: 1
    })
  }

  {
    /**
     * TODO :Javascript記憶體管理
     */
    ;(function () {
      console.log('Javascript記憶體管理')
      //* 展示記憶體分配和回收的基本概念
      //* 1. 分配記憶體
      let arr: any = new Array(1000).fill('data') // 分配大量記憶體

      //* 2. 使用記憶體
      function createObjects() {
        //* 創建一個大物件
        let largeObject = {
          data: new Array(10000).fill('more data'),
          date: new Date(),
        }

        //* 這個物件會在函數結束後被回收
        return function () {
          console.log(largeObject.date)
        }
      }

      //* 3. 記憶體洩漏示例
      let references = []
      function potentialLeak() {
        //* 持續將引用加入陣列會導致記憶體洩漏
        let obj = {
          data: new Array(1000).fill('leaked data'),
        }
        references.push(obj)
      }

      //* 4. 正確的記憶體管理
      function properCleanup() {
        references = [] // 清除引用，允許垃圾回收
        arr = null // 釋放大陣列的引用
      }

      //* 執行示例
      let closure = createObjects()
      for (let i = 0; i < 3; i++) {
        potentialLeak()
      }
      closure()
      properCleanup()
    })
  }

  {
    /**
     * TODO :閉包導致記憶體洩漏
     */
    ;(function () {
      console.log('閉包導致記憶體洩漏')
      //* 閉包記憶體洩漏示例
      function createLeakyCache() {
        //* 這個 Map 會持續增長，因為我們沒有清理機制
        const cache = new Map()

        return {
          addData: function (key: string) {
            //* 每次調用都會新增數據，但從不清理
            cache.set(key, new Array(10000).fill('massive data'))
          },
          getData: function (key: string) {
            return cache.get(key)
          },
        }
      }

      //* 創建緩存實例
      const leakyCache = createLeakyCache()

      //* 模擬記憶體洩漏
      for (let i = 0; i < 100; i++) {
        leakyCache.addData(`key-${i}`)
        //* 即使不再需要這些數據，cache 中的引用仍然存在
      }

      //* 正確的做法應該是設置清理機制
      //* 比如：限制 cache 大小或設置過期時間
    })
  }

  {
    /**
     * TODO :例題1
     */
    ;(function () {
      console.log('例題1')
      const foo = (function () {
        var v = 0
        return () => {
          return v++
        }
      })()

      for (let i = 0; i < 10; i++) {
        foo()
      }

      console.log(foo()) // 10
    })
  }
  {
    /**
     * TODO :例題2
     */
    ;(function () {
      console.log('例題2')
      const foo = () => {
        var arr = []
        var i: any

        for (i = 0; i < 10; i++) {
          arr[i] = function () {
            console.log(i)
          }
        }

        return arr[0]
      }

      foo()() // 10
    })
  }

  {
    /**
     * TODO :例題3
     */
    ;(function () {
      console.log('例題3')
      var fn: any = null
      const foo = () => {
        var a = 2
        function innerFoo() {
          console.log(a)
        }
        fn = innerFoo
      }

      const bar = () => {
        fn()
      }

      foo()
      bar()
    })
  }

  {
    /**
     * TODO :例題4
     */
    ;(function () {
      console.log('例題4')
      var fn: any = null
      const foo = () => {
        var a = 2
        function innerFoo() {
          // console.log(c)
          console.log(a)
        }
        fn = innerFoo
      }

      const bar = () => {
        var c = 100
        fn()
      }

      foo()
      bar()
    })
  }

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

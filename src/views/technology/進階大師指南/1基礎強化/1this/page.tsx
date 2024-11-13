const Page = () => {
  /**
   * ? 在函數本體中,非顯性或隱式地簡單呼叫函數時,在嚴格模式下,函數內的this會被綁定為undefined,在非嚴格模式下,則會被綁定為全局對象。
   * ? 一般使用new方法呼叫建構函數時,建構函數內的this會被綁定為新建立的物件。
   * ? 一般透過call、apply、bind方法呼叫函數時,函數內的this會被綁定到指定參數的物件上。
   * ? 一般透過上下文物件呼叫方法時,函數本體內的this會被綁定到該物件上。
   * ? 在箭頭函數中,this的指向是由外層(作用域)決定的。
   */

  {
    /**
     * TODO 全域環境中的this
     */
    ;(function () {
      const foo = {
        bar: 10,
        fn: function () {
          console.log(this)
          console.log(this?.bar)
        },
      }
      var fn1 = foo.fn
      fn1()
    })
  }

  {
    /**
     * TODO :上下文物件呼叫中的this
     */
    ;(function () {
      const o1 = {
        text: 'o1',
        fn: function () {
          return this?.text
        },
      }

      const o2 = {
        text: 'o2',
        fn: function () {
          return o1.fn()
        },
      }

      const o3 = {
        text: 'o3',
        fn: function () {
          var fn = o1.fn
          return fn()
        },
      }

      console.log(o1.fn()) // o1
      console.log(o2.fn()) // o1
      console.log(o3.fn()) // undefined
    })
  }

  {
    /**
     * TODO :透過bind、call、apply方法改變this指向
     */
    ;(function () {
      const targe = {}
      const fn: (arg1: string, arg2: string) => void = (arg1, arg2) => {}
      fn.call(targe, 'arg1', 'arg2')
      fn.apply(targe, ['arg1', 'arg2'])
      fn.bind(targe)('arg1', 'arg2')

      const foo = {
        name: 'lucus',
        logName: function () {
          console.log(this.name)
        },
      }

      const bar = {
        name: 'mike',
      }

      foo.logName.call(bar) // mike
    })
  }

  {
    /**
     * *new 運算符號呼叫建構函數時做了什麼
     * *1. 創建一個新的物件
     * *2. 呼叫建構函數,並將this綁定到新建立的物件上
     * *3.為新建立的物件設置__proto__屬性,將其指向建構函數的prototype屬性
     * *4. 如果建構函數有返回值,則返回該值,否則返回新建立的物件
     * TODO :建構函數和this
     */
    // ;(function () {
    //   function Foo() {
    //     this.user = 'lucus'
    //     const o = {}
    //     return o
    //   }

    //   const instance = new Foo()
    //   console.log(instance.user) // lucus

    //   function Foo1() {
    //     this.user = 'lucus'
    //     return 1
    //   }

    //   const instance1 = new Foo1()
    //   console.log(instance1.user) // lucus
    // })
  }

  {
    /**
     * TODO :箭頭函數中的this
     * *在箭頭函數中,this的指向是由外層(作用域)決定的
     */
    ;(function () {
      const foo = {
        fn: function () {
          setTimeout(() => {
            console.log(this)
          })
        },
      }
      foo.fn()
    })
  }

  {
    /**
     * TODO :this的優先順序
     * *new > bind、call、apply > 上下文物件呼叫 > 箭頭函數 > 全域環境
     */
  }

  {
    /**
     * TODO :實現一個bind函數
     */
    ;(function () {
      //* 如果Function.prototype.bind已存在就用原生的,否則使用自定義的
      Function.prototype.bind =
        Function.prototype.bind ||
        //* 接收要綁定的this上下文
        function (context) {
          //* 保存原始函式的引用
          var me = this
          //* 獲取除context外的參數
          var args = Array.prototype.slice.call(arguments, 1)
          //* 返回一個新函式
          return function () {
            //* 獲取調用時的參數
            var innerArgs = Array.prototype.slice.call(arguments)
            //* 合併所有參數
            var allArgs = args.concat(innerArgs)
            //* 使用apply調用原函式,並傳入綁定的this和所有參數
            return me.apply(context, allArgs)
          }
        }
    })()
  }

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

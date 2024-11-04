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
    ;(function () {})()
  }

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

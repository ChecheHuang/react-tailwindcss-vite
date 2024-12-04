const Page = () => {
  /**
   * TODO :實現new沒有那麼容易
   */
  {
    ;(async function () {
      console.log('實現new沒有那麼容易')
      //* 定義一個 Person 函數，並使用 this 關鍵字來設置 name 屬性
      function Person(this: { name: string }, name: string) {
        this.name = name
      }

      //* 定義一個 newFunc 函數，用來模擬 new 操作符的行為
      function newFunc(...args: any[]) {
        //* 取出構造函數
        const constructor = args.shift()
        //* 創建一個新對象，並將其原型設置為構造函數的原型
        const obj = Object.create(constructor.prototype)

        //* 將構造函數的 this 綁定到新對象，並傳入剩餘的參數
        const result = constructor.apply(obj, args)

        //* 如果構造函數返回一個對象，則返回該對象，否則返回新創建的對象
        return typeof result === 'object' && result !== null ? result : obj
      }

      //* 使用 newFunc 創建一個新的 Person 對象
      const person = newFunc(Person, 'Tom')

      //* 輸出新創建的 Person 對象
      console.log(person)
    })
  }

  /**
   * TODO :如何優雅地實現繼承
   */
  {
    ;(async function () {
      console.log('如何優雅地實現繼承')
      //* 定義一個 inherit 函數，用來實現繼承
      function inherit(Child: any, Parent: any) {
        //* 將 Child 的原型設置為 Parent 的原型
        Child.prototype = Object.create(Parent.prototype)
        //* 將 Child 的構造函數設置為 Child 自身
        Child.prototype.constructor = Child

        //* 將 Parent 設置為 Child 的超類
        Child.super = Parent

        //* 如果存在 Object.setPrototypeOf 方法，則使用它來設置 Child 的原型
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(Child, Parent)
          //* 否則，如果存在 Child.__proto__ 屬性，則使用它來設置 Child 的原型
        } else if (Child.__proto__) {
          Child.__proto__ = Parent
          //* 否則，將 Parent 的屬性複製到 Child 上
        } else {
          for (let key in Parent) {
            if (Parent.hasOwnProperty(key)) {
              Child[key] = Parent[key]
            }
          }
        }
      }
    })
  }

    /**
     * TODO :繼承Date
     */
    {
      ;(async function(){
        console.log("繼承Date")
        //* 定義一個 MyDate 類，繼承自內建的 Date 類
        class MyDate extends Date {
          //* 添加一個新方法，用來格式化日期
          format() {
            const year = this.getFullYear()
            const month = (this.getMonth() + 1).toString().padStart(2, '0')
            const day = this.getDate().toString().padStart(2, '0')
            return `${year}-${month}-${day}`
          }
        }

        //* 創建一個 MyDate 的實例
        const myDate = new MyDate()

        //* 輸出格式化後的日期
        console.log(myDate.format())
      })()
    }



  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

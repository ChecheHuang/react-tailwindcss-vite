/**
 * ! https://juejin.cn/post/7043758954496655397?from=search-suggest
 */
{
  type PromiseState = 'pending' | 'fulfilled' | 'rejected'

  class myPromise {
    // 用static創建靜態屬性，用來管理狀態
    static PENDING: PromiseState = 'pending'
    static FULFILLED: PromiseState = 'fulfilled'
    static REJECTED: PromiseState = 'rejected'

    PromiseState: PromiseState
    PromiseResult: any
    onFulfilledCallbacks: Function[]
    onRejectedCallbacks: Function[]

    // 構造函數：通過new命令生成對象實例時，自動調用類的構造函數
    constructor(
      func: (
        resolve: (value: any) => void,
        reject: (reason: any) => void,
      ) => void,
    ) {
      // 給類的構造方法constructor添加一個參數func
      this.PromiseState = myPromise.PENDING // 指定Promise對象的狀態屬性 PromiseState，初始值為pending
      this.PromiseResult = null // 指定Promise對象的結果 PromiseResult
      this.onFulfilledCallbacks = [] // 保存成功回調
      this.onRejectedCallbacks = [] // 保存失敗回調
      try {
        /**
         * func()傳入resolve和reject，
         * resolve()和reject()方法在外部調用，這裡需要用bind修正一下this指向
         * new 對象實例時，自動執行func()
         */
        func(this.resolve.bind(this), this.reject.bind(this))
      } catch (error) {
        // 生成實例時(執行resolve和reject)，如果報錯，就把錯誤信息傳入給reject()方法，並且直接執行reject()方法
        this.reject(error)
      }
    }

    resolve(result: any) {
      // result為成功態時接收的終值
      // 只能由pending狀態 => fulfilled狀態 (避免調用多次resolve reject)
      if (this.PromiseState === myPromise.PENDING) {
        this.PromiseState = myPromise.FULFILLED
        this.PromiseResult = result
        /**
         * 在執行resolve或者reject的時候，遍歷自身的callbacks數組，
         * 看看數組裡面有沒有then那邊 保留 過來的 待執行函數，
         * 然後逐個執行數組裡面的函數，執行的時候會傳入相應的參數
         */
        this.onFulfilledCallbacks.forEach((callback) => {
          callback(result)
        })
      }
    }

    reject(reason: any) {
      // reason為拒絕態時接收的終值
      // 只能由pending狀態 => rejected狀態 (避免調用多次resolve reject)
      if (this.PromiseState === myPromise.PENDING) {
        this.PromiseState = myPromise.REJECTED
        this.PromiseResult = reason
        this.onRejectedCallbacks.forEach((callback) => {
          callback(reason)
        })
      }
    }

    /**
     * [註冊fulfilled狀態/rejected狀態對應的回調函數]
     * @param {function} onFulfilled  fulfilled狀態時 執行的函數
     * @param {function} onRejected  rejected狀態時 執行的函數
     * @returns {function} newPromsie  返回一個新的promise對象
     */
    then(
      onFulfilled?: (value: any) => any,
      onRejected?: (reason: any) => any,
    ): myPromise {
      // 2.2.7規範 then 方法必須返回一個 promise 對象
      let promise2 = new myPromise((resolve, reject) => {
        if (this.PromiseState === myPromise.FULFILLED) {
          /**
           * 為什麼這裡要加定時器setTimeout？
           * 2.2.4規範 onFulfilled 和 onRejected 只有在執行環境堆棧僅包含平台代碼時才可被調用 注1
           * 這裡的平台代碼指的是引擎、環境以及 promise 的實施代碼。
           * 實踐中要確保 onFulfilled 和 onRejected 方法異步執行，且應該在 then 方法被調用的那一輪事件循環之後的新執行棧中執行。
           * 這個事件隊列可以採用“宏任務（macro-task）”機制，比如setTimeout 或者 setImmediate； 也可以採用“微任務（micro-task）”機制來實現， 比如 MutationObserver 或者process.nextTick。
           */
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                // 2.2.7.3規範 如果 onFulfilled 不是函數且 promise1 成功執行， promise2 必須成功執行並返回相同的值
                resolve(this.PromiseResult)
              } else {
                // 2.2.7.1規範 如果 onFulfilled 或者 onRejected 返回一個值 x ，則運行下面的 Promise 解決過程：[[Resolve]](promise2, x)，即運行resolvePromise()
                let x = onFulfilled(this.PromiseResult)
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (e) {
              // 2.2.7.2規範 如果 onFulfilled 或者 onRejected 拋出一個異常 e ，則 promise2 必須拒絕執行，並返回拒因 e
              reject(e) // 捕獲前面onFulfilled中拋出的異常
            }
          })
        } else if (this.PromiseState === myPromise.REJECTED) {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                // 2.2.7.4規範 如果 onRejected 不是函數且 promise1 拒絕執行， promise2 必須拒絕執行並返回相同的據因
                reject(this.PromiseResult)
              } else {
                let x = onRejected(this.PromiseResult)
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (e) {
              reject(e)
            }
          })
        } else if (this.PromiseState === myPromise.PENDING) {
          // pending 狀態保存的 onFulfilled() 和 onRejected() 回調也要符合 2.2.7.1，2.2.7.2，2.2.7.3 和 2.2.7.4 規範
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                if (typeof onFulfilled !== 'function') {
                  resolve(this.PromiseResult)
                } else {
                  let x = onFulfilled(this.PromiseResult)
                  resolvePromise(promise2, x, resolve, reject)
                }
              } catch (e) {
                reject(e)
              }
            })
          })
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                if (typeof onRejected !== 'function') {
                  reject(this.PromiseResult)
                } else {
                  let x = onRejected(this.PromiseResult)
                  resolvePromise(promise2, x, resolve, reject)
                }
              } catch (e) {
                reject(e)
              }
            })
          })
        }
      })

      return promise2
    }
  }

  /**
   * 對resolve()、reject() 進行改造增強 針對resolve()和reject()中不同值情況 進行處理
   * @param  {promise} promise2 promise1.then方法返回的新的promise對象
   * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
   * @param  {[type]} resolve   promise2的resolve方法
   * @param  {[type]} reject    promise2的reject方法
   */
  function resolvePromise(
    promise2: myPromise,
    x: any,
    resolve: (value: any) => void,
    reject: (reason: any) => void,
  ) {
    // 2.3.1規範 如果 promise 和 x 指向同一對象，以 TypeError 為據因拒絕執行 promise
    if (x === promise2) {
      throw new TypeError('Chaining cycle detected for promise')
    }

    if (x instanceof myPromise) {
      /**
       * 2.3.2 如果 x 為 Promise ，則使 promise2 接受 x 的狀態
       *       也就是繼續執行x，如果執行的時候拿到一個y，還要繼續解析y
       */
      x.then((y) => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (
      x !== null &&
      (typeof x === 'object' || typeof x === 'function')
    ) {
      // 2.3.3 如果 x 為對象或函數
      try {
        // 2.3.3.1 把 x.then 賦值給 then
        var then = x.then
      } catch (e) {
        // 2.3.3.2 如果取 x.then 的值時拋出錯誤 e ，則以 e 為據因拒絕 promise
        return reject(e)
      }

      /**
       * 2.3.3.3
       * 如果 then 是函數，將 x 作為函數的作用域 this 調用之。
       * 傳遞兩個回調函數作為參數，
       * 第一個參數叫做 `resolvePromise` ，第二個參數叫做 `rejectPromise`
       */
      if (typeof then === 'function') {
        // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被調用，或者被同一參數調用了多次，則優先採用首次調用並忽略剩下的調用
        let called = false // 避免多次調用
        try {
          then.call(
            x,
            // 2.3.3.3.1 如果 resolvePromise 以值 y 為參數被調用，則運行 [[Resolve]](promise, y)
            (y: any) => {
              if (called) return
              called = true
              resolvePromise(promise2, y, resolve, reject)
            },
            // 2.3.3.3.2 如果 rejectPromise 以據因 r 為參數被調用，則以據因 r 拒絕 promise
            (r: any) => {
              if (called) return
              called = true
              reject(r)
            },
          )
        } catch (e) {
          /**
           * 2.3.3.3.4 如果調用 then 方法拋出了異常 e
           * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已經被調用，則忽略之
           */
          if (called) return
          called = true

          // 2.3.3.3.4.2 否則以 e 為據因拒絕 promise
          reject(e)
        }
      } else {
        // 2.3.3.4 如果 then 不是函數，以 x 為參數執行 promise
        resolve(x)
      }
    } else {
      // 2.3.4 如果 x 不為對象或者函數，以 x 為參數執行 promise
      return resolve(x)
    }
  }
}

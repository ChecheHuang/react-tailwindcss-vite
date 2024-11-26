/**
 * Promise 是一個用於處理非同步操作的物件，代表一個尚未完成但預期將來會完成的操作。
 *
 * Promise 特性:
 * 1. 狀態 (State):
 *    - pending: 初始狀態，既不是成功也不是失敗
 *    - fulfilled: 操作成功完成
 *    - rejected: 操作失敗
 *    狀態一旦改變就不能再變，只能從 pending 變為 fulfilled 或 rejected
 *
 * 2. 不可逆性:
 *    - Promise 狀態的改變是單向的，不可逆轉
 *    - 一旦從 pending 轉變為 fulfilled 或 rejected，就不能再改變
 *
 * 3. 非同步性:
 *    - Promise 是非同步程式設計的一種解決方案
 *    - then() 方法回傳的是一個新的 Promise 實例
 *    - 支援鏈式呼叫，可以解決回呼地獄問題
 *
 * 4. 錯誤處理:
 *    - 使用 .catch() 方法捕捉錯誤
 *    - 在執行建構函式時可以捕捉同步錯誤
 *    - 在 then() 中可以捕捉非同步錯誤
 *
 * 5. 值穿透:
 *    - 當 then() 接收的不是函式時，會發生值穿透
 *    - 將值傳遞給鏈中的下一個 then()
 *
 * 6. 微任務佇列:
 *    - Promise 的回呼函式會被加入微任務佇列
 *    - 優先權高於巨集任務（setTimeout, setInterval 等）
 *
 * @example
 * ```typescript
 * new Promise((resolve, reject) => {
 *   // 非同步操作
 *   if (success) {
 *     resolve(value);
 *   } else {
 *     reject(error);
 *   }
 * })
 * .then(value => {
 *   // 處理成功狀態
 * })
 * .catch(error => {
 *   // 處理失敗狀態
 * });
 * ```
 */
const Page = () => {
  /**
   * TODO : https://juejin.cn/post/7043758954496655397?from=search-suggest
   */
  {
    type PromiseState = 'pending' | 'fulfilled' | 'rejected'

    class myPromise {
      // 使用 static 建立靜態屬性，用來管理狀態
      static PENDING: PromiseState = 'pending'
      static FULFILLED: PromiseState = 'fulfilled'
      static REJECTED: PromiseState = 'rejected'

      PromiseState: PromiseState
      PromiseResult: any
      onFulfilledCallbacks: Function[]
      onRejectedCallbacks: Function[]

      // 建構方法：透過 new 指令產生物件實例時，自動呼叫類別的建構方法
      constructor(
        func: (
          resolve: (value: any) => void,
          reject: (reason: any) => void,
        ) => void,
      ) {
        // 為類別的建構方法 constructor 加入一個參數 func
        this.PromiseState = myPromise.PENDING // 指定 Promise 物件的狀態屬性 PromiseState，初始值為 pending
        this.PromiseResult = null // 指定 Promise 物件的結果 PromiseResult
        this.onFulfilledCallbacks = [] // 儲存成功回呼函式
        this.onRejectedCallbacks = [] // 儲存失敗回呼函式
        try {
          /**
           * func() 傳入 resolve 和 reject，
           * resolve() 和 reject() 方法在外部呼叫，這裡需要用 bind 修正 this 指向
           * new 物件實例時，自動執行 func()
           */
          func(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
          // 產生實例時(執行 resolve 和 reject)，如果發生錯誤，就把錯誤訊息傳入給 reject() 方法，並且直接執行 reject() 方法
          this.reject(error)
        }
      }

      resolve(result: any) {
        // result 為成功狀態時接收的最終值
        // 只能由 pending 狀態 => fulfilled 狀態 (避免多次呼叫 resolve reject)
        if (this.PromiseState === myPromise.PENDING) {
          this.PromiseState = myPromise.FULFILLED
          this.PromiseResult = result
          /**
           * 在執行 resolve 或 reject 時，遍歷自身的 callbacks 陣列，
           * 檢查陣列中是否有 then 那邊保留下來的待執行函式，
           * 然後逐一執行陣列中的函式，執行時會傳入對應的參數
           */
          this.onFulfilledCallbacks.forEach((callback) => {
            callback(result)
          })
        }
      }

      reject(reason: any) {
        // reason 為拒絕狀態時接收的最終值
        // 只能由 pending 狀態 => rejected 狀態 (避免多次呼叫 resolve reject)
        if (this.PromiseState === myPromise.PENDING) {
          this.PromiseState = myPromise.REJECTED
          this.PromiseResult = reason
          this.onRejectedCallbacks.forEach((callback) => {
            callback(reason)
          })
        }
      }

      /**
       * [註冊 fulfilled 狀態/rejected 狀態對應的回呼函式]
       * @param {function} onFulfilled  fulfilled 狀態時執行的函式
       * @param {function} onRejected  rejected 狀態時執行的函式
       * @returns {function} newPromsie  回傳一個新的 promise 物件
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
             * 2.2.4規範 onFulfilled 和 onRejected 只有在執行環境堆疊僅包含平台程式碼時才可被調用 註1
             * 這裡的平台程式碼指的是引擎、環境以及 promise 的實作程式碼。
             * 實作中要確保 onFulfilled 和 onRejected 方法非同步執行，且應該在 then 方法被調用的那一輪事件循環之後的新執行堆疊中執行。
             * 這個事件佇列可以採用「巨集任務（macro-task）」機制，例如setTimeout 或者 setImmediate； 也可以採用「微任務（micro-task）」機制來實現， 例如 MutationObserver 或者process.nextTick。
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
                // 2.2.7.2規範 若 onFulfilled 或者 onRejected 拋出一個異常 e ，則 promise2 必須拒絕執行，並回傳拒因 e
                // 捕捉前面 onFulfilled 中拋出的例外
              }
            })
          } else if (this.PromiseState === myPromise.REJECTED) {
            setTimeout(() => {
              try {
                if (typeof onRejected !== 'function') {
                  // 2.2.7.4規範 如果 onRejected 不是函數且 promise1 拒絕執行， promise2 必須拒絕執行並返回相同的拒因
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
            // pending 狀態下保存的 onFulfilled() 和 onRejected() 回呼函式也要符合 2.2.7.1、2.2.7.2、2.2.7.3 和 2.2.7.4 規範
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
     * 對 resolve()、reject() 進行改造增強，針對 resolve() 和 reject() 中不同值的情況進行處理
     * @param  {promise} promise2 promise1.then 方法回傳的新 promise 物件
     * @param  {[type]} x         promise1 中 onFulfilled 或 onRejected 的回傳值
     * @param  {[type]} resolve   promise2 的 resolve 方法
     * @param  {[type]} reject    promise2 的 reject 方法
     */
    function resolvePromise(
      promise2: myPromise,
      x: any,
      resolve: (value: any) => void,
      reject: (reason: any) => void,
    ) {
      // 2.3.1規範 如果 promise 和 x 指向相同物件，則以 TypeError 作為理由拒絕執行 promise
      if (x === promise2) {
        throw new TypeError('檢測到 Promise 鏈循環')
      }

      if (x instanceof myPromise) {
        /**
         * 2.3.2 如果 x 為 Promise ，則使 promise2 接受 x 的狀態
         *       也就是繼續執行 x，如果執行時得到一個 y，還要繼續解析 y
         */
        x.then((y) => {
          resolvePromise(promise2, y, resolve, reject)
        }, reject)
      } else if (
        x !== null &&
        (typeof x === 'object' || typeof x === 'function')
      ) {
        // 2.3.3 如果 x 為物件或函式
        try {
          // 2.3.3.1 把 x.then 指派給 then
          var then = x.then
        } catch (e) {
          // 2.3.3.2 如果取得 x.then 的值時丟出錯誤 e，則以 e 為理由拒絕執行 promise
          return reject(e)
        }

        /**
         * 2.3.3.3
         * 如果 then 是函式，將 x 作為函式的作用域 this 呼叫它。
         * 傳遞兩個回呼函式作為參數，
         * 第一個參數叫做 `resolvePromise`，第二個參數叫做 `rejectPromise`
         */
        if (typeof then === 'function') {
          // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被呼叫，或者被同一參數呼叫了多次，則優先採用首次呼叫並忽略剩下的呼叫
          let called = false // 避免多次調用
          try {
            then.call(
              x,
              // 2.3.3.3.1 如果 resolvePromise 以值 y 為參數被呼叫，則執行 [[Resolve]](promise, y)
              (y: any) => {
                if (called) return
                called = true
                resolvePromise(promise2, y, resolve, reject)
              },
              // 2.3.3.3.2 如果 rejectPromise 以理由 r 為參數被呼叫，則以理由 r 拒絕執行 promise
              (r: any) => {
                if (called) return
                called = true
                reject(r)
              },
            )
          } catch (e) {
            /**
             * 2.3.3.3.4 如果呼叫 then 方法拋出了例外 e
             * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已經被呼叫，則忽略它
             */
            if (called) return
            called = true
            // 2.3.3.3.4.2 否則以 e 為理由拒絕 promise
            reject(e)
          }
        } else {
          // 2.3.3.4 如果 then 不是函式，以 x 為參數執行 promise
          resolve(x)
        }
      } else {
        // 2.3.4 如果 x 不為物件或者函式，以 x 為參數執行 promise
        return resolve(x)
      }
    }
  }
}

export default Page

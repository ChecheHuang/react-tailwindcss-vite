const Page = () => {
  /**
   * TODO :Callback Hell Example
   */
  {
    ;(async function () {
      function fetchData(callback: (data: string) => void) {
        setTimeout(() => {
          console.log('Data fetched')
          callback('data')
        }, 1000)
      }

      function processData(
        data: string,
        callback: (processedData: string) => void,
      ) {
        setTimeout(() => {
          console.log('Data processed')
          callback('processed data')
        }, 1000)
      }

      function saveData(data: string, callback: (savedData: string) => void) {
        setTimeout(() => {
          console.log('Data saved')
          callback('saved data')
        }, 1000)
      }

      fetchData((data) => {
        processData(data, (processedData) => {
          saveData(processedData, (savedData) => {
            console.log('All done')
          })
        })
      })
    })
  }
  /**
   * TODO :Promise Example
   */
  {
    ;(async function () {
      // * Promise Example
      function fetchDataPromise(): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Data fetched')
            resolve('data')
          }, 1000)
        })
      }

      function processDataPromise(data: string): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Data processed')
            resolve('processed data')
          }, 1000)
        })
      }

      function saveDataPromise(data: string): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Data saved')
            resolve('saved data')
          }, 1000)
        })
      }

      fetchDataPromise()
        .then((data) => processDataPromise(data))
        .then((processedData) => saveDataPromise(processedData))
        .then((savedData) => {
          console.log('All done')
        })
    })
  }
  /**
   * TODO :Async/Await Example
   */
  {
    ;(async function () {
      async function fetchDataAsync(): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Data fetched')
            resolve('data')
          }, 1000)
        })
      }

      async function processDataAsync(data: string): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Data processed')
            resolve('processed data')
          }, 1000)
        })
      }

      async function saveDataAsync(data: string): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Data saved')
            resolve('saved data')
          }, 1000)
        })
      }

      async function handleData() {
        const data = await fetchDataAsync()
        const processedData = await processDataAsync(data)
        const savedData = await saveDataAsync(processedData)
        console.log('All done')
      }

      handleData()
    })
  }

  /**
   * TODO :Generator Example
   */
  {
    ;(async function () {
      function* fetchDataGenerator(): Generator<
        Promise<string>,
        string,
        string
      > {
        const data = yield new Promise<string>((resolve) => {
          setTimeout(() => {
            console.log('Data fetched')
            resolve('data')
          }, 1000)
        })
        return data
      }

      function* processDataGenerator(
        data: string,
      ): Generator<Promise<string>, string, string> {
        const processedData = yield new Promise<string>((resolve) => {
          setTimeout(() => {
            console.log('Data processed')
            resolve('processed data')
          }, 1000)
        })
        return processedData
      }

      function* saveDataGenerator(
        data: string,
      ): Generator<Promise<string>, string, string> {
        const savedData = yield new Promise<string>((resolve) => {
          setTimeout(() => {
            console.log('Data saved')
            resolve('saved data')
          }, 1000)
        })
        return savedData
      }

      function runGenerator(
        generator: Generator<Promise<string>, void, string>,
      ) {
        const iterator = generator.next()
        if (iterator.done) return
        const promise = iterator.value as Promise<string>
        promise.then((data) => runGenerator(generator))
      }

      function* handleDataGenerator(): Generator<
        Promise<string>,
        void,
        string
      > {
        const data = yield* fetchDataGenerator()
        const processedData = yield* processDataGenerator(data)
        const savedData = yield* saveDataGenerator(processedData)
        console.log('All done')
      }

      runGenerator(handleDataGenerator())
    })
  }

  /**
   * TODO :setTimeout相關考驗
   */
  {
    ;(async function () {
      console.log('setTimeout相關考驗')
      //* setTimeout相關考驗示例
      console.log('1: 開始')

      setTimeout(() => {
        console.log('5: setTimeout 1')
      }, 0)

      setTimeout(() => {
        console.log('6: setTimeout 2')
      }, 100)

      new Promise((resolve) => {
        console.log('2: Promise 1')
        resolve('Promise 1 resolved')
      }).then((value) => {
        console.log('4:', value)
      })

      console.log('3: 結束')

      //* 輸出順序將會是:
      //* 1: 開始
      //* 2: Promise 1
      //* 3: 結束
      //* 4: Promise 1 resolved
      //* 5: setTimeout 1
      //* 6: setTimeout 2
    })()
  }

  /**
   * TODO :巨任務與微任務
   */
  {
    ;(function () {
      console.log('1:start here')

      new Promise<void>((resolve, reject) => {
        console.log('2:first promise constructor')
        resolve()
      })
        .then(() => {
          console.log('3:first promise then')
          return new Promise<void>((resolve, reject) => {
            console.log('4:second promise')
            resolve()
          }).then(() => {
            console.log('5:second promise then')
          })
        })
        .then(() => {
          console.log('6:another first promise then')
        })

      console.log('3:end here')
    })
    ;(function () {
      console.log('1: start here')
      const foo = () => {
        return new Promise((resolve, reject) => {
          console.log('2: first promise constructor')
          let promise1 = new Promise<void | string>((resolve, reject) => {
            console.log('3: second promise constructor')

            setTimeout(() => {
              console.log('7: setTimeout')
              resolve()
            })

            resolve('promise1')
          })

          resolve('promise0')

          promise1.then((arg) => {
            console.log('5:', arg)
          })
        })
      }

      foo().then((arg) => {
        console.log('6:', arg)
      })
      console.log('4: end here')
    })
    ;(function () {
      console.log('1: start here')

      setTimeout(() => {
        console.log('4: setTimeout')
      }, 0)

      new Promise((resolve, reject) => {
        resolve('promise result')
      }).then((value) => console.log('3', value))

      console.log('2: end here')
    })
  }

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

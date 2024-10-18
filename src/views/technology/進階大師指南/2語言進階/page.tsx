const Page = () => {
  //TODO:具任務與微任務
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

  return (
    <>
      <div>Page</div>
    </>
  )
}

export default Page

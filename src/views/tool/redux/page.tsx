import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/Header'
function Redux() {
  return (
    <div>
      <Header />
    </div>
  )
}

export default function ReduxProvider() {
  return (
    <Provider store={store}>
      <Redux />
    </Provider>
  )
}

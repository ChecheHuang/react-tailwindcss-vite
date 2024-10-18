import { Provider } from 'react-redux'

import Container from './components/Container'
import Header from './components/Header'
import store from './store'

function Redux() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Container />
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

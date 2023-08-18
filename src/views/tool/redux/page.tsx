import { Provider } from 'react-redux'
import store from './store'
import Header from './components/Header'
import Container from './components/Container'

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

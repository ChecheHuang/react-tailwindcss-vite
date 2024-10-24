import eruda from 'eruda'
import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/lib/plugin'
import '@/styles/global.scss'

import App from './App'

eruda.init()
eruda.show()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
)

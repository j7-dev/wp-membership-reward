import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { renderId1 } from '@/utils'

const id1 = document.getElementById(renderId1)

if (!!id1) {
  ReactDOM.createRoot(id1).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

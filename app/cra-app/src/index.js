import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Buffer } from 'buffer';
import "stream-browserify"
window.global = window
window.Buffer = Buffer
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

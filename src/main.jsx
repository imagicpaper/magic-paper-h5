import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/home'
import './reset.less'

ReactDOM.hydrateRoot(document.getElementById('root'), (
  <React.StrictMode>
    <Index />
  </React.StrictMode>
))

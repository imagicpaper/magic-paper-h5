import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/home'
import Result from './pages/result'
import './reset.less'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '/result',
    element: <Result/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <Index />
    </React.StrictMode>
  </RouterProvider>
)

import ReactDOM from 'react-dom/client'
import Index from './pages/home'
import Result from './pages/result'
import useRouter from './hooks/useRouter'
import './reset.less'

const routes = [
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '/result',
    element: <Result/>
  }
]

function App() {
  const path = useRouter(stat => stat.path)

  return (
    <>
      {routes.find(r => r.path === path).element}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

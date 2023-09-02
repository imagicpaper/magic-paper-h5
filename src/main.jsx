import Index from './pages/home'
import {ViteReactSSG} from 'vite-react-ssg'
import './reset.less'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Index />
//   </React.StrictMode>,
// )

export const createRoot = ViteReactSSG({
  routes: [{
    path: '/',
    Component: Index,
  }]
})
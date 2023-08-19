import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import AppHeader from './components/appHeader/AppHeader';
import ErrorPage from './pages/errorPage'
import { CharPage, ComicsPage} from './pages'

import './App.css';

const App = () => {
  const routes = createBrowserRouter([
    {
      path:'/',
      Component: AppHeader,
      errorElement:<ErrorPage/>,
      children:[
        {
          index:true,
          element:<CharPage/>
        },
        {
          path:'comics',
          element:<ComicsPage/>
        }
      ]
    }
  ])

    return (
      <RouterProvider router={routes}/>
    )
  }

export default App

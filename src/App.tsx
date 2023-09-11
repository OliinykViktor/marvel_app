import { FC } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppHeader from './components/appHeader/AppHeader';
import { CharPage, ComicsPage, InformPage, ErrorPage } from './pages'

import { CartProvider } from './context/CartContext';

import './App.css';

const App: FC = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      Component: AppHeader,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <CharPage />
        },
        {
          path: 'comics',
          element: <ComicsPage />
        },
        {
          path: 'comics/:id',
          element: <InformPage />
        },
        {
          path: 'character/:id',
          element: <InformPage />
        }
      ]
    }
  ])

  return (
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  )
}

export default App

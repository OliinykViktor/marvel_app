import React, { FC, lazy } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppHeader from './components/appHeader/AppHeader';

import { CartProvider } from './context/CartContext';

const CharPage = lazy(() => import('./pages/charPage'));
const ComicsPage = lazy(() => import('./pages/comicsPage'));
const InformPage = lazy(() => import('./pages/informPage/informPage'));
const ErrorPage = lazy(() => import('./pages/errorPage/errorPage'));

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

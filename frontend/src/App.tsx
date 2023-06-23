import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './layouts/Main';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Payment from './components/Payment/Payment';

import { ToastContainer } from 'react-toastify';
import CheckoutSuccess from './components/CheckoutSuccess';
import axios from 'axios';
import { UserContext } from './contexts/userContext';

function App() {
  const { user, setUser } = useContext(UserContext)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile',
          element: <Profile></Profile>
        },
        {
          path: '/payment',
          element: <Payment></Payment>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/checkout-success',
          element: <CheckoutSuccess></CheckoutSuccess>
        },
      ]
    }
  ])

  useEffect(() => {
    axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` }
    })
      .then(res => setUser(res.data))
      .catch(err => console.log("TOKEN FAILED"));
  }, [setUser])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

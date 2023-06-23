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
import axios from 'axios';
import { UserContext } from './contexts/userContext';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFail from './components/PaymentFail';

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
        // {
        //   path: '/',
        //   element: <Home />
        // },
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
          element: <PaymentSuccess></PaymentSuccess>
        },
        {
          path: '/checkout-fail',
          element: <PaymentFail></PaymentFail>
        },
        {
          path: '*',
          element: <Home />
        },
      ]
    }
  ])

  useEffect(() => {
    axios.get('https://crud-with-payment.vercel.app/api/users/me', {
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

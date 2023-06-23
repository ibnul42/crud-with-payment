import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
  return (
    <div className="my-4 max-w-7xl mx-auto min-h-screen bg-gray-50 p-10 rounded-lg">
        <h1 className='flex justify-center mt-20 text-2xl font-medium text-red-500'>Subscription Failed!!</h1>
        <Link to="/profile">
          <button type="button" className="flex w-32 mx-auto mt-10 justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 ease focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Go to profile
          </button>
        </Link>
      </div>
  )
}

export default PaymentFail
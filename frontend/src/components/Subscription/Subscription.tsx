import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Subscription = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    const handleFormSubmit = () => {
        if(user && user.subscription === true){
            toast.success("Already subscribed!")
        }
        else if (user && user.id && user.id.length > 0) {
            axios.post(`http://localhost:4000/api/stripe/create-checkout-session`, {
                id: user.id
            })
                .then((res) => {
                    if (res.data.url) {
                        window.location.href = res.data.url
                    }
                })
                .catch(error => console.log(error))
        } else {
            navigate('/login')
        }

        // Handle form submission logic here
        console.log('Subscribing to the $10 basic package');
    };
    return (

        <div className="bg-gray-800 max-w-md mx-auto text-white shadow-md rounded px-8 my-10 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Basic Package</h2>
            <p className="text-center text-gray-200 mb-4">$10/month</p>

            <button
                type="submit"
                onClick={handleFormSubmit}
                className="w-full bg-gray-200 ease hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Subscribe
            </button>
        </div>
    );
}

export default Subscription;
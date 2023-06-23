import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [editProfile, setEditProfile] = useState(false);

    const [inputValue, setInputValue] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        // password: user.p,
        gender: user.gender,
        birthDate: user.birthDate,
        token: user.token
    })

    const { name, id, email, gender, birthDate, token } = inputValue

    useEffect(() => {
        if (!user.id) {
            navigate('/login')
        }
    }, [user, navigate])

    const onChange = (e: any) => {
        const { name, value } = e.target
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const dateChangeEvent = (e: any) => {
        console.log(e.target.value)
        setInputValue((prev) => ({
            ...prev,
            birthDate: e.target.value,
        }))
    }

    const genderChangeEvent = (e: any) => {
        const { id } = e.target
        setInputValue((prev) => ({
            ...prev,
            gender: id,
        }))
    }

    const profileUpdateHandler = async (e: any) => {
        console.log(inputValue)
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` },
        }

        try {
            const res = await axios.put('/api/users/me/update', {
                id,
                email,
                name,
                gender,
                birthDate
            }, config)
            console.log(res)
            setUser(res.data)
            toast.success("User updated successfully")
            setEditProfile(false)
        } catch (error) {
            console.log(error)
            toast.error("Error updating profile")
        }
    }

    return (
        <section className="my-4 max-w-7xl mx-auto min-h-screen bg-gray-50 p-10 rounded-lg">
            <div className='text-2xl font-bold text-center underline'>Profile</div>
            <div className='flex flex-wrap gap-4 justify-between'>
                <div className='mt-4 text-xl'>
                    <div> <span className='font-bold'> Name:</span> {user.name}</div>
                    <div> <span className='font-bold'> Gender:</span> {user.gender}</div>
                    <div> <span className='font-bold'> Date of Birth:</span>{user.birthDate}</div>
                    <div> <span className='font-bold'> Subscription:</span> {user.subscription ? 'Activated' : 'Deactivated'}</div>
                </div>
                <div>
                    <button
                        onClick={() => setEditProfile(!editProfile)}
                        type="button"
                        className="inline-block bg-gray-200 ease hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500">
                        {editProfile ? <span>Close Edit</span> : <span>Edit Profile</span>}
                    </button>
                </div>
            </div>
            {/* Edit Form */}
            {
                editProfile && (
                    <>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={profileUpdateHandler}>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Full Name
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={name}
                                            onChange={onChange}
                                            autoComplete="Off"
                                            required
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900">
                                            Gender
                                        </label>
                                    </div>
                                    {/* Male */}
                                    <div className="flex gap-2">
                                        <input
                                            id="male"
                                            name="gender"
                                            type="radio"
                                            autoComplete="current-password"
                                            required
                                            className="block"
                                            defaultChecked={gender === "male" ? true : false}
                                            onChange={genderChangeEvent}
                                        />
                                        <label className='text-sm' htmlFor="female">Male</label>
                                    </div>
                                    {/* Female */}
                                    <div className="flex gap-2">
                                        <input
                                            id="female"
                                            name="gender"
                                            type="radio"
                                            autoComplete="current-password"
                                            required
                                            className="block"
                                            defaultChecked={gender === "female" ? true : false}
                                            onChange={genderChangeEvent}
                                        />
                                        <label className='text-sm' htmlFor="other">Female</label>
                                    </div>
                                    {/* Others */}
                                    <div className="flex gap-2">
                                        <input
                                            id="others"
                                            name="gender"
                                            type="radio"
                                            autoComplete="current-password"
                                            required
                                            className="block"
                                            defaultChecked={gender === "others" ? true : false}
                                            onChange={genderChangeEvent}
                                        />
                                        <label className='text-sm' htmlFor="others">Others</label>
                                    </div>
                                </div>
                                {/* Birth Date */}
                                <div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="birtdate" className="block text-sm font-medium leading-6 text-gray-900">
                                                Birthdate
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="dob"
                                                name="date"
                                                type="date"
                                                defaultValue={birthDate}
                                                onChange={dateChangeEvent}
                                                required
                                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        </section >
    );
};

export default Profile;
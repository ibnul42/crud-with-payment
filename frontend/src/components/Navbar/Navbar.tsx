import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex items-center justify-between min-h-[60px]">
                    <div className="flex items-center justify-center">
                        <Link to="/" className="text-white">
                            Logo
                        </Link>
                    </div>
                    <div className='relative'>
                        <div className="md:hidden flex justify-end">
                            <button
                                type="button"
                                className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                                onClick={toggleMenu}
                            >
                                <span className={!isOpen ? 'block' : 'hidden'}> <i className="fa-solid fa-bars"></i></span>
                                <span className={!isOpen ? 'hidden' : 'block'}> <i className="fa-solid fa-xmark"></i></span>
                            </button>
                        </div>
                        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
                            <div className="flex flex-col md:bg-transparent md:flex-row md:items-center md:space-x-4">
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/payment"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Payment
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Main = () => {
    const [user, setUser] = useState({ user:'me'})
    return (
        <div>
            <Navbar></Navbar>
            <Outlet context={[user, setUser]}/>
            <Footer></Footer>
        </div>
    );
};

export default Main;
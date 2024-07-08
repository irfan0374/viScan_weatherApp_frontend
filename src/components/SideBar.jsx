import React from 'react';
import { FaCloud, FaMapMarkerAlt, FaCog } from 'react-icons/fa';
import wishlist from '../assets/wishlist.png';
import wind from '../assets/icons/4.png';
import weather from '../assets/weather.png';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("usertoken")
        navigate('/')

        
    };

    return (
        <div className="h-screen w-16 flex flex-col items-center py-8 space-y-8 rounded-lg bg-gray-800">
            <div >
                <img className='w-12 h-12'  src={weather} alt="" />
            </div>
            
            <nav className="flex flex-col items-center space-y-6">
                <button className="text-gray-400 hover:text-white transition-colors">
                    <FaCloud className="text-2xl" />  
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <img className="w-6 h-6" src={wishlist} alt="" />
                </button>
            </nav>
            
            <div className="mt-auto">
                <button className="text-white hover:text-white transition-colors font-serif border p-1 rounded-lg" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

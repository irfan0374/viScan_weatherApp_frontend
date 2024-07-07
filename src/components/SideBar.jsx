import React from 'react';
import { FaCloud, FaMapMarkerAlt, FaCog } from 'react-icons/fa';
import wishlist from '../assets/wishlist.png'
import wind from '../assets/icons/4.png'

const Sidebar = () => {
  return (
    <div className="bg-slate-800 h-screen w-16 flex flex-col items-center py-8 space-y-8 rounded-lg">
      <div className="  bg-gray-400 rounded-lg">
      <img className='w-12 h-10'  src={wind} alt="" />
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
        <button className="text-gray-400 hover:text-white transition-colors">
          <FaCog className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
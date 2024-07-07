import React from 'react';
import cloud from '../assets/cloudIcons/1.png'
import wishlist from '../assets/wishlist.png'
import { Link } from 'react-router-dom';

function CurrentWeather() {
  return (
    <div className='flex  ml-14 mt-14'>

      <div className="p-6 rounded-lg w-[600px] h-60 flex justify-around">
        <div>

          <h2 className="text-3xl font-bold font-serif">Madrid</h2>
          <div className='pt-2'>Chance of rain: 0%</div>
          <div className="text-6xl font-semibold mt-14 font-serif">31°</div>
        </div>

        <div className=" ">
          <div className='ml-64'>
          <Link to="/">
                <img className="w-7 h-7 mr-7" src={wishlist} alt="Wishlist" />
            </Link>
          </div>
          <img className='w-64 h-64' src={cloud} alt="" />
        </div>

      </div>
    </div>
  );
}

export default CurrentWeather;

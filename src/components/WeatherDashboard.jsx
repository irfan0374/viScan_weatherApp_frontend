import React from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import TodaysForecast from './TodaysForecast';
import SevenDayForecast from './SevenDayForecast';
import Sidebar from './SideBar';


function WeatherDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <SearchBar />
      <div className='flex justify-between mt-6 '>

      <Sidebar/>
        <CurrentWeather />
        <TodaysForecast />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      </div>
      <SevenDayForecast />
    </div>
  );
}

export default WeatherDashboard;

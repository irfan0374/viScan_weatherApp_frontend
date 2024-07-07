import React from 'react';

function SevenDayForecast() {
  const weeklyForecast = [
    { day: 'Today', high: 36, low: 22, icon: '☀️', description: 'Sunny' },
    { day: 'Tue', high: 37, low: 21, icon: '☀️', description: 'Sunny' },
    { day: 'Wed', high: 37, low: 21, icon: '☀️', description: 'Sunny' },
    { day: 'Thu', high: 36, low: 22, icon: '🌥️', description: 'Cloudy' },
    { day: 'Fri', high: 36, low: 21, icon: '🌥️', description: 'Cloudy' },
    { day: 'Sat', high: 37, low: 21, icon: '🌧️', description: 'Rainy' },
    { day: 'Sun', high: 37, low: 21, icon: '⛈️', description: 'Storm' },
  ];

  return (
    <div className="mt-8 p-8 bg-gray-800 rounded-2xl shadow-xl text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">7-Day Historical Weather</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {weeklyForecast.map((item, index) => (
          <div key={index} className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-filter backdrop-blur-sm hover:bg-opacity-30 transition duration-300">
            <div className="font-bold text-xl mb-2">{item.day}</div>
            <div className="text-5xl mb-2">{item.icon}</div>
            <div className="text-lg mb-1">{item.description}</div>
            <div className="font-semibold">
              <span className="text-yellow-300">{item.high}°</span> / 
              <span className="text-blue-300">{item.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SevenDayForecast;
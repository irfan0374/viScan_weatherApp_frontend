import React from 'react';

function TodaysForecast() {
  const forecast = [
    { time: '6:00 AM', temp: 25, icon: '☁️' },
    { time: '9:00 AM', temp: 28, icon: '🌤️' },
    { time: '12:00 PM', temp: 33, icon: '☀️' },
    { time: '3:00 PM', temp: 34, icon: '☀️' },
    { time: '6:00 PM', temp: 32, icon: '☀️' },
    { time: '9:00 PM', temp: 30, icon: '🌤️' },
  ];

  return (
    <div className="p-6  bg-gray-800 rounded-xl shadow-lg text-white w-96">
      <h3 className="text-xl font-semibold mb-2 text-center">7-DAY FORECAST</h3>
      <div className="flex flex-col space-y-2">
        {forecast.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-lg font-semibold">{item.time}</div>
            <div className="text-3xl">{item.icon}</div>
            <div className="text-lg semibold">{item.temp}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaysForecast;
import React from 'react';
import cloud from '../assets/cloudIcons/cloud.png';
import drizzle from '../assets/cloudIcons/drizzle.png';
import snow from '../assets/cloudIcons/snow.png';
import rain from '../assets/cloudIcons/rain.png';
import clear from '../assets/cloudIcons/clear.png';

function SevenDayForecast({ data }) {
  const historicalData = data || [];

  console.log(data, "from the historical forecast");

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "01d":
      case "01n":
        return clear;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        return cloud;
      case "04d":
      case "04n":
      case "09d":
      case "09n":
        return drizzle;
      case "10d":
      case "10n":
        return rain;
      case "13d":
      case "13n":
        return snow;
      default:
        return clear;
    }
  };

  return (
    <div className="mt-8 p-8 bg-gray-800 rounded-2xl shadow-xl text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">7-Day Historical Weather</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {historicalData.map((item, index) => {
       

       const date = new Date(item.current.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long", // "short" for abbreviated day names
        day: "numeric",
        month: "long" // "short" for abbreviated month names
      });
          const icon = item.current.weather[0].icon;
          const description = item.current.weather[0].description;
          const tempMax = (item.current.temp.max - 273.15).toFixed(1);
          const tempMin = item.current.temp.min - 273.15; // Convert from Kelvin to Celsius
          const weatherIcon = getWeatherIcon(icon);

          return (
            <div key={index} className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-filter backdrop-blur-sm hover:bg-opacity-30 transition duration-300">
              <div className="font-bold text-xl mb-2">{date}</div>
              <div className="text-5xl mb-2">
                <img src={weatherIcon} alt={description} />
              </div>
              <div className="text-lg mb-1">{description}</div>
              <div className="font-semibold">
              <span className="text-yellow-300">{tempMax.toFixed(1)}°C</span> /
              <span className="text-blue-300">{tempMin.toFixed(1)}°C</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SevenDayForecast;

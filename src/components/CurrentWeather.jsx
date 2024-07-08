import React, { useState, useEffect } from 'react';
import cloud from '../assets/cloudIcons/cloud.png';
import drizzle from '../assets/cloudIcons/drizzle.png';
import snow from '../assets/cloudIcons/snow.png';
import rain from '../assets/cloudIcons/rain.png';
import clear from '../assets/cloudIcons/clear.png';
import wishlist from '../assets/wishlist.png';
import tempIcon from '../assets/icons/1.png';
import feelsLikeIcon from '../assets/icons/3.png';
import windIcon from '../assets/icons/4.png';
import humidityIcon from '../assets/humidity.png';
import { addWishList } from '../Api/weatherApi';
import { useToaster, Message } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function CurrentWeather({ data }) {
  console.log(data)
  const toaster = useToaster();
  const [icon, setIcon] = useState(cloud);

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
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

  useEffect(() => {
    if (data && data.currentWeather && data.currentWeather.weather && data.currentWeather.weather[0] && data.currentWeather.weather[0].icon) {
      const weatherIcon = getWeatherIcon(data.currentWeather.weather[0].icon);
      setIcon(weatherIcon);
    }
  }, [data]);

  async function addFav(data) {
    try {
      const res = await addWishList(data);
      if (res.status === 200) {
        toaster.push(<Message type="success">Add to Favorite</Message>, {
          placement: 'topEnd',
          duration: 3000,
        });
      }
    } catch (error) {
      toaster.push(<Message type="error">Something went wrong</Message>, {
        placement: 'topEnd',
        duration: 3000,
      });
    }
  }

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  // In case data is not availabe (default value)
  const defaultCity = "Enter the Location";
  const defaultTemp = "00";
  const defaultFeelsLike = "00";
  const defaultHumidity = "00";
  const defaultPressure = "00";
  const defaultWindSpeed = "00";

  return (
    <div className='mt-14'>
      <div className="p-6 rounded-lg w-[600px] flex flex-col">
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-bold font-serif">{data ? data.city : defaultCity}</h2>
          <img className="w-7 h-7" src={wishlist} alt="Wishlist" onClick={() => addFav(data)} />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-6xl font-semibold font-serif">{data ? kelvinToCelsius(data.currentWeather.temp) : defaultTemp}°</div>
          <img className='w-32 h-32' src={icon} alt="Weather Icon" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="flex items-center">
            <img className='w-10 h-10 mr-2' src={feelsLikeIcon} alt="Feels like" />
            <span>Feels Like: {data ? kelvinToCelsius(data.currentWeather.feels_like) : defaultFeelsLike}°</span>
          </div>
          <div className="flex items-center">
            <img className='w-10 h-10 mr-2' src={humidityIcon} alt="Humidity" />
            <span>Humidity: {data ? data.currentWeather.humidity : defaultHumidity}%</span>
          </div>
          <div className="flex items-center">
            <img className='w-10 h-10 mr-2' src={tempIcon} alt="Pressure" />
            <span>Pressure: {data ? data.currentWeather.pressure : defaultPressure} hPa</span>
          </div>
          <div className="flex items-center">
            <img className='w-10 h-10 mr-2' src={windIcon} alt="Wind" />
            <span>Wind Speed: {data ? data.currentWeather.wind_speed : defaultWindSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;

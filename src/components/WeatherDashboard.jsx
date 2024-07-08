import React, { useEffect, useState, useCallback } from 'react';
import useGoogleMapApi from './Googlemap';
import { Autocomplete } from '@react-google-maps/api';
import CurrentWeather from './CurrentWeather';
import TodaysForecast from './HistoricalForecast';
import SevenDayForecast from './SevenDayForecast';
import Sidebar from './SideBar';
import searchIcon from '../assets/search.png';
import { findForecast, findHistorical, findWeather } from '../Api/weatherApi';
import { useToaster, Message } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Loading from './Loading/loading';

function WeatherDashboard() {
  const toaster = useToaster();
  const { isLoaded } = useGoogleMapApi();

  const [location, setLocation] = useState('');
  const [currentValue, setCurrent] = useState();
  const [forecastValue, setForecast] = useState();
  const [historicalValue, setHistorical] = useState();
  const [loading,setLoading]=useState(false)

  const fetchCurrentWeather = useCallback(async (city) => {
    try {
      const response = await findWeather(city);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch current weather data');
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchForecast = useCallback(async (city) => {
    try {
      const response = await findForecast(city);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch forecast data');
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchHistoricalWeather = useCallback(async (city) => {
    try {
      const response = await findHistorical(city);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch historical weather data');
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const handleFetchWeather = useCallback(async (city) => {
    try {
      setLoading(true)
      const [currentWeather, forecast, historicalWeather] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
   
      ]);

      setCurrent(currentWeather);
      setForecast(forecast);
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      toaster.push(<Message type="error">{error.message}</Message>, {
        placement: 'topCenter',
        duration: 3000,
      });
    }
  }, [fetchCurrentWeather, fetchForecast]);

  const search = useCallback(() => {
    const element = document.getElementsByClassName('cityInput');
    const value = element[0].value;
    if (value === '') {
      return;
    }

    handleFetchWeather(value);
  }, [handleFetchWeather]);

  const handleAutoComplete = useCallback((id, setValue) => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementsByClassName(id),
        {
          componentRestrictions: { country: 'IN' },
          types: ['(cities)'],
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setValue(place.name);
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    handleAutoComplete('cityInput', setLocation);
  }, [isLoaded, handleAutoComplete]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
       <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 shadow-lg">
  <div className="flex flex-col items-center sm:flex-row sm:justify-center mb-6">
    {isLoaded && (
      <Autocomplete className="w-full sm:w-auto mb-4 sm:mb-0">
        <input
          type="text"
          className="cityInput w-full max-w-md px-4 py-2 text-black rounded-md bg-gray-800"
          placeholder="Any location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Autocomplete>
    )}
    <div className="search-icon cursor-pointer" onClick={search}>
      <img className="ml-0 sm:ml-4 w-9 h-9" src={searchIcon} alt="search" />
    </div>
  </div>

  <div className="flex flex-col lg:flex-row justify-between gap-6">
    <div className="w-full lg:w-1/4">
      <Sidebar />
    </div>
    <div className="w-full lg:w-1/2">
      <CurrentWeather data={currentValue} />
    </div>
    <div className="w-full lg:w-1/4">
      <TodaysForecast data={forecastValue} />
    </div>
  </div>

  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Your grid content here */}
  </div>
</div>
      )}
    </>
  );
}

export default WeatherDashboard;
import React, { useEffect, useState, useCallback } from 'react';
import useGoogleMapApi from './Googlemap';
import { Autocomplete } from '@react-google-maps/api';
import CurrentWeather from './CurrentWeather';
import TodaysForecast from './TodaysForecast';
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
        <div className="min-h-screen bg-gray-900 text-white p-6 shadow-lg">
          <div className="flex justify-center">
            {isLoaded && (
              <Autocomplete>
                <input
                  type="text"
                  className="cityInput w-full max-w-md px-4 py-2 text-black rounded-md bg-gray-800"
                  placeholder="Any location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Autocomplete>
            )}
            <div className="search-icon" onClick={search}>
              <img className="ml-4 w-9 h-9" src={searchIcon} alt="search" />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Sidebar />
            <CurrentWeather data={currentValue} />
            <TodaysForecast data={forecastValue} />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
         
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDashboard;
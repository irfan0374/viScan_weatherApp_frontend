import { userAxiosInstance } from './axiosInstance'

export const findWeather = async (value) => {
   
  
    const data = await userAxiosInstance.get('/weather/current', {
        params: { city: value }
    });
    return data
}

export const findForecast = async (value) => {
   
  
    const data = await userAxiosInstance.get('/weather/forecast', {
        params: { city: value }
    });
    return data
}

export const findHistorical = async (value) => {
    const data = await userAxiosInstance.get('/weather/historical', {
        params: { city: value }
    });
    return data
}
export const addWishList = async (value) => {
    const data = await userAxiosInstance.post('/weather/favorites', value);
    return data
}



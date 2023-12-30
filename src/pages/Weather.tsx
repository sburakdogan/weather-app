import React, { useEffect, useState } from 'react';
import './styles.scss';
import { List } from '../models/WeatherData';
import axios from 'axios';
import ForecastContainer from '../components/ForecastContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<List[][]>([]);
  const [city, setCity] = useState<string>('İstanbul');

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      axios
        .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then((res) => {
          const data = res.data;
          setCity(data.address.town !== '' ? data.address.town : data.address.province);
        })
        .catch((err) => {
          toast.error('Şehir/İlçe bulunamadı veya servise erişilemedi.', { autoClose: 1000, hideProgressBar: true });
          console.log(err);
        });
    })
  }, [])

  const fetchWeatherForecast = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},tr&lang=tr&units=metric&appid=0d8988827732c871251d4377bc4f6c64`)
      .then((response) => {
        const dataList = response.data.list;
        const chunkSize = 8;
        const list: List[][] = [];
        for (let i = 0; i < dataList.length; i += chunkSize) {
          list.push(dataList.slice(i, i + chunkSize));
        }
        setWeatherData(list);
      })
      .catch((err) => {
        toast.error('Şehir/İlçe bulunamadı veya servise erişilemedi.', { autoClose: 1000, hideProgressBar: true });
        console.log(err)
      });
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setCity(event.currentTarget.value);
      fetchWeatherForecast();
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='panel'>
        <input
          type='text'
          placeholder='Şehir veya ilçe giriniz...'
          onKeyDown={handleKeyPress}
          value={city} onChange={(e) => setCity(e.target.value)}
        />
        {weatherData && weatherData.map((data, index) => (
          <ForecastContainer list={data} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Weather;
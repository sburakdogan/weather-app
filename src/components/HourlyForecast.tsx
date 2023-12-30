import React from 'react';
import './styles.scss'
import { Main, Weather } from '../models/WeatherData';
import { formatTime } from '../helper/dateHelper';

interface Props {
    main?: Main | undefined
    weather?: Weather[] | undefined
    date: string
}

const HourlyForecast: React.FC<Props> = (props) => {
    return (
        <div className='hourly-forecast'>
            <img src={`https://openweathermap.org/img/w/${props.weather && props.weather[0].icon}.png`} alt='' width="40" />
            <span className='forecast-range'>{Math.floor(props.main?.temp_min ?? 0)}° / {Math.ceil(props.main?.temp_max ?? 0)}°</span>
            <span className='hour'>{formatTime(props.date)}</span>
        </div>
    )
}

export default HourlyForecast
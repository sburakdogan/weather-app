import React from 'react';
import AirIcon from '@mui/icons-material/Air';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import './styles.scss';
import { Main, Weather, Wind } from '../models/WeatherData';
import { formatDate } from '../helper/dateHelper';

interface Props {
    main?: Main | undefined
    weather?: Weather[] | undefined
    wind?: Wind | undefined
    cloud?: number | undefined
    date: string
}

const MainForecast: React.FC<Props> = (props) => {
    return (
        <>
            <img src={`https://openweathermap.org/img/w/${props.weather && props.weather[0].icon}.png`} width="200" alt='' />
            <div className='degree'>
                <span className='date'>{formatDate(props.date)}</span>
                <span className='description'>{props.weather && props.weather[0].description}</span>
                <span className='temp'>{Math.ceil(props.main?.temp ?? 0)}°C</span>
                <span className='temp-range'>{Math.floor(props.main?.temp_min ?? 0)} °C / {Math.ceil(props.main?.temp_max ?? 0)} °C</span>
            </div>
            <ul className='list'>
                <li className='item'>
                    <AirIcon className='icon' />
                    {props.wind?.speed}
                    <div className='text'>
                        km/h
                    </div>
                </li>
                <li className='item'>
                    <CloudOutlinedIcon className='icon' />
                    {props.cloud}
                    <div className='text'>
                        %
                    </div>
                </li>
                <li className='item'>
                    <WaterDropOutlinedIcon className='icon' />
                    {props.main?.humidity}
                    <div className='text'>
                        %
                    </div>
                </li>
            </ul>
        </>
    )
}

export default MainForecast
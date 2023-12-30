import React from 'react';
import HourlyForecast from '../components/HourlyForecast';
import CurrentForecast from '../components/CurrentForecast';
import { List } from '../models/WeatherData';

interface Props {
  list?: List[] | undefined
}

const ForecastContainer: React.FC<Props> = (props) => {
  return (
    <>
      <div className='top'>
        <CurrentForecast
          main={props.list && props.list[0].main}
          weather={props.list && props.list[0].weather}
          wind={props.list && props.list[0].wind}
          cloud={props.list && props.list[0].clouds.all}
          date={(props.list && props.list[0].dt_txt) ?? ''}
        />
      </div>

      <div className='middle'>
        {props.list && props.list.map((item, index) => (
          <HourlyForecast 
            main={item.main} 
            weather={item.weather}
            date={item.dt_txt}
            key={index} />
        ))}
      </div>
    </>
  )
}

export default ForecastContainer
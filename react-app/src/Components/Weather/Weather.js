import React from 'react';
import './Weather.css';

const Weather = (props) => {

  return (
    <div>
      <p>{props.weather[0].description}</p>
      <p>{"Temp:" + props.main.temp}</p>
      <img url={"http://openweathermap.org/img/wn/" + props.weather[0].icon + "@2x.png"}></img>
    </div>
  );


}

export default Weather;




// http://api.openweathermap.org/data/2.5/weather?units=Metric&lat=-36.8617074&lon=174.3050262&appid=aa9f26c33a1a8c68323a4907a0357fe6
import React from 'react';
import './Weather.css';
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  weatherData: state.weather.openWeatherData
})

const Weather = (props) => {

  return (
    props.weatherData.weather ?
      <div className="WeatherBox Weather">
        <img src={"http://openweathermap.org/img/wn/" + props.weatherData.weather[0].icon + "@2x.png"}></img>
        <p>{props.weatherData.main.temp}&#8451;</p>
      </div> : <div className="WeatherBox"></div>
  );


}

export default connect(mapStateToProps)(Weather);




// http://api.openweathermap.org/data/2.5/weather?units=Metric&lat=-36.8617074&lon=174.3050262&appid=aa9f26c33a1a8c68323a4907a0357fe6
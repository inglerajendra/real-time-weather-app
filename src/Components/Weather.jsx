import React, { useEffect, useState, useRef } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const responce = await fetch(url);
      const data = await responce.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="weather place-self-center p-10 rounded-[10px] bg-gradient-to-br from-[#e90c0c] to-[#4414e4] flex flex-col items-center">
      <div className="search-bar flex items-center gap-2">
        <input
          ref={inputRef}
          className="bg-white text-black h-10 border-none outline-none rounded-2xl  px-5  "
          type="text"
          placeholder="Search"
        />
        <img
          className="img rounded-xl p-2 hover:bg-gray-100 bg-white cursor-pointer "
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img
        className="weather-icon w-25 my-[30px] "
        src={weatherData.icon}
        alt=""
      />
      <p className="temp text-white text-2xl truncate ">
        {weatherData.temperature}°C
      </p>
      <p className="location text-white text-[40px]">{weatherData.location}</p>
      <div className=" weather-data w-full mt-[40px] text-white flex justify-between ">
        <div className="info flex flex-col items-start gap-[12px] text-[22px]">
          <img className="w-[26px] m-[10px]" src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span className=" block text-5">Humidity</span>
          </div>
        </div>
        <div className="info flex flex-col items-start gap-[12px] text-[22px]">
          <img className="w-[26px] m-[10px]" src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span className=" block text-5">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

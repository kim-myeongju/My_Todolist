import axios from "axios";
import "./Header.css";
import React, { useEffect } from "react";
import { useState } from "react";

const Header = () => {
    const [weather, setWeather] = useState("");

    const CITY = "Busan";
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=kr&appid=${API_KEY}`;

    const fetchWeather = async () => {
        try {
            const res = await axios.get(url);
            setWeather(res.data);
        } catch (err) {
            console.log("날씨 정보 불러오기 실패: ", err);
        }
    };

    useEffect(() => {
        fetchWeather();

        const interval = setInterval(() => {
            fetchWeather();
        }, 3600000);     // 10분: 600000, 1시간: 3600000, 3시간: 10800000

        // 컴포넌트가 사라지면 인터벌 제거
        return () => clearInterval(interval);
    }, [API_KEY]);

    return (
        <div className="Header">
            <h3>
                오늘은&nbsp;
                {weather ? (
                <span className="weather-info">
                    <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                    className="weather-icon"
                    />
                    <span>{weather.weather[0].description}</span>
                    <span>({Math.round(weather.main.temp)}°C)</span>
                </span>
                ) : (
                <span>날씨 불러오는 중...</span>
                )} !
            </h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

export default React.memo(Header);
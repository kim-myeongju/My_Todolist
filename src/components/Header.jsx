import axios from "axios";
import "./Header.css";
import React, { useEffect } from "react";
import { useState } from "react";

const Header = () => {
    const [weather, setWeather] = useState();
    

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Busan&units=metric&lang=kr&appid=${API_KEY}`);
                console.log("날씨 확인: ", res.data);
                setWeather(res.data);
            } catch (err) {
                console.log("날씨 정보 불러오기 실패: ", err);
            }
        };
        
        fetchWeather();
    }, []);

    /* Header component는 날짜를 표시하는 단순한 기능만 수행하고 있기 때문에 리렌더링 될 필요가 없음
    따라서 React.memo로 감싸서 React.memo의 인수로 전달된 컴포넌트를 메모이제이션 컴포넌트로 만듬
    즉, React.memo가 반환하는 컴포넌트는 부모 컴포넌트에서 전달된 Props가 변경되지 않는 한 리렌더되지 않음 */
    return (
        <div className="Header">
            <h3>
                오늘은
                {weather && (
                    <span className="weather-info">
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather" className="weather-icon" />
                        <span>{weather.weather[0].description}</span>
                        <span>({weather.main.temp}°C)</span>
                    </span>
                )} !
            </h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

export default React.memo(Header);
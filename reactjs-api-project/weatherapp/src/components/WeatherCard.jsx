import React from 'react'

const WeatherCard = ({ data }) => {
  // Hava durumu ikon URL'si
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <div className="weather-info">
        <img src={iconUrl} alt={data.weather[0].description} />
        <div className="weather-details">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <p className="description">{data.weather[0].description}</p>
        </div>
      </div>
      <div className="weather-stats">
        <div className="stat-item">
          <span>Hissedilen</span>
          <span>{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="stat-item">
          <span>Nem</span>
          <span>{data.main.humidity}%</span>
        </div>
        <div className="stat-item">
          <span>Yağış</span>
          <span>{data.rain ? `${data.rain['1h']}mm` : '0mm'}</span>
        </div>
        <div className="stat-item">
          <span>Rüzgar</span>
          <span>{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

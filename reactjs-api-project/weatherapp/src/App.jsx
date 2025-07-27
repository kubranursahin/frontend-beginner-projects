import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //null vermemizin sebebi başlangıçta veri yok, daha sonra veriler gelecek
  // API'den veri çekmek için bir fonksiyon

  const API_KEY = '5f526b21da1a67cb3bdbb668215e1349'

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Celsius için 'metric' kullanıyoruz
          lang: 'tr'

        }
      });
    setWeatherData(response.data);
  } catch (err) {
    setError(`Hava durumu verisi alınırken bir hata oluştu: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


return (
  <div className="container">
    <h1>Hava Durumu Uygulaması</h1>
    <SearchBar onSearch={fetchWeatherData} />
    {loading && <p>Yükleniyor...</p>}
    {error && <p className="error">{error}</p>}
    {weatherData && <WeatherCard data={weatherData} />}
  </div>
);

}
export default App;


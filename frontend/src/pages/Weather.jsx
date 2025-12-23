import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCloud, FiDroplet, FiWind, FiSun, FiMapPin, FiSearch, FiAlertTriangle, FiTrendingUp, FiLoader } from 'react-icons/fi';
import axios from 'axios';

const Weather = () => {
  const WEATHER_API_KEY = '5834f390e694980f79bc020baae31fea';
  const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
  const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    requestLocationAccess();
  }, []);

  const requestLocationAccess = () => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          setLocation(coords);
          fetchWeatherByCoords(coords);
        },
        (error) => {
          console.error('Location access denied:', error);
          searchLocation('Patna');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      searchLocation('Patna');
    }
  };

  const fetchWeatherByCoords = async (coords) => {
    try {
      setLoading(true);
      setError('');

      const weatherUrl = API_BASE_URL + '/weather?lat=' + coords.lat + '&lon=' + coords.lon + '&APPID=' + WEATHER_API_KEY + '&units=metric';
      const forecastUrl = API_BASE_URL + '/forecast?lat=' + coords.lat + '&lon=' + coords.lon + '&APPID=' + WEATHER_API_KEY + '&units=metric';

      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl)
      ]);

      processWeatherData(weatherResponse.data, forecastResponse.data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const searchLocation = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const geoUrl = GEO_API_URL + '/direct?q=' + encodeURIComponent(cityName) + '&limit=1&APPID=' + WEATHER_API_KEY;
      const geoResponse = await axios.get(geoUrl);

      if (geoResponse.data.length === 0) {
        setError('City not found. Please try another name.');
        setLoading(false);
        return;
      }

      const coords = {
        lat: geoResponse.data[0].lat,
        lon: geoResponse.data[0].lon
      };

      setLocation(coords);
      await fetchWeatherByCoords(coords);
    } catch (err) {
      console.error('Error searching location:', err);
      setError('Failed to search location. Please try again.');
      setLoading(false);
    }
  };

  const processWeatherData = (currentWeather, forecastData) => {
    const weatherInfo = {
      temp: Math.round(currentWeather.main.temp),
      feels_like: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      wind_speed: Math.round(currentWeather.wind.speed * 3.6),
      description: currentWeather.weather[0].description,
      icon: currentWeather.weather[0].icon,
      location: currentWeather.name + ', ' + currentWeather.sys.country,
      pressure: currentWeather.main.pressure,
      clouds: currentWeather.clouds.all,
      sunrise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const dailyForecasts = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyForecasts[dateKey]) {
        dailyForecasts[dateKey] = {
          date: date,
          temps: [],
          rainfall: 0,
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind.speed
        };
      }
      
      dailyForecasts[dateKey].temps.push(item.main.temp);
      if (item.rain && item.rain['3h']) {
        dailyForecasts[dateKey].rainfall += item.rain['3h'];
      }
    });

    const forecastArray = Object.values(dailyForecasts).slice(0, 7).map((day, index) => {
      const dayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : day.date.toLocaleDateString('en-US', { weekday: 'short' });
      
      return {
        date: dayName,
        fullDate: day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temp_max: Math.round(Math.max(...day.temps)),
        temp_min: Math.round(Math.min(...day.temps)),
        rainfall: Math.round(day.rainfall),
        icon: day.weather.icon,
        description: day.weather.description,
        humidity: day.humidity,
        wind: Math.round(day.wind * 3.6)
      };
    });

    setWeather(weatherInfo);
    setForecast(forecastArray);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  const getIrrigationAdvice = () => {
    if (!forecast.length) return null;

    const totalRainfall = forecast.slice(0, 3).reduce((sum, day) => sum + day.rainfall, 0);
    const avgHumidity = forecast.slice(0, 3).reduce((sum, day) => sum + day.humidity, 0) / 3;

    if (totalRainfall > 50) {
      return {
        type: 'success',
        icon: FiDroplet,
        title: 'Stop Irrigation',
        message: 'Expected rainfall of ' + totalRainfall + 'mm in next 3 days. Stop irrigation completely to conserve water.',
        savings: 'Potential water savings: ~' + Math.round(totalRainfall * 10) + ' liters/hectare',
        actions: [
          'Close all irrigation channels',
          'Ensure proper field drainage',
          'Monitor soil moisture levels'
        ]
      };
    } else if (totalRainfall > 25) {
      return {
        type: 'info',
        icon: FiDroplet,
        title: 'Reduce Irrigation',
        message: 'Moderate rainfall expected (' + totalRainfall + 'mm). Reduce irrigation by 50-60%.',
        savings: 'Reduce water usage by 50% for next 3 days',
        actions: [
          'Cut irrigation schedule in half',
          'Focus on crops with higher water needs',
          'Monitor weather updates daily'
        ]
      };
    } else if (avgHumidity > 80) {
      return {
        type: 'info',
        icon: FiCloud,
        title: 'Light Irrigation Only',
        message: 'High humidity (' + Math.round(avgHumidity) + '%) with minimal rain. Reduce irrigation frequency by 30%.',
        savings: 'Reduce irrigation frequency by 30%',
        actions: [
          'Irrigate early morning only',
          'Check soil moisture before irrigating',
          'Increase irrigation interval by 1-2 days'
        ]
      };
    } else {
      return {
        type: 'warning',
        icon: FiSun,
        title: 'Full Irrigation Required',
        message: 'Minimal rainfall expected (' + totalRainfall + 'mm). Continue regular irrigation schedule.',
        savings: 'Monitor soil moisture levels closely',
        actions: [
          'Maintain regular irrigation schedule',
          'Irrigate early morning or late evening',
          'Check soil moisture twice daily'
        ]
      };
    }
  };

  const getWeatherAlerts = () => {
    if (!forecast.length) return [];

    const alerts = [];

    const heavyRainDays = forecast.filter(day => day.rainfall > 50);
    if (heavyRainDays.length > 0) {
      alerts.push({
        type: 'danger',
        icon: FiAlertTriangle,
        title: 'Heavy Rainfall Alert',
        message: 'Heavy rain expected on ' + heavyRainDays.map(d => d.date).join(', ') + '. Prepare for waterlogging.',
        actions: [
          'Ensure proper field drainage',
          'Harvest mature crops before heavy rain',
          'Store equipment in covered areas',
          'Check for pest disease risk post-rain'
        ]
      });
    }

    const hotDays = forecast.filter(day => day.temp_max > 38);
    if (hotDays.length > 0) {
      alerts.push({
        type: 'warning',
        icon: FiSun,
        title: 'High Temperature Alert',
        message: 'Very high temperatures (>' + hotDays[0].temp_max + '°C) expected. Increase irrigation frequency.',
        actions: [
          'Irrigate early morning or late evening',
          'Monitor crops for heat stress',
          'Increase irrigation frequency by 20-30%',
          'Provide shade for sensitive crops'
        ]
      });
    }

    const dryDays = forecast.filter(day => day.rainfall === 0).length;
    if (dryDays >= 5) {
      alerts.push({
        type: 'info',
        icon: FiTrendingUp,
        title: 'Dry Spell Expected',
        message: 'No rainfall expected for ' + dryDays + ' days. Plan irrigation accordingly.',
        actions: [
          'Schedule regular irrigation',
          'Check soil moisture daily',
          'Apply mulch to retain moisture',
          'Consider drip irrigation for efficiency'
        ]
      });
    }

    return alerts;
  };

  const getWeatherIcon = (iconCode) => {
    return (
      <img 
        src={'https://openweathermap.org/img/wn/' + iconCode + '@2x.png'}
        alt="Weather icon"
        className="w-16 h-16"
      />
    );
  };

  const getFarmingTips = () => {
    if (!weather || !forecast.length) return [];

    const tips = [];
    const avgTemp = forecast.slice(0, 3).reduce((sum, day) => sum + day.temp_max, 0) / 3;
    const totalRain = forecast.slice(0, 3).reduce((sum, day) => sum + day.rainfall, 0);

    if (totalRain > 50) {
      tips.push({
        icon: FiDroplet,
        title: 'Rainy Season Preparation',
        tip: 'Heavy rainfall expected. Consider postponing fertilizer application and ensure adequate drainage to prevent nutrient leaching.'
      });
    }

    if (avgTemp > 35) {
      tips.push({
        icon: FiSun,
        title: 'Heat Stress Management',
        tip: 'High temperatures ahead. Apply mulch, increase irrigation, and monitor for pest activity which increases in hot weather.'
      });
    }

    if (weather.humidity < 40) {
      tips.push({
        icon: FiWind,
        title: 'Low Humidity Care',
        tip: 'Dry conditions detected. Increase irrigation frequency and consider misting for sensitive crops to prevent moisture stress.'
      });
    }

    if (weather.wind_speed > 25) {
      tips.push({
        icon: FiWind,
        title: 'Windy Conditions',
        tip: 'Strong winds forecasted. Secure loose structures, provide support for tall crops, and delay pesticide spraying.'
      });
    }

    if (tips.length === 0) {
      tips.push({
        icon: FiCloud,
        title: 'Optimal Conditions',
        tip: 'Weather conditions are favorable. Good time for planting, transplanting, and routine farm maintenance activities.'
      });
    }

    return tips;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" size={48} />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading weather data...</p>
        </div>
      </div>
    );
  }

  const irrigationAdvice = getIrrigationAdvice();
  const weatherAlerts = getWeatherAlerts();
  const farmingTips = getFarmingTips();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
            <FiCloud className="mr-3 text-green-600 dark:text-green-400" />
            Weather & Irrigation Advisory
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Real-time weather data and smart irrigation recommendations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
        >
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city (e.g., Mumbai, Delhi, Bangalore)..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {loading ? <FiLoader className="animate-spin" size={20} /> : 'Search'}
            </button>
            <button 
              type="button"
              onClick={requestLocationAccess}
              disabled={loading}
              className="px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors"
              title="Use my location"
            >
              <FiMapPin size={20} />
            </button>
          </form>
          {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}
        </motion.div>

        {weather && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 rounded-lg shadow-lg p-6 text-white mb-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FiMapPin size={20} />
                    <h2 className="text-2xl font-bold">{weather.location}</h2>
                  </div>
                  <p className="text-blue-100 dark:text-blue-200 mb-4 capitalize">{weather.description}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-6xl font-bold">{weather.temp}°</span>
                    <span className="text-2xl">C</span>
                  </div>
                  <p className="text-blue-100 dark:text-blue-200 mt-2">Feels like {weather.feels_like}°C</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-200 dark:text-blue-300">Sunrise</p>
                      <p className="font-semibold">{weather.sunrise}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 dark:text-blue-300">Sunset</p>
                      <p className="font-semibold">{weather.sunset}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {getWeatherIcon(weather.icon)}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <FiDroplet />
                      <span>{weather.humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <FiWind />
                      <span>{weather.wind_speed} km/h Wind</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <FiCloud />
                      <span>{weather.clouds}% Clouds</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <span>💨</span>
                      <span>{weather.pressure} hPa</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {irrigationAdvice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={'rounded-lg shadow-lg p-6 mb-6 border-l-4 ' + (
                  irrigationAdvice.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400' :
                  irrigationAdvice.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-400' :
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                )}
              >
                <div className="flex items-start space-x-4">
                  <irrigationAdvice.icon className={'text-3xl ' + (
                    irrigationAdvice.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    irrigationAdvice.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  )} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{irrigationAdvice.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{irrigationAdvice.message}</p>
                    <div className={'px-4 py-2 rounded-lg mb-3 ' + (
                      irrigationAdvice.type === 'success' ? 'bg-green-100 dark:bg-green-800/30' :
                      irrigationAdvice.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-800/30' :
                      'bg-blue-100 dark:bg-blue-800/30'
                    )}>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{irrigationAdvice.savings}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Recommended Actions:</p>
                      {irrigationAdvice.actions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {weatherAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 space-y-4"
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FiAlertTriangle className="mr-2 text-orange-600 dark:text-orange-400" />
                  Weather Alerts
                </h3>
                {weatherAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={'rounded-lg shadow-lg p-6 border-l-4 ' + (
                      alert.type === 'danger' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' :
                      alert.type === 'warning' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-400' :
                      'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <alert.icon className={'text-2xl ' + (
                        alert.type === 'danger' ? 'text-red-600 dark:text-red-400' :
                        alert.type === 'warning' ? 'text-orange-600 dark:text-orange-400' :
                        'text-blue-600 dark:text-blue-400'
                      )} />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{alert.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{alert.message}</p>
                        <div className="space-y-1">
                          {alert.actions.map((action, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {forecast.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className={'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center ' + (index === 0 ? 'ring-2 ring-green-500 dark:ring-green-400 bg-green-50 dark:bg-green-900/20' : '')}
                  >
                    <p className="font-bold text-gray-800 dark:text-white mb-1">{day.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{day.fullDate}</p>
                    {getWeatherIcon(day.icon)}
                    <p className="text-xs text-gray-600 dark:text-gray-300 capitalize mb-2">{day.description}</p>
                    <div className="flex justify-center items-baseline space-x-1 mb-2">
                      <span className="text-2xl font-bold text-gray-800 dark:text-white">{day.temp_max}°</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">/ {day.temp_min}°</span>
                    </div>
                    {day.rainfall > 0 && (
                      <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-400 text-xs mb-1">
                        <FiDroplet size={12} />
                        <span>{day.rainfall}mm</span>
                      </div>
                    )}
                    <div className="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400 text-xs">
                      <FiWind size={12} />
                      <span>{day.wind} km/h</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <FiTrendingUp className="mr-2 text-green-600 dark:text-green-400" />
                Farming Tips Based on Current Weather
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {farmingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <tip.icon className="text-2xl text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;

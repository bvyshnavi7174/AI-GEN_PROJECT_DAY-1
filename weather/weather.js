const apiKey = 'e52f8ed9aac32f658504c197a363981d'; // Your OpenWeather API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

async function fetchWeatherData(city) {
    const url = `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('Current Weather Data:', data); // Debugging line
    return data;
}

async function fetchForecastData(city) {
    const url = `${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('Forecast Data:', data); // Debugging line
    return data;
}

function updateWeatherUI(weatherData) {
    document.getElementById('city-name').textContent = weatherData.name;
    document.getElementById('date-time').textContent = new Date().toLocaleString();
    document.getElementById('weather-description').textContent = weatherData.weather[0].description;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
}

function updateForecastUI(forecastData) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const forecastList = forecastData.list;

    const findClosestForecast = (targetDate) => {
        return forecastList.reduce((closest, item) => {
            const itemDate = new Date(item.dt * 1000);
            const timeDiff = Math.abs(itemDate - targetDate);
            if (timeDiff < closest.timeDiff) {
                return { forecast: item, timeDiff };
            }
            return closest;
        }, { forecast: null, timeDiff: Infinity }).forecast;
    };

    const nextDayWeather = findClosestForecast(tomorrow);

    // Update next day weather
    if (nextDayWeather) {
        document.getElementById('next-date').textContent = tomorrow.toLocaleDateString();
        document.getElementById('next-weather-description').textContent = nextDayWeather.weather[0].description;
        document.getElementById('next-weather-icon').src = `http://openweathermap.org/img/wn/${nextDayWeather.weather[0].icon}.png`;
        document.getElementById('next-temperature').textContent = `${nextDayWeather.main.temp}°C`;
    } else {
        document.getElementById('next-date').textContent = tomorrow.toLocaleDateString();
        document.getElementById('next-weather-description').textContent = "No data";
        document.getElementById('next-weather-icon').src = '';
        document.getElementById('next-temperature').textContent = "";
    }
}

async function init() {
    const city = 'London'; // Change this to the desired city
    const weatherData = await fetchWeatherData(city);
    const forecastData = await fetchForecastData(city);
    updateWeatherUI(weatherData);
    updateForecastUI(forecastData);
}

init();

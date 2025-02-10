const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weatherIcon');
const famousCitiesElement = document.getElementById('famousCities');
const userWeatherElement = document.getElementById('userWeather');  

const apiKey = '9622ab4edca10481484edb2b6a87ce80'; 

const famousCities = ['Delhi', 'Hyderabad', 'Mumbai'];

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city, 'userWeather');
});

async function getWeather(city, target) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        if (target === 'userWeather') {
            userWeatherElement.classList.add('active');

            cityElement.textContent = data.name + ', ' + data.sys.country;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            weatherIconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            weatherIconElement.alt = data.weather[0].description;
        } else {
            const cityWeatherDiv = document.createElement('div');
            cityWeatherDiv.classList.add('city-weather');
            cityWeatherDiv.innerHTML = `
                <h3>${data.name}</h3>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>${data.weather[0].description}</p>
            `;
            famousCitiesElement.appendChild(cityWeatherDiv);
        }

    } catch (error) {
        if (target === 'userWeather') {
            cityElement.textContent = 'City not found';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            humidityElement.textContent = '';
            weatherIconElement.src = 'default-weather-icon.png';
            userWeatherElement.classList.remove('active');
            alert(error);
        } else {
            console.error(`Error fetching weather for ${city}:`, error);
        }
    }
}

function loadFamousCities() {
    famousCitiesElement.innerHTML = '';
    famousCities.forEach(city => {
        getWeather(city, 'famousCities');
    });
}

window.addEventListener('load', loadFamousCities);

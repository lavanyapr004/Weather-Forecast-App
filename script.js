const apiKey = 'dde850110011f4e6153cc4b8af87757b';  // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    getWeather(city);
});

function getWeather(city) {
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching weather data');
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        document.getElementById('weatherResult').innerHTML = 'City not found. Please try again.';
        return;
    }

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].main;

    document.getElementById('weatherResult').innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${condition}</p>
    `;

    setBackground(condition);
}

function setBackground(condition) {
    let backgroundUrl = '';

    switch(condition.toLowerCase()) {
        case 'clear':
            backgroundUrl = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1500&q=80')";
            break;
        case 'clouds':
            backgroundUrl = "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1500&q=80')";
            break;
        case 'rain':
            backgroundUrl = "url('https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1500&q=80')";
            break;
        case 'snow':
            backgroundUrl = "url('https://images.unsplash.com/photo-1608889175798-fc450bc8e2f1?auto=format&fit=crop&w=1500&q=80')";
            break;
        case 'haze':
        case 'mist':
            backgroundUrl = "url('https://images.unsplash.com/photo-1486580321593-df476f4bc3d7?auto=format&fit=crop&w=1500&q=80')";
            break;
        default:
            backgroundUrl = "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1500&q=80')";
    }

    document.body.style.background = `
        linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
        ${backgroundUrl} no-repeat center center fixed
    `;
    document.body.style.backgroundSize = 'cover';
}

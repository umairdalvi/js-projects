class weatherApp {
    constructor() {
        this.WEATHER_API_KEY = 'aef678dee6066376522590b6d051b5dc';
        this.TIMEZONE_API_KEY = '3b9fc2b16e6d4e058680f604b4f9ecff'

        this.elements = {
            form: document.getElementById('weatherForm'),
            cityInput: document.getElementById('cityInput'),
            weatherDisplay: document.getElementById('weatherDisplay'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            errorMessage: document.getElementById('errorMessage'),
            errorText: document.getElementById('error-text'),
            weatherCard: document.getElementById('weatherCard'),
            themeToggle: document.getElementById('themeToggle'),
            cityName: document.getElementById('cityName'),
            dateTime: document.getElementById('dateTime'),
            temperature: document.getElementById('temperature'),
            weatherIcon: document.getElementById('weatherIcon'),
            weatherDescription: document.getElementById('weatherDescription'),
            feelsLike: document.getElementById('feelsLike'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('windSpeed'),
            pressure: document.getElementById('pressure'),
            visibility: document.getElementById('visibility'),
        }

        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.displayWeatherData();
        });
    }

    showLoader() {
        this.elements.loadingSpinner.style.display = 'block';
        this.elements.weatherCard.style.display = 'none';
        this.elements.errorMessage.style.display = 'none';
    }

    hideLoader() {
        this.elements.loadingSpinner.style.display = 'none';
    }

    showCard() {
        this.elements.weatherCard.style.display = 'block';
        this.elements.errorMessage.style.display = 'none';
    }

    hideCard() {
        this.elements.weatherCard.style.display = 'none';
    }

    showError(error = null) {
        this.hideCard();
        this.hideLoader();
        this.elements.errorMessage.style.display = 'block';
        this.elements.errorText.innerText = error.message || "Something went wrong.";
    }

    hideError() {
        this.elements.errorMessage.style.display = 'none';
    }

    async searchCity() {
        const CITY = this.elements.cityInput.value.trim().toLowerCase();
        if (!CITY) return null;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${this.WEATHER_API_KEY}`);

            if (!response.ok) {
                if (response.status == 404) {
                    throw new Error("City not found! Please check the spelling and try again.")
                } else {
                    throw new Error("Something went wrong. Please try again later.");
                }
            }

            return await response.json();

        } catch (error) {
            this.showError(error);
            return null;
        }
    }

    async getTimezone(lat, lon) {
        try {
            const response = await fetch(`https://timezone.abstractapi.com/v1/current_time?api_key=${this.TIMEZONE_API_KEY}&location=${lat},${lon}`);

            if (!response.ok) {
                throw new Error("Something went wrong. Please try again later.");
            }

            return await response.json();

        } catch (error) {
            this.showError(error);
            return null;
        }
    }

    async displayWeatherData() {
        this.showLoader();
        this.hideError();
        this.hideCard();

        try {
            let city = await this.searchCity();
            if (!city) return;

            let timezone = await this.getTimezone(city.coord.lat, city.coord.lon);

            this.elements.weatherCard.style.display = "block";
            this.elements.cityName.innerText = `${city.name}, ${city.sys.country}`;
            this.elements.dateTime.innerText = `${timezone.datetime} ${timezone.timezone_abbreviation}`
            this.elements.weatherIcon.src = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
            this.elements.temperature.innerText = `${(city.main.temp).toFixed(1)} °C`;
            this.elements.feelsLike.innerText = `${(city.main.feels_like).toFixed(1)} °C`;
            this.elements.humidity.innerText = `${city.main.humidity}%`;
            this.elements.windSpeed.innerText = `${city.wind.speed} m/s`;
            this.elements.weatherDescription.innerText = `${city.weather[0].description}`;
            this.elements.pressure.innerText = `${city.main.pressure} hPa`;
            this.elements.visibility.innerText = `${city.visibility / 1000} km`;

        } catch (error) {
            this.showError(error);

        } finally {
            this.hideLoader();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => { new weatherApp() })
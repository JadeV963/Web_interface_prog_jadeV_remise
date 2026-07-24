import { getCurrentWeather } from "./weatherApi.js";
import { WeatherReading } from "./WeatherReading.js";

const DEFAULT_LATITUDE = 45.5088;
const DEFAULT_LONGITUDE = -73.5878;

export class CurrentWeather extends HTMLElement {
    constructor() {
        super();

        this.attachShadow( {mode:"open"});

        const template = document.getElementById("current-weather-template");
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._statusEl = this.shadowRoot.querySelector(".status");
        this._temperatureEl = this.shadowRoot.querySelector(".temperature");
        this._windEl = this.shadowRoot.querySelector(".wind");
    }

    connectedCallback(){
        if (this.hasAttribute("latitude") && this.hasAttribute("longitude")){
            this._loadWeather(
                Number(this.getAttribute("latitude")),
                Number(this.getAttribute("longitude")),
            );
        } else {
            this._loadFromGeolocation();
        }
    }

    _getPosition(){
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async _loadFromGeolocation(){
        try{
            const position = await this._getPosition();
            this._loadWeather(position.coords.latitude, position.coords.longitude);
        } catch (error) {
            console.error("Geolocation unavailable, using default location:", error);
            this._loadWeather(DEFAULT_LATITUDE,  DEFAULT_LONGITUDE);
        }
    }

    async _loadWeather(latitude, longitude){
        this._renderLoading();

        try{
            const rawData = await getCurrentWeather(latitude, longitude);
            const reading = WeatherReading.fromApiResponse(rawData);
            this._renderReading(reading); 
        } catch(error) {
            console.error("Failed to load weather:", error);
            this._renderError(error.message);
        }
    }

    _renderLoading() {
        this._statusEl.textContent = "Loading weather...";
        this._temperatureEl.textContent = "";
        this._windEl.textContent = "";
    }

    _renderError(message) {
        this._statusEl.textContent = `Error: ${message}`;
        this._temperatureEl.textContent = "";
        this._windEl.textContent = "";
    }

    _renderReading(reading) {
        this._statusEl.textContent = "Current weather";
        this._temperatureEl.textContent = reading.formattedTemperature;
        this._windEl.textContent = `Wind: ${reading.formattedWind}`;
    }
}

customElements.define("current-weather", CurrentWeather);
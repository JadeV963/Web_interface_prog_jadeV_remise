/**
 * Represents a single current-weather reading returned by the
 * Open-Meteo API, with formatting helpers for display.
 */

export class WeatherReading{
    constructor(temperature, windspeed, weathercode, time) {
        this.temperature = temperature;
        this.windspeed = windspeed;
        this.weathercode = weathercode;
        this.time = time;
    }

     get formattedTemperature(){
        return `${Math.round(this.temperature)}°C`;
    }

    get formattedWind() {
        return `${Math.round(this.windspeed)} km/h`;
    }

    static fromApiResponse(data){
        const current = data.current_weather;
        return new WeatherReading(
            current.temperature,
            current.windspeed,
            current.weathercode,
            current.time,
        );
    }
}


   
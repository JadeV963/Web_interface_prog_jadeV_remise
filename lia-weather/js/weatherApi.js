//base URL for the open-Meteo API - a named constant instead of
//repeating this string everywhere it's needed.
const WEATHER_API_BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Fetches the current weather for a given set of coordinates.
 * Follows the same pattern used in class: fetch, check
 * response.ok, throw a useful error, then parse and return.
 */

export async function getCurrentWeather(latitude, longitude){
     const url = `${WEATHER_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

     const response = await fetch(url);

     if(!response.ok){
        throw new Error(
            `Unable to load weather data. HTTP status : ${response.status}`,
        )
     }
     return response.json();
    }
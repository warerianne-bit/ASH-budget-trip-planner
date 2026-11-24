
import { useState, useEffect } from "react";

// Convert weather codes into readable conditions
function weatherCondition(code) {
  if (code === 0) return "☀️ Sunny";
  if (code === 1) return "🌤️ Mostly sunny";
  if (code === 2) return "⛅ Partly cloudy";
  if (code === 3) return "☁️ Cloudy";
  if ([45, 48].includes(code)) return "🌫️ Fog";
  if ([51, 53, 55, 56, 57].includes(code))
    return "🌦️ Drizzle";
  if ([61, 63, 65, 66, 67].includes(code))
    return "🌧️ Rain";
  if ([71, 73, 75, 77].includes(code))
    return "❄️ Snow";
  if ([80, 81, 82].includes(code))
    return "🌧️ Showers";
  if ([85, 86].includes(code))
    return "🌨️ Snow showers";
  if ([95, 96, 99].includes(code))
    return "⛈️ Thunderstorm";

  return "Unknown";
}

function WeatherDestination({ trip = {} }) {

  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  const destinations = (
    trip.destinations || [trip.destination || ""]
  ).map(city => city.trim()).filter(Boolean);

  const destinationKey = JSON.stringify(destinations);

  useEffect(() => {

    const controller = new AbortController();

    async function getWeather() {

      setLoading(true);

      const cities = JSON.parse(destinationKey);

      const results = await Promise.all(
        cities.map(async destination => {

          try {

            // Find destination coordinates
            const [city, country] = destination
              .split(",")
              .map(value => value.trim());

            const geoResponse = await fetch(
              `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`,
              { signal: controller.signal }
            );

            if (!geoResponse.ok) {
              throw new Error("Location search failed");
            }

            const geoData = await geoResponse.json();

            const location = country
              ? geoData.results?.find(item =>
                  item.country?.toLowerCase() ===
                    country.toLowerCase() ||
                  item.country_code?.toLowerCase() ===
                    country.toLowerCase()
                )
              : geoData.results?.[0];

            if (!location) {
              throw new Error("Destination not found");
            }

            // Get current weather and forecast
            const weatherResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`,
              { signal: controller.signal }
            );

            if (!weatherResponse.ok) {
              throw new Error("Weather unavailable");
            }

            const data = await weatherResponse.json();

            if (!data.current || !data.daily?.time) {
              throw new Error("Incomplete weather data");
            }

            return {
              destination,
              city: location.name,
              country: location.country,
              current: data.current,
              daily: data.daily
            };

          } catch (error) {

            return {
              destination,
              error: error.message
            };

          }

        })
      );

      if (!controller.signal.aborted) {
        setWeather(results);
        setLoading(false);
      }
    }

    const timer = setTimeout(getWeather, 800);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };

  }, [destinationKey]);

  return (
    <section className="weather-section">

      <h2>🌍 Destination Weather</h2>

      <p>Current weather and seven-day forecasts.</p>

      {destinations.length === 0 && (
        <p>Add a destination in My Trip.</p>
      )}

      {loading && <p>Loading weather...</p>}

      <div className="weather-grid">

        {!loading && destinations.length > 0 &&
          weather.map((item, index) => (

          <div className="weather-card" key={index}>

            {item.error ? (

              <>
                <h3>{item.destination}</h3>
                <p>{item.error}</p>
              </>

            ) : (

              <>
                <h3>{item.city}, {item.country}</h3>

                <div className="weather-temperature">
                  {Math.round(item.current.temperature_2m)}°C
                </div>

                <p>
                  {weatherCondition(item.current.weather_code)}
                </p>

                <div className="weather-details">

                  <span>
                    💧 {item.current.relative_humidity_2m}%
                  </span>

                  <span>
                    💨 {item.current.wind_speed_10m} km/h
                  </span>

                </div>

                <h4>7-Day Forecast</h4>

                <div className="forecast-grid">

                  {item.daily.time.map((date, i) => (

                    <div className="forecast-day" key={date}>

                      <strong>
                        {new Date(date + "T12:00:00")
                          .toLocaleDateString("en-AU", {
                            weekday: "short"
                          })}
                      </strong>

                      <small>
                        {date.slice(8)}/{date.slice(5, 7)}
                      </small>

                      <p>
                        {weatherCondition(
                          item.daily.weather_code[i]
                        )}
                      </p>

                      <strong>
                        {Math.round(
                          item.daily.temperature_2m_max[i]
                        )}°
                      </strong>

                      <small>
                        {Math.round(
                          item.daily.temperature_2m_min[i]
                        )}°
                      </small>

                    </div>

                  ))}

                </div>

              </>

            )}

          </div>

        ))}

      </div>

      <small>
        Weather data provided by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open-Meteo
        </a>
      </small>

    </section>
  );
}

export default WeatherDestination;


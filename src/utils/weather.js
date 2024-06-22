const weatherAIApiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather({ city }) {
  try {
    const endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAIApiKey}&units=metric`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const weatherReport = displayWeather(data);
    return { report: weatherReport };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
}

export function displayWeather(data) {
  const targetTime = '12:00:00'; // Specific time to extract the weather data
  const dailyData = data.list.filter(entry => entry.dt_txt.includes(targetTime));

  return dailyData.slice(0, 5).map(entry => {
    const date = entry.dt_txt.split(' ')[0];
    const description = entry.weather[0].description;
    const temp_min = entry.main.temp_min;
    const temp_max = entry.main.temp_max;
    return `Date: ${date}, Weather: ${description}, Temperature: Min ${temp_min}°C, Max ${temp_max}°C`;
  }).join('\n');
}

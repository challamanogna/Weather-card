const API_KEY = "YOUR_API_KEY"; 
const btn = document.getElementById("get-weather-btn");
const cityInput = document.getElementById("city-input");
const container = document.getElementById("weather-container");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const result = await response.json();
    console.log("API result:", result); // <-- Debugging line

    if (!response.ok) throw new Error(result.message);
    return result;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}


async function showWeather(city) {
  const data = await getWeather(city);
  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  container.classList.remove("hidden");

  document.getElementById("location").textContent =
    `${data.name}, ${data.sys.country}`;
  document.getElementById("weather-main").textContent =
    data.weather[0]?.main || "N/A";
  document.getElementById("main-temperature").textContent =
    data.main?.temp ?? "N/A";
  document.getElementById("feels-like").textContent =
    data.main?.feels_like ?? "N/A";
  document.getElementById("humidity").textContent =
    data.main?.humidity ?? "N/A";
  document.getElementById("wind").textContent =
    data.wind?.speed ?? "N/A";
  document.getElementById("wind-gust").textContent =
    data.wind?.gust ?? "N/A";

  // Weather icon
  const iconCode = data.weather[0]?.icon;
  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Sunrise/Sunset
 const timezoneOffset = data.timezone; // offset in seconds
const sunrise = new Date((data.sys.sunrise + timezoneOffset) * 1000).toUTCString();
const sunset = new Date((data.sys.sunset + timezoneOffset) * 1000).toUTCString();

document.getElementById("sunrise").textContent = sunrise;
document.getElementById("sunset").textContent = sunset;

}

btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    showWeather(city);
  } else {
    alert("Please enter a city name.");
  }

});

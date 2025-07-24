const API_KEY = "695061045a0f47a3bca163031252307";  
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";  
const weatherApp = document.getElementById("weatherApp");  

// Weather backgrounds with images & font colors
const backgrounds = {  
  sunny: {  
    image: 'url("https://images.unsplash.com/photo-1504253163759-c23fccaebb51?auto=format&fit=crop&w=1200&q=80")',  
    textColor: "#000000",  
  },  
  clear: {  
    image: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1200&q=80")',  
    textColor: "#000000",  
  },  
  cloudy: {  
    image: 'url("https://images.unsplash.com/photo-1503437313881-503a91226419?auto=format&fit=crop&w=1200&q=80")',  
    textColor: "#ffffff",  
  },  
  "partly cloudy": {  
    image: 'url("https://images.unsplash.com/photo-1601132359864-d2c4cfb4c42c?auto=format&fit=crop&w=1200&q=80")',  
    textColor: "#ffffff",  
  },  
  rainy: {  
    image: 'url("https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1200&q=80")',  
    textColor: "#ffffff",  
  },  
  snow: {  
    image: 'url("https://images.unsplash.com/photo-1483181957632-8bda9740b6f8?auto=format&fit=crop&w=1200&q=80")',  
    textColor: "#000000",  
  },  
};  

// Live date/time updater
function updateTime() {  
  const now = new Date();  
  document.getElementById("day").innerText = now.toLocaleDateString("en-US", { weekday: "long" });  
  document.getElementById("time").innerText = now.toLocaleTimeString();  
}  
updateTime();  
setInterval(updateTime, 1000);  

// Update weather UI
function updateUI(data) {  
  // Current weather
  document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;  
  document.getElementById("condition").innerText = data.current.condition.text;  
  document.getElementById("location").textContent = `${data.location.name}, ${data.location.region}`;  

  // Update background
  updateBackground(data.current.condition.text.toLowerCase());  

  // Forecast (Next 4 Days)
  const forecastDays = data.forecast.forecastday;  
  for (let i = 1; i <= 4; i++) {  
    const dayData = forecastDays[i - 1];  
    document.getElementById(`forecast-temp${i}`).textContent = `${dayData.day.avgtemp_c}°C`;  
    document.getElementById(`forecast-condition${i}`).textContent = dayData.day.condition.text;  

    const date = new Date(dayData.date);  
    document.getElementById(`forecast-day${i}`).textContent = date.toLocaleDateString("en-US", { weekday: "long" });  
  }  
}  

// Set background and text color  
function updateBackground(condition) {  
  weatherApp.style.backgroundImage = "";  
  weatherApp.style.backgroundColor = "#22797A";  
  weatherApp.style.color = "#6FFFE9";  
  weatherApp.style.backgroundSize = "";  
  weatherApp.style.backgroundPosition = "";  
  weatherApp.style.backgroundRepeat = "";  

  for (const key in backgrounds) {  
    if (condition.includes(key)) {  
      const bg = backgrounds[key];  
      if (bg.image) {  
        weatherApp.style.backgroundImage = bg.image;  
        weatherApp.style.backgroundSize = "cover";  
        weatherApp.style.backgroundPosition = "center";  
        weatherApp.style.backgroundRepeat = "no-repeat";  
      }  
      if (bg.textColor) {  
        weatherApp.style.color = bg.textColor;  
      }  
      break;  
    }  
  }  
}  

// Fetch weather data  
async function fetchWeather(location) {  
  try {  
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}&days=4`);  
    const data = await response.json();  

    if (data && data.current) {  
      updateUI(data);  
    } else {  
      console.error("No weather data found");  
    }  
  } catch (error) {  
    console.error("Error fetching weather:", error);  
  }  
}  

// Default city  
fetchWeather("Lagos");  

// Initialize AOS  
AOS.init({  
  duration: 1000,  
  easing: "ease-out",  
  once: true,  
});
const apiKey = "e2b562747a664084bb2142918251801"; // Replace with your actual key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const weather = data.current;
    const location = data.location;

    document.getElementById("cityName").textContent = `${location.name}, ${location.country}`;
    document.getElementById("description").textContent = weather.condition.text;
    document.getElementById("temperature").textContent = weather.temp_c;
    document.getElementById("humidity").textContent = weather.humidity;
    document.getElementById("weatherIcon").src = `https:${weather.condition.icon}`;

    document.getElementById("weatherInfo").classList.remove("hidden");

    setBackgroundImage(weather.condition.text.toLowerCase());

  } catch (error) {
    alert("Could not fetch weather. Please check the city name.");
    document.getElementById("weatherInfo").classList.add("hidden");
  }
}

function setBackgroundImage(condition) {
  const body = document.body;
  let imageUrl = "";

  if (condition.includes("clear") || condition.includes("sunny")) {
    imageUrl = "https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg";
  } else if (condition.includes("cloud")) {
    imageUrl = "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg";
  } else if (condition.includes("rain")) {
    imageUrl = "https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg";
  } else if (condition.includes("thunder")) {
    imageUrl = "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg";
  } else if (condition.includes("snow")) {
    imageUrl = "https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg";
  } else {
    imageUrl = "https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg"; // default
  }

  body.style.backgroundImage = `url('${imageUrl}')`;
}



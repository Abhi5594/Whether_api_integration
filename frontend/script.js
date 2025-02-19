async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/weather?city=${city}`);
        const data = await response.json();
        console.log(data); // Debugging: Check response in console

        // Update HTML with weather data
        document.getElementById("city-name").innerText = `City: ${data.name}`;
        document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").innerText = `Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").innerText = `Wind Speed: ${data.wind.speed} m/s`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Try again!");
    }
}

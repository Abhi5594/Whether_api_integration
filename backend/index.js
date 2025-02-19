const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Weather API Route
app.get("/weather", async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        const apiKey = process.env.WEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        console.log("Fetching weather for:", city);
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Redirect root URL to frontend server
app.get("/", (req, res) => {
    res.redirect("http://localhost:3000"); // Change to your frontend server URL
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
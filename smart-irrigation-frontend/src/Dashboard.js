import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [moistureLevel, setMoistureLevel] = useState(0);
  const [pumpStatus, setPumpStatus] = useState("OFF");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace this
  const CITY = "Nelspruit"; // or use lat/lon

  useEffect(() => {
    // Fetch moisture level only if pump is ON
    if (pumpStatus === "ON") {
      setMoistureLevel(Math.floor(Math.random() * 100)); // simulate
    } else {
      setMoistureLevel(0);
    }

    // Fetch weather data
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setTemperature(response.data.main.temp);
        setHumidity(response.data.main.humidity);
      })
      .catch((error) => {
        console.error("Weather fetch error:", error);
      });
  }, [pumpStatus]);

  // Determine moisture status
  const moistureStatus =
    moistureLevel > 70
      ? "Soil too wet"
      : moistureLevel > 40
      ? "Moisture OK"
      : "Soil too dry";

  return (
    <div className="dashboard">
      <h1>Smart Irrigation Dashboard</h1>

      <div className="card">
        <h2>Moisture Level</h2>
        <p>{moistureLevel}%</p>
        <p>Status: {moistureStatus}</p>
      </div>

      <div className="card">
        <h2>Temperature</h2>
        <p>{temperature !== null ? `${temperature} °C` : "Loading..."}</p>
      </div>

      <div className="card">
        <h2>Humidity</h2>
        <p>{humidity !== null ? `${humidity} %` : "Loading..."}</p>
      </div>

      <div className="buttons">
        <button
          onClick={() => setPumpStatus("ON")}
          className={pumpStatus === "ON" ? "active" : ""}
        >
          Pump ON
        </button>
        <button
          onClick={() => setPumpStatus("OFF")}
          className={pumpStatus === "OFF" ? "active" : ""}
        >
          Pump OFF
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

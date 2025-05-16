import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pumpStatus, setPumpStatus] = useState("OFF");
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(60);
  const [moisture, setMoisture] = useState(35);
  const [nextRun, setNextRun] = useState("May 18, 7:00 AM");
  const [duration, setDuration] = useState("15 mins");

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePumpControl = (status) => {
    setPumpStatus(status);
    if (status === "ON") {
      setMoisture(42); // simulated sensor value
    } else {
      setMoisture(0);
    }
  };

  if (isLoading) {
    return (
      <div className="splash">
        <img src="/logo192.png" alt="Logo" className="splash-logo" />
        <h2>Smart Irrigation System</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="section location">📍 Location: Backyard Garden</div>

      <div className="section row">
        🌡️ Temp: {temperature}°C &nbsp;&nbsp;
        💧 Humidity: {humidity}% &nbsp;&nbsp;
        🌱 Moisture: {moisture}%
      </div>

      <div className="section row">
        🚰 Pump Status: {pumpStatus}
        <div className="buttons">
          <button onClick={() => handlePumpControl("ON")}>Turn Pump ON</button>
          <button onClick={() => handlePumpControl("OFF")}>Turn Pump OFF</button>
        </div>
      </div>

      <div className="section row">
        📅 Next Run: {nextRun} &nbsp;&nbsp; 🕒 Duration: {duration}
      </div>

      <div className="section chart">
        <h3>📈 Moisture Analytics (Last 7 Days)</h3>
        <div className="chart-box">
          <p>[Moisture % over Time (Line Chart Placeholder)]</p>
        </div>
      </div>

      <div className="section row footer">
        <button>View Full History</button>
        <button>Settings</button>
      </div>
    </div>
  );
}

export default App;

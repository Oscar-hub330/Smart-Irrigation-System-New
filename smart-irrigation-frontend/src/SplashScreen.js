import React from "react";
import "./SplashScreen.css";
import logo from "./assets/logo.png"; // Import logo image

function SplashScreen() {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="splash-logo" />
      <h1 className="splash-title">Smart Irrigation System</h1>
    </div>
  );
}

export default SplashScreen;

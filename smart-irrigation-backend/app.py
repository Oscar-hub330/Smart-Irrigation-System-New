from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulated actual sensor reading (replace this with real sensor reading)
actual_moisture_value = 42  # Example value from sensor
sensor_data = {
    "moisture": 0,
    "status": "Pump OFF, moisture not measured",
    "pump_status": "OFF"
}

@app.route("/api/sensor-data", methods=["GET"])
def get_sensor_data():
    if sensor_data["pump_status"] == "ON":
        # When pump ON, send actual sensor reading
        sensor_data["moisture"] = actual_moisture_value
        sensor_data["status"] = "Moisture OK"
    else:
        # When pump OFF, moisture is 0
        sensor_data["moisture"] = 0
        sensor_data["status"] = "Pump OFF, moisture not measured"
    return jsonify(sensor_data)

@app.route("/api/pump", methods=["POST"])
def control_pump():
    data = request.get_json()
    command = data.get("command")
    if command in ["ON", "OFF"]:
        sensor_data["pump_status"] = command
        return jsonify({"message": f"Pump turned {command}"}), 200
    return jsonify({"error": "Invalid pump command"}), 400

if __name__ == "__main__":
    app.run(debug=True)

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type TelemetryProps = {
  token: string;
};

type TelemetryData = {
  vehicle_id: string;
  timestamp: string;
  gps_lat: number;
  gps_long: number;
  speed: number;
  engine_temp: number;
  fuel_level: number;
  tire_pressure: number;
};

const TelemetryPanel: React.FC<TelemetryProps> = ({ token }) => {
  const [data, setData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    const fetchTelemetry = () => {
      axios.get("http://127.0.0.1:8000/api/telemetry/latest/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching telemetry:", err));
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);

    return () => clearInterval(interval);
  }, [token]);

  if (!data) return <div className="text-center text-gray-500">Loading telemetry...</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🚗 Vehicle: {data.vehicle_id}</h2>
      <ul className="space-y-2 text-sm">
        <li><strong>Speed:</strong> {data.speed} km/h</li>
        <li><strong>Engine Temp:</strong> {data.engine_temp} °C</li>
        <li><strong>Fuel Level:</strong> {data.fuel_level} %</li>
        <li><strong>Tire Pressure:</strong> {data.tire_pressure} PSI</li>
        <li><strong>GPS:</strong> {data.gps_lat}, {data.gps_long}</li>
        <li><strong>Time:</strong> {new Date(data.timestamp).toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default TelemetryPanel;
// This component fetches and displays the latest telemetry data for a vehicle.
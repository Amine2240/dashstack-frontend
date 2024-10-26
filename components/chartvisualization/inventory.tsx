"use client";
import React from "react";
import { Line, Scatter, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useState } from "react";
import { useEffect } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
interface ChartData {
  timestamp: string;
  // Add other properties of your data items here
}

interface InvetoryProps {
  data: ChartData[];
}

export default function Invetory() {
  const [inventory, setinventory] = useState([]);
  useEffect(() => {
    
    const fetchStampingPress =  () => {
      // Connect to the SSE endpoint
      const eventSource = new EventSource('http://localhost:4000/api/kpi/inventory-turnover-rate');
      console.log("eventSource : ", eventSource);
      

      // Listen for incoming data events
      eventSource.onmessage = (event) => {
          try {
              const newData = JSON.parse(event.data);
              console.log(' new data : ' , newData);
              
              setinventory((prevData) => [...prevData, newData]); // Append new data point
          } catch (err) {
              console.error("Error parsing data:", err);
              // setError("Error parsing data from server.");
          }
      };

      // Handle the end of the stream
      eventSource.addEventListener("end", () => {
          eventSource.close();
      });

      // Handle errors
      eventSource.onerror = (err) => {
          console.error("EventSource failed:", err);
          // setError("Connection to server failed.");
          eventSource.close();
      };
    };
    fetchStampingPress();
  }, []);
  const timestamps = inventory.map((item) =>
    new Date(item.Timestamp).toLocaleTimeString()
  );
  const inventoryData = {
    labels: timestamps,
    datasets: [
      {
        label: "Inventory Turnover Rate",
        data: inventory.map((item) => item?.KPI_Value || 0),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };
  return (
    <div>
      <Line data={inventoryData} />
    </div>
  );
}

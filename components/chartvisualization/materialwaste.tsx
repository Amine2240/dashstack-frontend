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

interface MaterialwasteProps {
  data: ChartData[];
}

export default function Materialwaste() {
  const [materialwaste, setmaterialwaste] = useState([]);
  useEffect(() => {
    
    const fetchStampingPress =  () => {
      // Connect to the SSE endpoint
      const eventSource = new EventSource('http://localhost:4000/api/kpi/material-waste-percentage');
      console.log("eventSource : ", eventSource);
      

      // Listen for incoming data events
      eventSource.onmessage = (event) => {
          try {
              const newData = JSON.parse(event.data);
              console.log(' new data : ' , newData);
              
              setmaterialwaste((prevData) => [...prevData, newData]); // Append new data point
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
  const timestamps = materialwaste.map((item) =>
    new Date(item.Timestamp).toLocaleTimeString()
  );
  const materialwasteData = {
    labels: timestamps,
    datasets: [
      {
        label: "Material Waste Percentage",
        data: materialwaste.map((item) => item?.KPI_Value || 0),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };
  return (
    <div>
      <Line data={materialwasteData} />
    </div>
  );
}

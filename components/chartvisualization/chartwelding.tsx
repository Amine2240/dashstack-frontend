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

interface ChartStampProps {
  data: ChartData[];
}

export default function ChartWelding() {
  const [weldingRobotEfficiency, setWeldingRobotEfficiency] = useState([]);
  useEffect(() => {
    
    const fetchStampingPress =  () => {
      // Connect to the SSE endpoint
      const eventSource = new EventSource('http://localhost:4000/api/kpi/welding-robot-efficiency');
      console.log("eventSource : ", eventSource);
      

      // Listen for incoming data events
      eventSource.onmessage = (event) => {
          try {
              const newData = JSON.parse(event.data);
              console.log(' new data : ' , newData);
              
              setWeldingRobotEfficiency((prevData) => [...prevData, newData]); // Append new data point
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
    const timestamps = weldingRobotEfficiency.map((item) =>
        new Date(item.Timestamp).toLocaleTimeString()
      );
      const stampData = {
        labels: timestamps,
        datasets: [
          {
            label: "Welding Robot Efficiency",
            data: weldingRobotEfficiency.map((item) => item?.KPI_Value|| 0),
            borderColor: "rgba(255, 0, 0, 1)",
            fill: false,
          },
        ],
      };
      return(
        <div>
            <Line data={stampData} />
        </div>
      )
    }



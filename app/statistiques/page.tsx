"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Radar, Doughnut, PolarArea, Pie } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import {
  FaRobot,
  FaCogs,
  FaPaintRoller,
  FaTruck,
  FaIndustry,
  FaWater,
  FaBolt,
} from "react-icons/fa";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "chart.js/auto";

import { API_URL } from "@/lib/api";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const HistoricalDataCharts = () => {
  const [historicalData, setHistoricalData] = useState({
    weldingRobot: null,
    stampingPress: null,
    paintingRobot: null,
    agv: null,
    cncMachine: null,
    leakTest: null,
  });
  const [energyData, setEnergyData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weldingRobot = await axios.get(
          `${API_URL}/historical-data/welding-robot`
        );
        const stampingPress = await axios.get(
          `${API_URL}/historical-data/stamping-press`
        );
        const paintingRobot = await axios.get(
          `${API_URL}/historical-data/painting-robot`
        );
        const agv = await axios.get(
          `${API_URL}/historical-data/agv`
        );
        const cncMachine = await axios.get(
          `${API_URL}/historical-data/cnc-machine`
        );
        const leakTest = await axios.get(
          `${API_URL}/historical-data/leak-test`
        );

        const energyResponse = await axios.get(`${API_URL}/energy`);

        setHistoricalData({
          weldingRobot: weldingRobot.data,
          stampingPress: stampingPress.data,
          paintingRobot: paintingRobot.data,
          agv: agv.data,
          cncMachine: cncMachine.data,
          leakTest: leakTest.data,
        });
        setEnergyData(energyResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data or energy data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const weldingRobotData = {
    labels: historicalData.weldingRobot?.map((entry) =>
      new Date(entry.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Weld Temperature (°C)",
        data: historicalData.weldingRobot?.map(
          (entry) => entry.weld_temperature
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const stampingPressData = {
    labels: historicalData.stampingPress?.map((entry) =>
      new Date(entry.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Force Applied (tons)",
        data: historicalData.stampingPress?.map((entry) => entry.force_applied),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const paintingRobotData = {
    labels: [
      "Spray Pressure",
      "Paint Thickness",
      "Humidity",
      "Paint Flow Rate",
    ],
    datasets: [
      {
        label: "Painting Robot Metrics",
        data: historicalData.paintingRobot
          ? [
              historicalData.paintingRobot[0]?.spray_pressure,
              historicalData.paintingRobot[0]?.paint_thickness,
              historicalData.paintingRobot[0]?.humidity,
              historicalData.paintingRobot[0]?.paint_flow_rate,
            ]
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const agvData = {
    labels: ["Battery Level", "Load Weight", "Speed", "Distance Traveled"],
    datasets: [
      {
        label: "AGV Stats",
        data: historicalData.agv
          ? [
              historicalData.agv[0]?.battery_level,
              historicalData.agv[0]?.load_weight,
              historicalData.agv[0]?.speed,
              historicalData.agv[0]?.distance_traveled,
            ]
          : [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const cncMachineData = {
    labels: ["Spindle Speed", "Tool Wear", "Feed Rate", "Power Consumption"],
    datasets: [
      {
        label: "CNC Machine Stats",
        data: historicalData.cncMachine
          ? [
              historicalData.cncMachine[0]?.spindle_speed,
              historicalData.cncMachine[0]?.tool_wear_level,
              historicalData.cncMachine[0]?.feed_rate,
              historicalData.cncMachine[0]?.power_consumption,
            ]
          : [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const leakTestData = {
    labels: ["Test Pressure", "Pressure Drop", "Leak Rate"],
    datasets: [
      {
        label: "Leak Test Metrics",
        data: historicalData.leakTest
          ? [
              historicalData.leakTest[0]?.test_pressure,
              historicalData.leakTest[0]?.pressure_drop,
              historicalData.leakTest[0]?.leak_rate,
            ]
          : [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const energyConsumptionLineData = {
    labels: energyData.map((entry) =>
      new Date(entry.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: energyData.map((entry) => entry.energy),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,

        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6FA] p-5">
      <p className="text-3xl font-bold capitalize mb-10">
        Historical Data & Energy Consumption
      </p>

      {/* Historical Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AGV - Doughnut Chart */}
        <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <FaTruck size={30} className="text-yellow-500" />
            <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
              AGV
            </p>
          </div>
          <Doughnut data={agvData} />
        </div>

        {/* Painting Robot - Radar Chart */}
        <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <FaPaintRoller size={30} className="text-pink-500" />
            <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
              Painting Robot
            </p>
          </div>
          <Radar data={paintingRobotData} />
        </div>

        {/* CNC Machine - Polar Area Chart */}
        <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <FaCogs size={30} className="text-purple-500" />
            <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
              CNC Machine
            </p>
          </div>
          <PolarArea data={cncMachineData} />
        </div>

        {/* Welding Robot - Line Chart */}
        <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <FaRobot size={30} className="text-blue-500" />
            <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
              Welding Robot
            </p>
          </div>
          <Line data={weldingRobotData} />
        </div>

        {/* Stamping Press - Bar Chart */}
        <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <FaIndustry size={30} className="text-green-500" />
            <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
              Stamping Press
            </p>
          </div>
          <Bar data={stampingPressData} />
        </div>

        {/* Leak Test - Pie Chart */}
        <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <FaWater size={30} className="text-red-500" />
            <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
              Leak Test
            </p>
          </div>
          <Pie data={leakTestData} />
        </div>
      </div>

      {/* Energy Consumption Section - Now using a Line Chart */}
      <p className="text-3xl font-bold capitalize mt-10 mb-4">
        Energy Consumption
      </p>
      <div className="flex flex-col bg-white w-full h-auto rounded-lg p-6 shadow-lg">
        <div className="flex items-center mb-3">
          <FaBolt size={30} className="text-yellow-500" />
          <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
            Machine Energy Consumption
          </p>
        </div>
        <Line data={energyConsumptionLineData} /> {/* Changed to Line Chart */}
      </div>
    </div>
  );
};

export default HistoricalDataCharts;

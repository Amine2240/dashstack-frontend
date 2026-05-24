"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FaRobot,
  FaCogs,
  FaIndustry,
  FaTachometerAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";
import humanresources from "@/public/images/hr.svg";
import path from "@/public/images/path.svg";
import pathdown from "@/public/images/pathdown.svg";
import totaltasks from "@/public/images/totaltasks.svg";
import totalwarnings from "@/public/images/totalwarnings.svg";
import productioncount from "@/public/images/completedtasks.svg";

import { API_URL } from "@/lib/api";

interface Task {
  _id: string;
  taskTitle: string;
  isDone: boolean;
}

interface Log {
  status: "normal" | "warning" | "danger";
}

interface User {
  _id: string;
  name: string;
  role: string;
}

interface DashboardData {
  totalTasks: number;
  openWarnings: number;
  totalUsers: number;
  productionCount: number; // Changed from completedTasks to productionCount
}

interface MachineInsight {
  machine_id: string;
  total_energy_consumption: number;
  average_energy_consumption: number;
  max_energy_spike: number;
  min_energy_consumption: number;
  energy_efficiency: string;
  recommendation: string;
}

interface ShiftInsight {
  most_energy_consumed_shift: string;
  least_energy_consumed_shift: string;
  shift_energy_trends: {
    [key: string]: {
      total_energy: number;
      average_energy_per_machine: number;
    };
  };
}

interface OverallTrends {
  anomalies: {
    machine_id: string;
    shift: string;
    description: string;
  }[];
  optimization_suggestions: string[];
}

interface EnergySummary {
  machine_insights: MachineInsight[];
  shift_insights: ShiftInsight;
  overall_trends: OverallTrends;
}

const Page = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalTasks: 0,
    openWarnings: 0,
    totalUsers: 0,
    productionCount: 0, // Updated field name
  });

  const [energySummary, setEnergySummary] = useState<EnergySummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get<Task[]>(
          `${API_URL}/tasks`
        );
        const totalTasks = tasksResponse.data.length;

        const logsResponse = await axios.get<Log[]>(
          `${API_URL}/logs`
        );
        const openWarnings = logsResponse.data.filter(
          (log: Log) => log.status === "warning" || log.status === "danger"
        ).length;

        const usersResponse = await axios.get<User[]>(
          `${API_URL}/users/users`
        );
        const totalUsers = usersResponse.data.length;

        // Fetch the product count from the backend
        const productCountResponse = await axios.get(
          `${API_URL}/order-tracking/products/count`
        );

        const productionCount = productCountResponse.data["totalProduced"];

        console.log(productionCount);

        const energyResponse = await axios.get(
          `${API_URL}/ai/energy-summary`
        );
        const energyData = energyResponse.data.summary.summary;

        setDashboardData({
          totalTasks,
          openWarnings,
          totalUsers,
          productionCount, // Use production count from the server
        });
        setEnergySummary(energyData);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching dashboard or energy summary data:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const myarray = [
    {
      id: 0,
      name: "Human Resources",
      image: humanresources,
      amount: `${dashboardData.totalUsers}`,
      percentage: "",
      text: "Total users in the system",
      sign: path,
      color: "text-green-500",
    },
    {
      id: 1,
      name: "Total Tasks",
      image: totaltasks,
      amount: `${dashboardData.totalTasks}`,
      percentage: "",
      text: "Total tasks in the system",
      sign: path,
      color: "text-green-500",
    },
    {
      id: 2,
      name: "Total Warnings",
      image: totalwarnings,
      amount: `${dashboardData.openWarnings}`,
      percentage: "",
      text: "Open warnings or critical errors",
      sign: pathdown,
      color: "text-red-500",
    },
    {
      id: 3,
      name: "Products Produced", // Changed from Completed Tasks
      image: productioncount, // Updated image reference
      amount: `${dashboardData.productionCount}`, // Use productionCount
      percentage: "",
      text: "Total products successfully produced",
      sign: path,
      color: "text-green-500",
    },
  ];

  const formatMachineName = (machineId: string) => {
    return machineId
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getMachineIcon = (machineId: string) => {
    switch (machineId) {
      case "welding_robot_006":
        return <FaRobot size={30} className="text-blue-500" />;
      case "agv_003":
        return <FaCogs size={30} className="text-green-500" />;
      case "cnc_milling_004":
        return <FaIndustry size={30} className="text-purple-500" />;
      case "stamping_press_001":
        return <FaTachometerAlt size={30} className="text-yellow-500" />;
      case "leak_test_005":
        return <AiOutlineWarning size={30} className="text-red-500" />;
      case "painting_robot_002":
        return <FaRobot size={30} className="text-pink-500" />;
      default:
        return <FaIndustry size={30} className="text-gray-500" />;
    }
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "low":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const { shift_insights, overall_trends } = energySummary || {};

  return (
    <div className="bg-[#F5F6FA] p-5">
      <p className="text-3xl font-bold capitalize mb-10">Dashboard</p>

      {/* Dashboard Data Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-content-around">
        {myarray.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white w-full  rounded-lg p-5 "
          >
            <div className="flex items-start place-content-between">
              <div className="flex flex-col">
                <p className="capitalize text-xl font-semibold mr-3 text-[#202224]">
                  {item.name}
                </p>
                <p className="text-3xl font-bold my-5">{item.amount}</p>
              </div>
              <Image alt={item.name} src={item.image} />
            </div>

            <div className="flex">
              <Image alt="path" src={item.sign} className="mr-2" />
              <p className={`${item.color} mr-2`}>{item.percentage}</p>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Energy Summary Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Energy Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {energySummary?.machine_insights.map((insight) => (
            <div
              key={insight.machine_id}
              className="flex flex-col bg-white w-full h-auto rounded-lg p-6 "
            >
              <div className="flex items-center mb-3">
                {getMachineIcon(insight.machine_id)}
                <p className="capitalize text-xl font-semibold text-[#202224] ml-3">
                  {formatMachineName(insight.machine_id)}
                </p>
              </div>
              <p>
                Total Energy: {insight.total_energy_consumption.toFixed(2)} kWh
              </p>
              <p className={getEfficiencyColor(insight.energy_efficiency)}>
                Efficiency: {insight.energy_efficiency}
              </p>
              <p className="text-sm italic mt-2 text-gray-600">
                {insight.recommendation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Shift Insights Section */}
      {shift_insights && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Shift Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg ">
              <h3 className="text-lg font-semibold mb-2">
                Most Energy Consumed Shift
              </h3>
              <div className="flex items-center">
                <FaMoon size={25} className="text-blue-500 mr-3" />
                <p>{shift_insights.most_energy_consumed_shift}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg ">
              <h3 className="text-lg font-semibold mb-2">
                Least Energy Consumed Shift
              </h3>
              <div className="flex items-center">
                <FaSun size={25} className="text-yellow-500 mr-3" />
                <p>{shift_insights.least_energy_consumed_shift}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Shift Energy Trends</h3>
            {Object.entries(shift_insights.shift_energy_trends).map(
              ([shift, data]) => (
                <div key={shift} className="bg-white p-5 rounded-lg  mb-4">
                  <h4 className="text-md font-semibold mb-1">{shift} Shift</h4>
                  <p>Total Energy: {data.total_energy} kWh</p>
                  <p>
                    Average Energy per Machine:{" "}
                    {data.average_energy_per_machine} kWh
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Overall Trends Section */}
      {overall_trends && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Overall Trends</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {overall_trends.anomalies.map((anomaly) => (
              <div
                key={anomaly.machine_id}
                className="bg-white p-5 rounded-lg "
              >
                <h3 className="text-lg font-semibold mb-2 text-red-500">
                  Anomaly Detected
                </h3>
                <div className="flex items-center mb-2">
                  <AiOutlineWarning size={25} className="text-red-500 mr-3" />
                  <p>
                    {formatMachineName(anomaly.machine_id)} - {anomaly.shift}{" "}
                    Shift
                  </p>
                </div>
                <p className="text-sm italic">{anomaly.description}</p>
              </div>
            ))}

            <div className="bg-white p-5 rounded-lg ">
              <h3 className="text-lg font-semibold mb-2 text-green-500">
                Optimization Suggestions
              </h3>
              {overall_trends.optimization_suggestions.map(
                (suggestion, index) => (
                  <div key={index} className="flex items-start mb-2">
                    <AiOutlineCheckCircle
                      size={25}
                      className="text-green-500 mr-3"
                    />
                    <p>{suggestion}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;

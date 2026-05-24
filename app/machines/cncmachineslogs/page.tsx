"use client";
import Image from "next/image";
import cncMachineImage from "@/public/images/cnc.svg";
import view from "@/public/images/view.svg";
import thresholds from "@/public/images/thresholds.svg";
import reports from "@/public/images/reports.svg";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import * as XLSX from "xlsx"; // For Excel export

import { API_URL } from "@/lib/api";

const Page = () => {
  const [machine, setMachine] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/logs/cnc_milling_004`
      );
      setMachine(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create 10 rows of sample data
  const rows = machine.slice(0, 10).map((entry) => ({
    spindle_speed: entry?.sensorData?.spindle_speed + " RPM",
    tool_wear_level: entry?.sensorData?.tool_wear_level + " %",
    cut_depth: entry?.sensorData?.cut_depth + " mm",
    feed_rate: entry?.sensorData?.feed_rate + " mm/min",
    vibration_level: entry?.sensorData?.vibration_level + " mm/s",
    coolant_flow_rate: entry?.sensorData?.coolant_flow_rate + " ml/min",
    material_hardness: entry?.sensorData?.material_hardness + " HB",
    power_consumption: entry?.sensorData?.power_consumption + " kWh",
    temperature: entry?.sensorData?.temperature + "°C",
    chip_load: entry?.sensorData?.chip_load + " mm",
    timestamp: new Date(entry?.sensorData?.timestamp).toLocaleString(),
  }));

  // Function to download JSON
  const handleDownloadJSON = () => {
    const jsonBlob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "cnc_milling_004_report.json"; // Set the filename
    link.click();
  };

  // Function to download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows); // Convert JSON to worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "cnc_milling_004_report.xlsx"); // Set the filename
  };

  return (
    <div className="bg-[#F5F6FA] p-5">
      {/* Machine Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="flex justify-center items-center">
          <Image
            alt="CNC Machines"
            src={cncMachineImage}
            className="w-64 h-64"
          />
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">CNC Machines</p>
          <p className="text-lg mb-2">
            <strong>Machine ID:</strong> {machine[0]?.machine_id}
          </p>
          <p className="text-lg mb-2">
            <strong>Machine Type:</strong>{" "}
            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-semibold">
              {machine[0]?.machineType}
            </span>
          </p>
          <p className="bg-[#E18E3A] text-white inline-block py-1 px-3 mb-2">
            {machine[0]?.status}
          </p>
          <p className="text-lg mb-4">
            CNC machines are responsible for cutting, shaping, and drilling
            metal components. They ensure high precision and efficiency in
            creating car parts. Here’s an expanded view of the sensor data for
            CNC machines:
          </p>
          <div className="text-[#996127]">
            <p className="font-semibold mb-2">Warnings:</p>
            {machine && machine[0]?.warnings?.length > 0 ? (
              machine[0].warnings.map((warning, index) => (
                <p key={index}>{warning}</p>
              ))
            ) : (
              <p>No warnings available</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <Link href="/machines/cncmachineslogs/cncmachines">
          <button className="bg-[#815EEA] text-white w-full py-4 rounded-lg shadow-lg hover:bg-purple-700 transition flex flex-col items-center">
            <p className="text-xl mb-1">View Real-Time Metrics</p>
            <Image alt="view" src={view} width={30} height={30} />
          </button>
        </Link>

        <button
          onClick={handleDownloadJSON}
          className="bg-[#CFEDDA] text-[#518B66] w-full py-4 rounded-lg shadow-lg hover:bg-green-200 transition flex flex-col items-center"
        >
          <p className="text-xl mb-1">Download JSON Report</p>
          <Image alt="reports" src={reports} width={30} height={30} />
        </button>

        <button
          onClick={handleDownloadExcel}
          className="bg-[#BBBEFC] text-[#494D88] w-full py-4 rounded-lg shadow-lg hover:bg-blue-200 transition flex flex-col items-center"
        >
          <p className="text-xl mb-1">Download Excel Report</p>
          <Image alt="thresholds" src={thresholds} width={30} height={30} />
        </button>
      </div>

      {/* Expanded Schema Section */}
      <div>
        <p className="text-2xl font-bold mb-4">Expanded Schema</p>
        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table sx={{ minWidth: 650 }} aria-label="machine data table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Spindle Speed (RPM)</TableCell>
                <TableCell align="right">Tool Wear Level (%)</TableCell>
                <TableCell align="right">Cut Depth (mm)</TableCell>
                <TableCell align="right">Feed Rate (mm/min)</TableCell>
                <TableCell align="right">Vibration Level (mm/s)</TableCell>
                <TableCell align="right">Coolant Flow Rate (ml/min)</TableCell>
                <TableCell align="right">Material Hardness (HB)</TableCell>
                <TableCell align="right">Power Consumption (kWh)</TableCell>
                <TableCell align="right">Temperature (°C)</TableCell>
                <TableCell align="right">Chip Load (mm)</TableCell>
                <TableCell align="right">Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.spindle_speed}</TableCell>
                  <TableCell align="right">{row.tool_wear_level}</TableCell>
                  <TableCell align="right">{row.cut_depth}</TableCell>
                  <TableCell align="right">{row.feed_rate}</TableCell>
                  <TableCell align="right">{row.vibration_level}</TableCell>
                  <TableCell align="right">{row.coolant_flow_rate}</TableCell>
                  <TableCell align="right">{row.material_hardness}</TableCell>
                  <TableCell align="right">{row.power_consumption}</TableCell>
                  <TableCell align="right">{row.temperature}</TableCell>
                  <TableCell align="right">{row.chip_load}</TableCell>
                  <TableCell align="right">{row.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Page;

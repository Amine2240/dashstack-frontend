"use client";
import Image from "next/image";
import weldingimage from "@/public/images/leak.svg";
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

import { API_URL } from "@/lib/api";

const Page = () => {
  const [machine, setmachine] = useState([]);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/logs/welding_robot_006`
      );
      setmachine(response.data);
      console.log("machine : ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  function createData(
    temperature: string,
    powerconsuption: string,
    vibrationlevel: string,
    armposition: string,
    timestamp: string
  ) {
    return {
      temperature,
      powerconsuption,
      vibrationlevel,
      armposition,
      timestamp,
    };
  }

  const rows = [
    createData(
      machine[0]?.sensorData?.weld_temperature + "°C",
      machine[0]?.sensorData?.power_consumption + "KwH",
      machine[0]?.sensorData?.vibration_level + "mm/s",
      machine[0]?.sensorData?.arm_position?.x + ";"+ machine[0]?.sensorData?.arm_position?.y + ";" + machine[0]?.sensorData?.arm_position?.z,
      machine[0]?.sensorData?.timestamp
    ),
  ];
  return (
    <div className=" bg-[#F5F6FA] p-5">
      <div className="flex">
        <Image alt="agvs logs" src={weldingimage} />
        <div>
          <p className=" text-3xl font-bold">leakest tests</p>
          <div>
            <p>machineId : {machine[0]?.machine_id} </p>
            <p className="bg-[#E18E3A] text-white w-fit">
              {" "}
              {machine[0]?.status}{" "}
            </p>
          </div>
          <p>machineType : {machine[0]?.machineType} </p>
          <p>
            Welding robots are responsible for joining metal components of a car
            using various welding techniques such as spot welding or arc
            welding. They are precise, fast, and ensure strong, high-quality
            welds in the car assembly process. Here’s an expanded view of the
            sensor data for welding robots:
          </p>
          <div className=" text-[#996127]">
            {machine &&
            machine[0]?.warnings &&
            Array.isArray(machine[0].warnings) ? (
              machine[0].warnings.map((warning, index) => (
                <div key={index}>{warning}</div>
              ))
            ) : (
              <p>No warnings available</p>
            )}
          </div>
        </div>
      </div>
      <div className=" flex place-content-center">
        <button className=" bg-[#815EEA] text-white capitalize rounded-lg p-3">
          <Link href="/machines/leaktestslogs/leaktests">
          <p>view</p>
          <div className=" flex">
            <p className=" text-2xl mr-5"> real time metrics</p>
            <Image alt="view" src={view} />
          </div>
          </Link>
        </button>

        <button className=" mx-5 bg-[#CFEDDA] text-[#518B66] capitalize rounded-lg p-3">
          <p>download</p>
          <div className=" flex">
            <p className=" mr-5 text-2xl"> reports</p>
            <Image alt="view" src={reports} />
          </div>
        </button>

        <button className=" bg-[#BBBEFC] text-[#494D88] capitalize rounded-lg p-3">
          <p>explore & reset</p>
          <div className=" flex">
            <p className=" text-2xl mr-5"> threshoalds</p>
            <Image alt="view" src={thresholds} />
          </div>
        </button>
      </div>
      <div>
        <p>expanded schema</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Temperature</TableCell>
                <TableCell align="right">Power consumption</TableCell>
                <TableCell align="right">vibration level</TableCell>
                <TableCell align="right">arm position</TableCell>
                <TableCell align="right">timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.temperature}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.temperature}
                  </TableCell>
                  <TableCell align="right">{row.powerconsuption}</TableCell>
                  <TableCell align="right">{row.vibrationlevel}</TableCell>
                  <TableCell align="right">{row.armposition}</TableCell>
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

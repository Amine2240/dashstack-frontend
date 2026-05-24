"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image for machine icons

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import remove from "@/public/images/remove.svg";
import tasks from "@/public/images/tasks.svg";

import { API_URL } from "@/lib/api";

// Status color-coding helper function
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-500 text-white px-3 py-1 rounded-full";
    case "inactive":
      return "bg-red-500 text-white px-3 py-1 rounded-full";
  }
};

// const machineIcons: { [key: string]: string } = {
//   "Welding Robots": "/images/weldingimage.svg",
//   "Leak Tests": "/images/weldingimage.svg",
//   "CNC Machines": "/images/weldingimage.svg",
//   AGVs: "/images/weldingimage.svg",
//   "Painting Robots": "/images/weldingimage.svg",
//   "Stamping Presses": "/images/weldingimage.svg",
// };

export default function AdvancedTable() {
  const [users, setusers] = useState([]);
  const fetchusers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/users`);
      console.log("helloww", response.data);
      setusers(response.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const [isManager, setisManager] = useState(false);
  useEffect(() => {
    fetchusers();

    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const fetchuser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/users/${userId}`
        );
        if (response.data.role.toLowerCase() === "manager") {
          setisManager(true);
        } else {
          setisManager(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchuser();
  }, []);

  return (
    <TableContainer component={Paper} className="p-6 shadow-lg">
      <Table sx={{ minWidth: 650 }} aria-label="machine-table">
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="text-lg font-bold">User name</TableCell>
            <TableCell align="center" className="text-lg font-bold">
              status
            </TableCell>
            <TableCell align="center" className="text-lg font-bold">
              contact infos
            </TableCell>
            <TableCell align="center" className="text-lg font-bold">
              actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.name}>
              {/* Machine name with icon */}
              <TableCell component="th" scope="row">
                <div className="flex items-center">
                  <Image
                    src={row.profileImage}
                    alt={"ff"}
                    width={40}
                    height={40}
                    className="mr-4"
                  />

                  <p className="font-semibold">{row.name}</p>
                </div>
              </TableCell>

              {/* Status with dynamic background color */}
              <TableCell align="center">
                <span className={getStatusStyle(row.status)}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </TableCell>

              <TableCell align="center">
                <p>{row.email}</p>
              </TableCell>

              <TableCell align="center">
                <div className=" flex">
                  <Link href='/assignedtasks' className=" text-blue-500 flex">
                    tasks
                    <Image src={tasks} alt="" />
                  </Link>
                  {isManager && (
                    <button className=" text-red-500 flex">
                      remove
                      <Image src={remove} alt="" className=" " />
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

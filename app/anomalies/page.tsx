"use client";
import React, { useEffect, useState } from "react";
// import Header from "./components/header";
// import Notify from "./components/notify";
import axios from "axios";
import Anomaly from "@/components/anomaly";

export default function Pageanomalies() {
  interface Anomaly {
    _id: string;
    machine_id: string;
    status: string;
    warnings: string[];
  }

  const kpiAnomalies = [
    {
      id: 0,
      kpiName: "Stumping Press Efficiency",
      KpiInterval: "[1.64 - 2.48]",
      anomalies: [
        {
          anomId: 0,
          anomVal: 3.43,
          anomTimeStamp: "06/08/2016 08:30:00",
        },
      ],
    },
    {
      id: 1,
      kpiName: "Welding Robots Efficiency",
      KpiInterval: "[2.00 - 3.50]",
      anomalies: [
        {
          anomId: 1,
          anomVal: 4.12,
          anomTimeStamp: "07/09/2016 10:15:00",
        },
      ],
    },
    {
      id: 2,
      kpiName: "CNC Machines Utilisation",
      KpiInterval: "[0.75 - 1.25]",
      anomalies: [
        {
          anomId: 2,
          anomVal: 1.45,
          anomTimeStamp: "08/10/2016 12:45:00",
        },
      ],
    },
    {
      id: 3,
      kpiName: "Painting Robots Performance",
      KpiInterval: "[3.00 - 4.20]",
      anomalies: [
        {
          anomId: 3,
          anomVal: 4.35,
          anomTimeStamp: "09/11/2016 14:00:00",
        },
      ],
    },
    {
      id: 4,
      kpiName: "Assembly Line Speed",
      KpiInterval: "[5.50 - 7.00]",
      anomalies: [
        {
          anomId: 4,
          anomVal: 7.25,
          anomTimeStamp: "10/12/2016 16:30:00",
        },
      ],
    },
    {
      id: 5,
      kpiName: "Quality Control Defect Rate",
      KpiInterval: "[0.10 - 0.50]",
      anomalies: [
        {
          anomId: 5,
          anomVal: 0.75,
          anomTimeStamp: "11/01/2017 09:00:00",
        },
      ],
    },
    {
      id: 6,
      kpiName: "Testing Efficiency",
      KpiInterval: "[1.20 - 1.80]",
      anomalies: [
        {
          anomId: 6,
          anomVal: 2.05,
          anomTimeStamp: "12/02/2017 11:45:00",
        },
      ],
    },
  ];
  const [anomalies, setanomalies] = useState(kpiAnomalies);
  const [currentPage, setCurrentPage] = useState(1);
  const [anomaliesPerPage] = useState(5); // Number of anomalies to show per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //     const fetchanomalies = async () => {
  //         try {
  //             const response = await axios.get("http://localhost:4000/logs");
  //             setanomalies(response.data);
  //         } catch (err) {
  //             console.log(err);
  //             setError(err);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchanomalies();
  // }, []);

  // Calculate indexes for current anomalies
  const indexOfLastReport = currentPage * anomaliesPerPage;
  const indexOfFirstReport = indexOfLastReport - anomaliesPerPage;
  const currentanomalies = anomalies.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  // Calculate total pages
  const totalPages = Math.ceil(anomalies.length / anomaliesPerPage);

  // Pagination functions
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading anomalies.</p>
        ) : (
          currentanomalies.map((anomaly) => (
            <Anomaly
              kpiName={anomaly.kpiName}
              KpiInterval={anomaly.KpiInterval}
              annomalies={anomaly.anomalies}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center text-gray-500 mt-10">
        <p>
          Showing {indexOfFirstReport + 1} -{" "}
          {indexOfLastReport > anomalies.length
            ? anomalies.length
            : indexOfLastReport}{" "}
          of {anomalies.length}
        </p>
        <div className="flex items-center">
          {/* Previous Page Button */}
          <button
            onClick={prevPage}
            className="border-[1px] border-gray-300 p-2 rounded-tl-xl rounded-bl-xl"
            disabled={currentPage === 1}
          >
            <svg
              width="12"
              height="14"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 10.4064L2.83 6.00002L7.41 1.59362L6 0.240021L0 6.00002L6 11.76L7.41 10.4064Z"
                fill="#202224"
              />
            </svg>
          </button>

          {/* Next Page Button */}
          <button
            onClick={nextPage}
            className="border-[1px] border-gray-300 p-2 rounded-br-xl rounded-tr-xl"
            disabled={currentPage === totalPages}
          >
            <svg
              width="12"
              height="14"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path
                d="M7.41 10.4064L2.83 6.00002L7.41 1.59362L6 0.240021L0 6.00002L6 11.76L7.41 10.4064Z"
                fill="#202224"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

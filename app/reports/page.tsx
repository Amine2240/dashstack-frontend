"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Notify from "./components/notify";
import axios from "axios";
import { API_URL } from "@/lib/api";

export default function PageReports() {
    interface Report {
        _id: string;
        machine_id: string;
        status: string;
        warnings: string[];
    }

    const [reports, setReports] = useState<Report[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(5); // Number of reports to show per page
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${API_URL}/logs`);
                setReports(response.data);
            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Calculate indexes for current reports
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    // Calculate total pages
    const totalPages = Math.ceil(reports.length / reportsPerPage);

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
            <Header />
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading reports.</p>
                ) : (
                    currentReports.map((report) => (
                        <Notify
                            key={report._id}
                            machine_id={report.machine_id}
                            status={report.status}
                            warnings={report.warnings}
                        />
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center text-gray-500 mt-10">
                <p>
                    Showing {indexOfFirstReport + 1} -{" "}
                    {indexOfLastReport > reports.length ? reports.length : indexOfLastReport} of{" "}
                    {reports.length}
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

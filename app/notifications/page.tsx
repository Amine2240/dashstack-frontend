"use client";
import axios from "axios";
import Header from "./components/header";
import Notify from "./components/notify";
import { useState, useEffect } from "react";

import { API_URL } from "@/lib/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/notifications/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Sort notifications by updatedAt in descending order
        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setNotifications(sortedNotifications);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <section>
      {/* Notifications Header */}
      <Header
        selectedNotifications={selectedNotifications}
        setSelectedNotifications={setSelectedNotifications}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-md p-4">
        {currentNotifications.length > 0 ? (
          <div className="overflow-auto">
            {currentNotifications.map((notification, index) => (
              <Notify
                key={index}
                selectedNotifications={selectedNotifications}
                setSelectedNotifications={setSelectedNotifications}
                title={notification.title}
                machineId={notification.machineId}
                updatedAt={notification.updatedAt}
                message={notification.message}
                isRead={notification.isRead}
                id={notification._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No Notifications Found</p>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstNotification + 1} -{" "}
            {indexOfLastNotification > notifications.length
              ? notifications.length
              : indexOfLastNotification}{" "}
            of {notifications.length}
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-l-xl border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-black"
              }`}
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-r-xl border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-black"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

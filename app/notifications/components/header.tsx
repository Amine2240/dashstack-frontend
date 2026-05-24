"use client";
import Image from "next/image";
import axios from "axios";
import trash from "@/public/images/trash.svg";
import React from "react";

import { API_URL } from "@/lib/api";

interface HeaderProps {
  selectedNotifications: string[];
  notifications: { _id: string }[];
  setNotifications: React.Dispatch<React.SetStateAction<{ _id: string }[]>>;
  setSelectedNotifications: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Header({ selectedNotifications, notifications, setNotifications, setSelectedNotifications }: HeaderProps) {
  
  // Function to handle the removal of selected notifications
  const handleDeleteSelected = async () => {
    try {
      // Loop through selected notifications and send a DELETE request for each
      for (const notificationId of selectedNotifications) {

        await axios.delete(`${API_URL}/notifications/${notificationId}`);

      }

      // After successful deletion, update the front-end state by filtering out the deleted notifications
      const updatedNotifications = notifications.filter(
        (notification) => !selectedNotifications.includes(notification._id)
      );

      // Update the notifications state to remove the deleted notifications
      setNotifications(updatedNotifications);

      // Clear the selected notifications array
      setSelectedNotifications([]);
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  return (
    <div className="mb-14">
      <h1 className="h1 font-bold text-3xl mb-5">Notifications</h1>
      <div className="flex justify-between px-4 border border-gray-400 rounded-xl w-56 items-center text-center">
        <p className="text-[#5D2EEA] text-center translate-x-5">
          {selectedNotifications.length} Selected
        </p>
        <button
          className="flex items-center justify-center border-0 border-l-2 py-2 px-3"
          onClick={handleDeleteSelected} // Handle delete on button click
          disabled={selectedNotifications.length === 0} // Disable button if no notifications are selected
        >
          <Image
            height={50}
            width={50}
            src={trash}
            alt="trash"
            className="size-6"
          />
        </button>
      </div>
    </div>
  );
}

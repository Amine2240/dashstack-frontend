"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay, parseISO } from "date-fns";
import axios from "axios";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaRobot, FaCogs, FaIndustry, FaWrench } from "react-icons/fa";

import { API_URL } from "@/lib/api";

const ScheduleCalendar = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/ai/generate-task-schedule`
        );
        console.log("Chat response:", response.data);
        setScheduleData(response.data.schedule);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const events = scheduleData?.schedule?.map((event) => ({
    ...event,
    scheduled_date: parseISO(event.scheduled_date),
  }));

  const tileContent = ({ date }) => {
    const eventForDay = events?.find((event) =>
      isSameDay(event.scheduled_date, date)
    );

    return eventForDay ? (
      <div style={{ color: "#ff4500", fontWeight: "bold" }}>●</div>
    ) : null;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const eventsForSelectedDate = events?.filter((event) =>
    isSameDay(event.scheduled_date, selectedDate)
  );

  const getMachineIcon = (machineId) => {
    switch (machineId) {
      case "welding_robot_006":
        return <FaRobot className="text-blue-500 mr-2" size={24} />;
      case "agv_003":
        return <FaCogs className="text-green-500 mr-2" size={24} />;
      case "cnc_milling_004":
        return <FaIndustry className="text-purple-500 mr-2" size={24} />;
      case "leak_test_005":
        return <FaWrench className="text-red-500 mr-2" size={24} />;
      default:
        return <FaIndustry className="text-gray-500 mr-2" size={24} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="flex items-center mb-8">
        <AiOutlineCalendar size={40} className="text-blue-500 mr-3" />
        <h2 className="text-4xl font-bold text-gray-800">
          Maintenance Schedule Calendar
        </h2>
      </div>

      <div className="w-full lg:w-4/5 bg-white rounded-lg shadow-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <p>Loading schedule...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {" "}
            {/* Changed to a grid layout */}
            {/* Calendar Section */}
            <div>
              <Calendar
                onChange={handleDateClick}
                tileContent={tileContent}
                className="w-full h-auto shadow-md rounded-lg p-4"
              />
            </div>
            {/* Event Details Section */}
            <div>
              {selectedDate ? (
                <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Events for {format(selectedDate, "dd MMM yyyy")}
                  </h3>
                  {eventsForSelectedDate?.length ? (
                    eventsForSelectedDate.map((event, index) => (
                      <div
                        key={index}
                        className="p-4 mb-4 bg-white rounded-lg shadow-sm flex items-center"
                      >
                        {getMachineIcon(event.machine_id)}
                        <div>
                          <p className="text-lg font-bold text-gray-800">
                            {event.machine_id.replace(/_/g, " ").toUpperCase()}
                          </p>
                          <p className="text-md text-gray-600">
                            <strong>Action:</strong> {event.action}
                          </p>
                          <p className="text-md text-gray-600">
                            <strong>Priority:</strong> {event.priority}
                          </p>
                          <p className="text-md text-gray-600">
                            <strong>Worker Role:</strong> {event.worker_role}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 italic">
                      No events scheduled for this day.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 italic">
                  Please select a date to see events.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCalendar;

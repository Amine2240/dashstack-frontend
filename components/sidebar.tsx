"use client";
import React from "react";
import dashboardicon from "@/public/images/dashboardicon.svg";
import machinesicon from "@/public/images/machinesicon.svg";
import chaticon from "@/public/images/chaticon.svg";
import tasksicon from "@/public/images/tasksicon.svg";
import scheduelicon from "@/public/images/scheduelicon.svg";
import statistiquesicon from "@/public/images/statistiquesicon.svg";
import tablesicon from "@/public/images/tablesicon.svg";
import incomesicon from "@/public/images/incomesicon.svg";
import reportsicon from "@/public/images/reportsicon.svg";
import teamicon from "@/public/images/teamicon.svg";
import logouticon from "@/public/images/logouticon.svg";
import settingsicon from "@/public/images/settingsicon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

const Sidebar = () => {
  const navlinks = [
    {
      id: 0,
      text: "dashboard",
      path: "/dashboard",
      icon: dashboardicon,
    },
    {
      id: 1,
      text: "assigned Tasks",
      path: "/assignedtasks",
      icon: tasksicon,
    },
    {
      id: 2,
      text: "machines",
      path: "/machines",
      icon: machinesicon,
    },
    {
      id: 3,
      text: "chat with bots",
      path: "/chatwithbots",
      icon: chaticon,
    },
    {
      id: 4,
      text: "schedule",
      path: "/schedule",
      icon: scheduelicon,
    },
    {
      id: 5,
      text: "statistiques",
      path: "/statistiques",
      icon: statistiquesicon,
    },
    {
      id: 6,
      text: "tables",
      path: "/tables",
      icon: tablesicon,
    },
    {
      id: 7,
      text: "incomes",
      path: "/incomes",
      icon: incomesicon,
    },
    {
      id: 8,
      text: "reports",
      path: "/reports",
      icon: reportsicon,
    },
    {
      id: 9,
      text: "team",
      path: "/team",
      icon: teamicon,
    },
    {
      id: 10,
      text: "settings",
      path: "/settings",
      icon: settingsicon,
    },
    {
      id: 11,
      text: "logout",
      path: "/logout",
      icon: logouticon,
    },
  ];
  const pathname = usePathname();
  return (
    <ul className=" border-x-2 w-fit px-5 h-[89vh] mt-10">
      {navlinks.map((item) => (
        <li
          key={item.id}
          className={`flex w-fit rounded-lg p-3 cursor-pointer transition-colors duration-300 ${
            pathname === item.path
              ? "bg-purple-700 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Link href={`${item.path}`} className="flex items-center">
            <Image
              alt="icon"
              src={item.icon}
              width={24}
              height={24}
              className="mr-3"
            />
            <p>{item.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
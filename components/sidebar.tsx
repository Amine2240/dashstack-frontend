"use client";
import React from "react";
import dashboardicon from "@/public/images/dashboardicon.svg";
import machinesicon from "@/public/images/machinesicon.svg";
import chaticon from "@/public/images/chaticon.svg";
import tasksicon from "@/public/images/tasksicon.svg";
import scheduelicon from "@/public/images/scheduelicon.svg";
import statistiquesicon from "@/public/images/statistiquesicon.svg";
import incomesicon from "@/public/images/incomesicon.svg";
import reportsicon from "@/public/images/reportsicon.svg";
import teamicon from "@/public/images/teamicon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();

  const navlinks = [
    { id: 0, text: "Dashboard", path: "/dashboard", icon: dashboardicon },
    { id: 1, text: "Assigned Tasks", path: "/assignedtasks", icon: tasksicon },
    { id: 2, text: "Machines", path: "/machines", icon: machinesicon },
    { id: 3, text: "Chat with bots", path: "/chatwithbots", icon: chaticon },
    { id: 4, text: "Schedule", path: "/schedule", icon: scheduelicon },
    {
      id: 5,
      text: "Statistiques",
      path: "/statistiques",
      icon: statistiquesicon,
    },
    // { id: 6, text: "Tables", path: "/tables", icon: tablesicon },
    { id: 8, text: "Reports", path: "/reports", icon: reportsicon },
    { id: 9, text: "Team", path: "/team", icon: teamicon },
    {
      id: 10,
      text: "Data visualization",
      path: "/datavisualization",
      icon: incomesicon,
    },
  ];
  // const navlinksvisualization = [
  //   { id: 0, text: "stamping machine", path: "/datavisualization/dashboard", icon: dashboardicon },
  //   { id: 1, text: "Assigned Tasks", path: "/datavisualization/assignedtasks", icon: tasksicon },
  //   { id: 2, text: "Machines", path: "/datavisualization/machines", icon: machinesicon },
  //   { id: 3, text: "Chat with bots", path: "/datavisualization/chatwithbots", icon: chaticon },
  //   { id: 4, text: "Schedule", path: "/datavisualization/schedule", icon: scheduelicon },
  //   {
  //     id: 5,
  //     text: "Statistiques",
  //     path: "/datavisualization/statistiques",
  //     icon: statistiquesicon,
  //   },
  //   { id: 8, text: "Reports", path: "/datavisualization/reports", icon: reportsicon },
  //   { id: 9, text: "Team", path: "/datavisualization/team", icon: teamicon },
  // ];

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col overflow-y-auto border-r border-slate-200/80 bg-slate-950/95 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-200 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:sticky lg:top-[4.5rem] lg:h-[calc(100vh-4.5rem)]`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            AutoTrack
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            Command Center
          </p>
        </div>
        <button
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 lg:hidden"
          onClick={toggleSidebar}
        >
          <AiOutlineClose size={18} />
        </button>
      </div>
      <ul className="space-y-2 p-4">
        {navlinks.map((item) => (
          <li
            key={item.id}
            className={`overflow-hidden rounded-2xl transition duration-200 ${
              pathname === item.path ||
              (item.path === "/dashboard" && pathname === "/") // Check for '/' or '/dashboard'
                ? "bg-cyan-400/15 text-white ring-1 ring-cyan-300/20"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Link
              href={item.path}
              className="flex items-center w-full gap-3 px-4 py-3 text-[15px] font-medium transition"
            >
              <Image
                alt="icon"
                src={item.icon}
                width={24}
                height={24}
                className="opacity-90"
              />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto border-t border-white/10 p-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            Profile
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-slate-950">
              AT
            </div>
            <div>
              <p className="font-medium text-white">Factory Admin</p>
              <p className="text-sm text-white/55">Settings and preferences</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-white/60">
            <span>Theme</span>
            <span>Ocean</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

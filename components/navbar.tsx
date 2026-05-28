import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import axios from "axios";
import ProfilePage from "./profile/profilePage";
import anomay from "@/public/images/anomaly.svg";
import { API_URL } from "@/lib/api";

interface NavbarProps {
  toggleSidebar: () => void;
}

type NavbarUser = {
  userId: string;
  name: string;
  profileImage: string | null;
  role?: string;
};

const getAvatarFallback = (name?: string) => {
  const initials = (name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    initials,
    className:
      "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-slate-950",
  };
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<NavbarUser | null>(null);

  useEffect(() => {
    const storedUserRaw = localStorage.getItem("user");
    if (!storedUserRaw) {
      return;
    }

    const storedUser = JSON.parse(storedUserRaw);
    setToken(storedUser.token);
    setUser({
      userId: storedUser.userId,
      name: "Loading...",
      profileImage: null,
    });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.userId && token) {
        try {
          const response = await axios.get(
            `${API_URL}/users/users/${user.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          setUser((prevUser) => {
            if (!prevUser) {
              return prevUser;
            }

            return {
              ...prevUser,
              name: response.data.name,
              profileImage: response.data.profileImage || null,
              role: response.data.role || "",
            };
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user?.userId, token]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.userId && token) {
        try {
          const response = await axios.get(
            `${API_URL}/notifications/${user.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const count = response.data.length;
          setNotificationCount(count > 20 ? 20 : count);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [user?.userId, token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  const avatar = getAvatarFallback(user?.name);

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100/50 bg-gradient-to-r from-white via-slate-50/60 to-white/80 px-5 py-4 backdrop-blur-md shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      {/* Left Section: Menu & Branding */}
      <div className="flex items-center gap-4">
        <button
          className="rounded-full border border-slate-200/80 bg-white/60 p-2 text-slate-600 shadow-sm transition hover:border-cyan-300/80 hover:bg-white hover:text-cyan-600 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open navigation"
        >
          <FiMenu size={20} />
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 shadow-[0_8px_16px_rgba(34,211,238,0.2)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              AutoTrack
            </p>
            <p className="text-lg font-semibold tracking-tight text-slate-950">
              Command Center
            </p>
          </div>
        </Link>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications & Alerts */}
        <div className="relative flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/50 px-3 py-2 text-slate-600 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:bg-white/80 hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)]">
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-600 px-1 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(239,68,68,0.3)]">
              {notificationCount === 20 ? "+20" : notificationCount}
            </span>
          )}
          <Link
            href="/notifications"
            className="transition hover:text-cyan-600"
          >
            <FiBell size={20} />
          </Link>
          <div className="h-4 w-px bg-slate-200/50" />
          <Link
            href="/anomalies"
            className="transition hover:opacity-90 hover:text-cyan-600"
          >
            <Image src={anomay} alt="Anomalies" width={22} height={22} />
          </Link>
        </div>

        {/* Profile Button */}
        <button
          className="flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/60 px-2 py-2 pr-3 text-left shadow-sm transition hover:border-cyan-300/60 hover:bg-white hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)]"
          onClick={() => setShow(true)}
          aria-label="Open profile"
        >
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200/50 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(15,23,42,0.12)]">
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt="User Profile"
                width={44}
                height={44}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span
                className={`flex h-full w-full items-center justify-center rounded-full ${avatar.className}`}
              >
                {avatar.initials}
              </span>
            )}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {user?.name || "User Name"}
            </p>
            <p className="text-xs text-slate-500">{user?.role || "Member"}</p>
          </div>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-rose-200/60 bg-gradient-to-br from-rose-50 to-rose-100/50 px-4 py-2 text-sm font-medium text-rose-600 shadow-sm transition hover:border-rose-300/80 hover:bg-gradient-to-br hover:from-rose-100 hover:to-rose-200/50 hover:text-rose-700 hover:shadow-[0_12px_24px_rgba(239,68,68,0.15)]"
        >
          <FiLogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <ProfilePage show={show} setShow={setShow} handlelogout={handleLogout} />
    </nav>
  );
};

export default Navbar;

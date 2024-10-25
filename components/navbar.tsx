import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiMenu, FiBell, FiUser, FiLogOut } from "react-icons/fi"; // Icons for the menu, bell, user, and logout
import Link from "next/link";
import axios from "axios";
import ProfilePage from "./profile/profilePage";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch token and userId from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setToken(storedUser.token);

      setUser({
        userId: storedUser.userId,
        name: "Loading...",
        profileImage: null,
      }); // Initial state for profile
      setUser({
        userId: storedUser.userId,
        name: "Loading...",
        profileImage: null,
      }); // Initial state for profile
    }
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.userId && token) {
        try {
          const response = await axios.get(
            `http://localhost:4000/users/users/${user.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser((prevUser) => ({
            ...prevUser,
            name: response.data.name,
            profileImage: response.data.profileImage || null, // Use a default image if none available
            role: response.data.role || "",
          }));
          console.log("rrrrrrrrrrrr : ", user);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    if (user?.userId) {
      fetchUserProfile();
    }
  }, [user?.userId, token]);

  // Fetch notifications count from the server
  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.userId && token) {
        try {
          const response = await axios.get(
            `http://localhost:4000/notifications/${user.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const count = response.data.length;

          // If notifications are more than 20, set it to "+20"
          setNotificationCount(count > 20 ? 20 : count);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [user?.userId, token]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <nav className="flex justify-between lg:pl-19 items-center p-5 bg-white relative z-10">
      <div className="flex items-center">
        {/* Hamburger Menu for mobile view */}
        <button className="lg:hidden mr-4" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <Link href="/">
          <label htmlFor="" className="text-3xl font-bold cursor-pointer">
            <p>
              <span className="text-purple-500">Auto</span>Track
            </p>
          </label>
        </Link>
      </div>

      <div className="flex items-center space-x-5">
        {/* Notifications */}
        <div className="relative flex">
          {notificationCount > 0 && (
            <p className="bg-red-500 rounded-full text-center text-sm text-white absolute -right-2 top-0 z-10 px-2">
              {notificationCount === 20 ? "+20" : notificationCount}
            </p>
          )}
          <Link href={"/notifications"}>
            <FiBell size={30} className="text-gray-700" />
          </Link>
          <Link href={"/anomalies"}>
            <FiBell size={30} className="text-red-700" />
          </Link>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShow(true)}
        >
          <div className="bg-gray-300 rounded-full overflow-hidden h-[50px] w-[50px] flex items-center justify-center mr-3">
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt="User Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <FiUser size={30} className="text-white" />
            )}
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold">{user?.name || "User Name"}</p>
            <p>{user?.role} </p>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-600"
        >
          <FiLogOut size={24} className="mr-1" />
          <span>Logout</span>
        </button>
      </div>
      <ProfilePage show={show} setShow={setShow} handlelogout={handleLogout} />
    </nav>
  );
};

export default Navbar;

"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "./context/auth";
import LoginPage from "./auth/login/page";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // Import spinner
<<<<<<< HEAD
import { messaging, getToken } from "@/firebase"; // Import Firebase config
import axios from "axios"; // Axios to send the FCM token to the server
=======
import ProfilePage from "@/components/profile/profilePage";
>>>>>>> d1fc09f0d16f835fa9acd6167603f324a6f307c1

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to store the user login status
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for verification
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar open state

  useEffect(() => {
    const token = localStorage.getItem("user");
    setUser(!!token);
    setLoading(false); // Stop loading after verification
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // FCM token retrieval and service worker registration
  useEffect(() => {
    if (typeof window !== "undefined" && messaging) {
      const getAndSendFCMToken = async () => {
        try {
          // Request permission from the user to show notifications
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BM7sWd8vOAWim376TRmAlK1HyrHX5C93jjUL_W-ptI3jMcz0FkItNroYU5BHxh-r-IqN9XLyIh8Kqe_RAu98QyA",
          });

          if (currentToken) {
            const userId = JSON.parse(localStorage.getItem("user")).userId;
            const token = JSON.parse(localStorage.getItem("user")).token;

            // Send the FCM token to the backend to store it for sending notifications
            await axios.put(
              `http://localhost:4000/users/${userId}`,
              { notificationsToken: currentToken },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("FCM Token successfully sent to server");
          } else {
            console.log(
              "No FCM token available. Request permission to generate one."
            );
          }
        } catch (err) {
          console.error("Error retrieving FCM token:", err);
        }
      };

      // Register service worker and get the FCM token
      getAndSendFCMToken();
    }

    // Register the service worker for Firebase Messaging
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      });
    }
  }, []);

  if (loading) {
    // Display spinner while verifying login
    return <div className="flex justify-center items-center h-screen"></div>;
  }

  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <AuthProvider>
          {user ? (
            <>
              <Navbar toggleSidebar={toggleSidebar} />

              <div className="flex flex-1 overflow-hidden">
                <Sidebar
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                
                

                {/* Main Content Area */}
                <main className="flex-1 p-5 overflow-auto">{children}</main>
              </div>
            </>
          ) : (
            <LoginPage />
          )}
        </AuthProvider>
      </body>
    </html>
  );
}

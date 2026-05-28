"use client";

import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "./context/auth";
import LoginPage from "./auth/login/page";
import { useEffect, useState } from "react";
import { messaging, getToken } from "@/firebase"; // Import Firebase config
import axios from "axios"; // Axios to send the FCM token to the server
import { API_URL } from "@/lib/api";

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
  const pathname = usePathname();
  const isPublicRoute = pathname === "/" || pathname?.startsWith("/auth");

  useEffect(() => {
    const token = localStorage.getItem("user");
    setUser(!!token);
    setLoading(false); // Stop loading after verification
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // FCM token retrieval and service worker registration
  useEffect(() => {
    if (typeof window !== "undefined" && messaging) {
      const activeMessaging = messaging;
      const getAndSendFCMToken = async () => {
        try {
          // Request permission from the user to show notifications
          const currentToken = await getToken(activeMessaging, {
            vapidKey:
              "BM7sWd8vOAWim376TRmAlK1HyrHX5C93jjUL_W-ptI3jMcz0FkItNroYU5BHxh-r-IqN9XLyIh8Kqe_RAu98QyA",
          });

          if (currentToken) {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
              return;
            }

            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser.userId;
            const token = parsedUser.token;

            // Send the FCM token to the backend to store it for sending notifications
            await axios.put(
              `${API_URL}/users/${userId}`,
              { notificationsToken: currentToken },
              { headers: { Authorization: `Bearer ${token}` } },
            );
            console.log("FCM Token successfully sent to server");
          } else {
            console.log(
              "No FCM token available. Request permission to generate one.",
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
              registration.scope,
            );
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      });
    }
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
        >
          <div className="content-shell flex min-h-screen items-center justify-center px-6">
            <div className="surface w-full max-w-md p-6">
              <div className="space-y-4">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-8 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="skeleton h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-3 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <AuthProvider>
          {isPublicRoute ? (
            children
          ) : user ? (
            <>
              <Navbar toggleSidebar={toggleSidebar} />

              <div className="flex min-h-[calc(100vh-4.5rem)] flex-1 overflow-hidden">
                <Sidebar
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />

                {/* Main Content Area */}
                <main className="content-shell flex-1 overflow-auto p-5 lg:ml-72">
                  {children}
                </main>
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

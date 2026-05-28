"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logout from "@/public/images/logouticon.svg";
import uploadimg from "@/public/images/uploadimg.svg";
import ProfileInfo from "./profileinfo";
import axios from "axios";
import { API_URL } from "@/lib/api";

type ProfileUser = {
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  profileImage?: string | null;
};

type ProfilePageProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  handlelogout: () => void;
};

const getAvatarFallback = (name?: string) => {
  const initials = (name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const palette = [
    "from-cyan-400 to-blue-600",
    "from-emerald-400 to-teal-600",
    "from-amber-300 to-orange-500",
  ];
  const selected = palette[(name?.length || 0) % palette.length];

  return { initials, selected };
};

export default function ProfilePage({
  show,
  setShow,
  handlelogout,
}: ProfilePageProps) {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Fetch user info from localStorage and API
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      const userInfo = storedUser ? JSON.parse(storedUser) : null;
      if (!userInfo) {
        setError("User not found in localStorage.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${API_URL}/users/users/${userInfo.userId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          },
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("attachment", selectedFile);

    setUploading(true);

    try {
      const response = await axios.post(`${API_URL}/upload/any`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const fileUrl = response.data.fileUrl;
      const storedUser = localStorage.getItem("user");
      const userInfo = storedUser ? JSON.parse(storedUser) : null;

      await axios.put(
        `${API_URL}/users/users/${userInfo?.userId}`,
        { profileImage: fileUrl },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      setUploadedImageUrl(fileUrl);
      setUser((prevUser) =>
        prevUser ? { ...prevUser, profileImage: fileUrl } : prevUser,
      );
      console.log("File uploaded successfully:", fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <div className={`fixed inset-0 z-40 ${show ? "block" : "hidden"}`}>
          <button
            type="button"
            aria-label="Close profile drawer"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            onClick={() => setShow(false)}
          />
        </div>
        <aside
          className={`fixed right-0 top-0 z-50 flex h-screen w-[430px] flex-col overflow-hidden border-l border-white/10 bg-slate-950 text-white shadow-[0_30px_100px_rgba(15,23,42,0.35)] ${show ? "block" : "hidden"}`}
        >
          <div className="border-b border-white/10 px-6 py-5">
            <div className="skeleton h-4 w-20 rounded-full bg-white/10" />
            <div className="mt-4 space-y-3">
              <div className="skeleton h-8 w-44 rounded-xl bg-white/10" />
              <div className="skeleton h-4 w-64 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6 px-6 py-6">
            <div className="flex justify-center">
              <div className="skeleton size-44 rounded-full bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="skeleton h-20 rounded-2xl bg-white/10" />
              <div className="skeleton h-20 rounded-2xl bg-white/10" />
            </div>
            <div className="space-y-3">
              <div className="skeleton h-4 w-full rounded-full bg-white/10" />
              <div className="skeleton h-4 w-5/6 rounded-full bg-white/10" />
              <div className="skeleton h-4 w-4/5 rounded-full bg-white/10" />
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <div className={`fixed inset-0 z-40 ${show ? "block" : "hidden"}`}>
          <button
            type="button"
            aria-label="Close profile drawer"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            onClick={() => setShow(false)}
          />
        </div>
        <aside
          className={`fixed right-0 top-0 z-50 flex h-screen w-[430px] flex-col overflow-hidden border-l border-slate-200/80 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.20)] ${show ? "block" : "hidden"}`}
        >
          <div className="border-b border-slate-200/80 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-700 px-6 py-5 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">
              Profile unavailable
            </p>
            <h1 className="mt-3 text-2xl font-semibold">
              Could not load profile
            </h1>
            <p className="mt-2 text-sm text-white/75">{error}</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="rounded-full bg-rose-50 p-5 text-rose-500 shadow-sm">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 9v4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M12 17h.01"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.28em] text-slate-400">
              We hit a loading issue
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary mt-6"
            >
              Retry
            </button>
          </div>
        </aside>
      </>
    );
  }

  // Success state
  return (
    <>
      <div className={`fixed inset-0 z-40 ${show ? "block" : "hidden"}`}>
        <button
          type="button"
          aria-label="Close profile drawer"
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
          onClick={() => setShow(false)}
        />
      </div>
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[430px] flex-col overflow-hidden border-l border-slate-200/80 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.2)] ${show ? "block" : "hidden"}`}
      >
        <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-700 px-6 py-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_30%)]" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/90">
                Profile
              </p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                {user?.name || "User Name"}
              </h1>
              <p className="mt-2 text-sm text-white/75">
                {user?.role || "Member"} workspace access
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="rounded-full border border-white/15 bg-white/10 p-2 text-white/90 transition hover:bg-white/15"
              aria-label="Close profile drawer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="m6 6 12 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                {user?.profileImage || uploadedImageUrl ? (
                  <Image
                    src={user?.profileImage || uploadedImageUrl}
                    alt="profile"
                    width={112}
                    height={112}
                    className="size-28 rounded-full object-cover ring-4 ring-white"
                  />
                ) : (
                  <div
                    className={`flex size-28 items-center justify-center rounded-full bg-gradient-to-br text-3xl font-semibold text-slate-950 ring-4 ring-white ${getAvatarFallback(user?.name).selected}`}
                  >
                    {getAvatarFallback(user?.name).initials}
                  </div>
                )}

                <input
                  type="file"
                  name="uploadbtn"
                  id="fileInput"
                  className="sr-only"
                  aria-label="Upload profile image"
                  onChange={handleImageChange}
                />
                <button
                  onClick={() => document.getElementById("fileInput")?.click()}
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full border border-white bg-slate-950 text-white shadow-lg transition hover:scale-105"
                  aria-label="Choose profile photo"
                >
                  <Image src={uploadimg} alt="upload" className="h-5 w-5" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                  {user?.role || "Member"}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Keep your profile, role, and contact details current.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={handleUpload}
                    type="button"
                    disabled={uploading}
                    className="btn btn-primary px-4 py-2 text-xs"
                  >
                    {uploading ? "Uploading..." : "Upload photo"}
                  </button>
                  <button
                    type="button"
                    onClick={handlelogout}
                    className="btn btn-secondary px-4 py-2 text-xs"
                  >
                    <Image src={logout} alt="logout" width={14} height={14} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ProfileInfo
            email={user?.email || "-"}
            phone={user?.phoneNumber || ""}
            name={user?.name || "User Name"}
            role={user?.role || "Member"}
          />
        </div>
      </aside>
    </>
  );
}

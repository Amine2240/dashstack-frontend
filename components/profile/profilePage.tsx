"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logout from "@/public/images/logouticon.svg";
import ProfileInfo from "./profileinfo";
import axios from "axios";
import { FiUser } from "react-icons/fi";
import uploadimg from "@/public/images/uploadimg.svg";
import { API_URL } from "@/lib/api";

export default function ProfilePage({ show, setShow, handlelogout }) {
  const [user, setUser] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Fetch user info from localStorage and API
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
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
          }
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
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
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
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("attachment", selectedFile);

    setUploading(true);

    try {
      const response = await axios.post(
        `${API_URL}/upload/any`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fileUrl = response.data.fileUrl;
      const responseuser = await axios.put(
        `${API_URL}/users/users/${
          JSON.parse(localStorage.getItem("user")).userId
        }`,
        { profileImage: fileUrl },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setUploadedImageUrl(fileUrl); // Store the uploaded image URL
      setUser((prevUser) => ({ ...prevUser, profileImage: fileUrl }));
      console.log("File uploaded successfully:", fileUrl);

      setMessage(`File uploaded successfully: ${response.data.fileUrl}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Conditional rendering
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <section
      className={`fixed z-50 right-0 top-0 h-full bg-white w-[350px] flex flex-col justify-evenly ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-start p-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:cursor-pointer"
          onClick={() => setShow(false)}
        >
          <path
            d="M2.66732 23.6667L0.333984 21.3333L9.66732 12L0.333984 2.66668L2.66732 0.333344L12.0007 9.66668L21.334 0.333344L23.6673 2.66668L14.334 12L23.6673 21.3333L21.334 23.6667L12.0007 14.3333L2.66732 23.6667Z"
            fill="#333333"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className=" relative">
          {user.profileImage || uploadedImageUrl ? (
            <Image
              src={user.profileImage || uploadedImageUrl} // just refresh after selecting the img
              alt="profile"
              width={100}
              height={100}
              className="rounded-full size-52 object-cover "
            />
          ) : (
            <FiUser
              size={70}
              className="text-white bg-gray-400 rounded-full p-2"
            />
          )}
          <input
            type="file"
            name="uploadbtn"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            onClick={() => {
              // handleUpload();
              document.getElementById("fileInput")?.click();
            }}
            type="button"
            // onClick={handleUpload}
            // disabled={uploadimg}
            className=" absolute right-0 bottom-0 z-[90] cursor-pointer"
          >
            <Image src={uploadimg} alt="upload" className=" z-[90]" />
          </button>
          <button onClick={handleUpload} type="button" disabled={uploading}>
            Upload
          </button>
        </div>
        <h1 className="text-2xl font-bold uppercase">{user.name}</h1>
        <div
          className={`font-semibold text-xl px-4 py-1 rounded-xl border-[1px] ${
            user.role === "manager"
              ? "border-[#BE7F44] bg-[#F7DFC8] text-[#BE7F44]"
              : "border-[#3E50BC] text-[#3E50BC] bg-[#E3E6FA]"
          }  text-center uppercase`}
        >
          {user.role}
        </div>
        '
      </div>

      <ProfileInfo
        email={user.email}
        phone={user.phoneNumber}
        name={user.name}
        role={user.role}
      />

      <div className="flex justify-center">
        <button
          onClick={handlelogout}
          className="flex items-center gap-4 font-bold "
        >
          <p>Log Out</p>
          <Image src={logout} alt="logout" width={20} height={20} />
        </button>
      </div>
    </section>
  );
}

"use client";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // Errors from react-hook-form
  } = useForm<FormValues>();

  const [loginError, setLoginError] = useState(""); // Renamed state variable
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setLoginError(""); // Reset login error on each submit
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        data
      );
      const user = {
        token: response.data.accessToken.token,
        userId: response.data.userId,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(response.data.accessToken.token);

      toast.success("Logged in successfully!", { position: "top-right" });

      router.push("/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      reset();
    } catch (error: any) {
      setLoginError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />

      {/* Left Section for Welcome Message */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gradient-to-r from-purple-600 to-blue-400 p-16 text-white">
        <h1 className="text-6xl font-extrabold mb-4">Welcome To</h1>
        <h2 className="text-5xl font-extrabold mb-4">
          <span className="text-purple-200">Auto </span>Tracks
        </h2>
        <h3 className="text-4xl font-bold mb-6">Cars Factory</h3>
        <p className="text-lg leading-relaxed">
          Auto Tracks is the leading solution for automating and managing
          industrial car manufacturing processes. Our platform ensures precise
          control and monitoring of operations, maximizing efficiency and
          productivity.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          From welding and stamping to painting and final assembly, Auto Tracks
          helps manufacturers deliver top-quality vehicles while optimizing
          resource consumption. Join us and drive your factory into the future
          of automation.
        </p>
      </div>

      {/* Right Section for Login Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-16">
        <form
          className="flex flex-col gap-6 bg-white rounded-2xl shadow-2xl px-16 py-12 w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-5xl font-bold text-center text-gray-800">
            Login
          </h1>
          <p className="text-center text-gray-500 text-lg mb-4">
            Please enter your information to continue
          </p>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email:
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email (ex: younes@gmail.com)"
              className="border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-100 shadow-sm"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-gray-700 font-semibold">
                Password:
              </label>
              <Link href="/forgotpassword" className="text-purple-600 text-sm">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Password (ex: younes123)"
              className="border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-gray-100 shadow-sm"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="form-checkbox h-5 w-5 text-purple-600"
            />
            <label htmlFor="terms" className="text-gray-700">
              I accept terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-purple-700 text-white font-semibold rounded-lg py-4 mt-4 w-full text-lg transition duration-300 hover:bg-purple-800 ${
              loading && "cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {loginError && (
            <span className="text-red-500 text-center mt-3">{loginError}</span>
          )}
        </form>
      </div>
    </div>
  );
}

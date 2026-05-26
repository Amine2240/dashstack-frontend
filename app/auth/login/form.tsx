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
      const response = await axios.post(`${API_URL}/auth/login`, data);
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
    } catch (_error) {
      console.error("Login error:", _error);
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
      <div
        className="hidden lg:flex flex-col justify-center w-1/2 p-16 text-white relative overflow-hidden border-r border-white/5"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(93, 46, 234, 0.22) 0%, transparent 50%),
            radial-gradient(circle at 85% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0e17 0%, #06090e 100%)
          `,
        }}
      >
        {/* Local decorative grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Local subtle floating orb */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Welcome To
          </h1>
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-cyan-400">Auto</span>
            <span className="text-purple-400">Tracks</span>
          </h2>
          <h3 className="text-3xl font-bold mb-6 text-white/80">
            Cars Factory
          </h3>

          <p className="text-lg leading-relaxed text-white/70">
            AutoTracks is the leading solution for automating and managing
            industrial car manufacturing processes. Our platform ensures precise
            control and monitoring of operations, maximizing efficiency and
            productivity.
          </p>
          <p className="text-lg leading-relaxed text-white/70 mt-4">
            From welding and stamping to painting and final assembly, AutoTracks
            helps manufacturers deliver top-quality vehicles while optimizing
            resource consumption. Join us and drive your factory into the future
            of automation.
          </p>
        </div>
      </div>

      {/* Right Section for Login Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-16">
        <form
          className="surface flex flex-col gap-6 px-10 py-8 w-full max-w-lg"
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
              className="input"
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
              className="input"
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
            className={`btn btn-primary w-full ${loading ? "cursor-not-allowed" : ""}`}
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

"use client";
import axios from "axios";
import "./form.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/auth";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      console.log("submitted", data);
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        data,
      );
      localStorage.setItem("user", response.data);
      console.log(response.data);
      setUser(response.data);
      reset();
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="surface flex flex-col gap-6 px-10 py-8 w-full max-w-lg z-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-5xl font-bold text-center text-gray-800">
        Sign Up
      </h1>
      <p className="text-center text-gray-500 text-lg mb-4">
        Create an account to continue
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
        <label htmlFor="password" className="text-gray-700 font-semibold">
          Password:
        </label>
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
          className="form-checkbox h-5 w-5 text-cyan-600"
          required
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
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      {/* Error Message */}
      {error && (
        <span className="text-red-500 text-center mt-3">{error}</span>
      )}

      {/* Already have an account */}
      <p className="text-gray-500 text-center mt-2">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-cyan-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

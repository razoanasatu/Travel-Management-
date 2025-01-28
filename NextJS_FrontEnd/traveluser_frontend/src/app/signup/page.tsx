"use client";

import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { useState } from "react";
import SignUpHero from "../components/SignUpHero";
export default function SignUp() {
  // State to store form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, password);
    // Simple validation for matching passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Prepare form data to be sent to the backend
    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://your-backend-api-url.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful sign-up (e.g., redirect user)
        alert("Account created successfully!");
        // You can redirect the user to the login page or another route here
        window.location.href = "/login"; // Example redirect to login page
      } else {
        // Handle errors from backend (e.g., user already exists)
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SignUpHero />

      <Footer />
    </div>
  );
}

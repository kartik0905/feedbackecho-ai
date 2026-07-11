import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast } from "../components/ui";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setToastMsg(data.error);
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await fetch("http://localhost:3000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setToastMsg(data.error);
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md border dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
            Sign In
          </h1>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <Input
              label="University Email (@geu.ac.in)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full">Login</Button>
          </form>

          <div className="flex items-center justify-center my-4">
            <div className="border-t w-full dark:border-gray-600"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400">OR</span>
            <div className="border-t w-full dark:border-gray-600"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setToastMsg("Google Login Failed")}
            />
          </div>
        </div>
        <Toast message={toastMsg} isVisible={!!toastMsg} />
      </main>
      <Footer />
    </div>
  );
}

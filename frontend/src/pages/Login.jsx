import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast } from "../components/ui";
import { api } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) { setIsError(true); setToastMsg(error.message); setTimeout(() => setToastMsg(""), 3000); } finally { setSubmitting(false); }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await api("/auth/google", { method: "POST", body: JSON.stringify({ credential: credentialResponse.credential }) });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) { setIsError(true); setToastMsg(error.message); setTimeout(() => setToastMsg(""), 3000); }
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
              onChange={(e) => setEmail(e.target.value)} required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
            <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Signing in…" : "Login"}</Button>
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
        <Toast message={toastMsg} variant={isError ? "error" : "success"} isVisible={!!toastMsg} />
      </main>
      <Footer />
    </div>
  );
}

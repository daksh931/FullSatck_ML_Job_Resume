import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null)
      // console.log(email, password);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }
        // ,{withCredentials: true, }
    );
      // console.log(response);
      localStorage.setItem("token", response.data.token); // Save JWT token in localStorage
      localStorage.setItem("user", email); 
      toast.success("🎉 Login Successful!", {
        description: "You have successfully Logged in.",
      });
      navigate("/welcome"); // Redirect to user profile page

    } catch (error) {
      toast.error("Login Failed!", {
        description: "Invalid Credentials or user not exist.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg transition">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? 
          <button onClick={() => navigate("/signup")} className="text-blue-500 hover:underline ml-1">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

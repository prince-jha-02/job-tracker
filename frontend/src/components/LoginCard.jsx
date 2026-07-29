import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/auth.context";

function LoginCard() {
  const navigate = useNavigate();
  const { token, setToken, backendUrl } = useAuth();
  
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign up") {
        const response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account Created");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome Back!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7 border border-gray-100">
        
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {currentState}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            {currentState === "Login"
              ? "Welcome back to JobTracker"
              : "Create your JobTracker account"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-3.5">
          
          {currentState === "Sign up" && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {currentState === "Login" && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              {currentState === "Login" ? "Sign In" : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            {currentState === "Login" ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setCurrentState(currentState === "Login" ? "Sign up" : "Login")}
              className="ml-1.5 font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              {currentState === "Login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
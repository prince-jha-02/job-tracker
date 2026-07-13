import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/auth.context";

function Navbar({ setSidebarOpen, showSidebar }) {
  const navigate = useNavigate();

  const { token, setToken } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-white">

      {/* Left */}

      <div className="flex items-center  ">

        {showSidebar && (
          <Menu
            size={24}
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        )}

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          JobTracker
        </Link>

        

      </div>

      {/* middle */}
        <div className="hidden md:flex  gap-10">

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/features">
            Features
          </NavLink>

        </div>

      


      {/* Right */}

      <div className="relative">

        <img
          src={assets.profile_icon}
          alt=""
          className="w-8 cursor-pointer"
          onClick={() => {
            if (!token) {
              navigate("/");
            } else {
              setProfileOpen(!profileOpen);
            }
          }}
        />

        {token && profileOpen && (

          <div className="absolute right-0 mt-3 w-36 bg-white shadow-lg rounded-lg">

            <p
              onClick={logout}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </p>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
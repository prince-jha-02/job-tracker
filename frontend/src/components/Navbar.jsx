import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// Added X and MoreVertical icons for the mobile menu
import { Menu, X, MoreVertical } from "lucide-react"; 
import { assets } from "../assets/assets";
import { useAuth } from "../context/auth.context";

function Navbar({ setSidebarOpen, showSidebar }) {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile links

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    // Added relative positioning to the nav so the dropdown attaches to it
    <nav className="relative bg-white shadow z-50">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Left */}
        <div className="flex items-center">
          {showSidebar && (
            <Menu
              size={24}
              className="md:hidden cursor-pointer mr-3 text-gray-700"
              onClick={() => setSidebarOpen(true)}
            />
          )}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            JobTracker
          </Link>
        </div>

        {/* Middle (Desktop only) */}
        <div className="hidden md:flex gap-10 font-medium text-gray-600">
          <NavLink to="/about" className="hover:text-blue-600 transition-colors">
            About
          </NavLink>
          <NavLink to="/features" className="hover:text-blue-600 transition-colors">
            Features
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          
          {/* Profile Container */}
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-8 h-8 cursor-pointer rounded-full border border-gray-200"
              onClick={() => {
                if (!token) {
                  navigate("/");
                } else {
                  setProfileOpen(!profileOpen);
                  setMobileMenuOpen(false); // Close mobile menu if profile opens
                }
              }}
            />

            {token && profileOpen && (
              <div className="absolute right-0 mt-3 w-36 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
                <p
                  onClick={logout}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer m-0 font-medium text-sm transition-colors"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle (Hidden on Desktop) */}
          <button 
            className="md:hidden text-gray-700 p-1"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setProfileOpen(false); // Close profile menu if mobile menu opens
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg flex flex-col">
          <NavLink 
            to="/about" 
            className="px-6 py-4 border-b border-gray-50 text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)} // Auto-close on click
          >
            About
          </NavLink>
          <NavLink 
            to="/features" 
            className="px-6 py-4 text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)} // Auto-close on click
          >
            Features
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
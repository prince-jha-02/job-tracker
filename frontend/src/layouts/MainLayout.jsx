import { useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  // Routes that should NOT have a sidebar
  const publicRoutes = [
    "/",
    "/about",
    "/features",
  ];

  const showSidebar = !publicRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        setSidebarOpen={setSidebarOpen}
        showSidebar={showSidebar}
      />

      <div className="flex">
        {showSidebar && (
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ChartColumn,
  X,
} from "lucide-react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
    ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Desktop */}

      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r shadow-sm p-5">

        <NavLink
          to="/dashboard"
          className={linkStyle}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className={linkStyle}
        >
          <BriefcaseBusiness size={20} />
          Applications
        </NavLink>

        <NavLink
          to="/analytics"
          className={linkStyle}
        >
          <ChartColumn size={20} />
          Analytics
        </NavLink>

      </aside>

      {/* Mobile */}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg transition-transform duration-300 md:hidden
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="font-semibold">
            Menu
          </h2>

          <X
            className="cursor-pointer"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

        </div>

        <nav className="flex flex-col gap-2 p-3">

          <NavLink
            to="/dashboard"
            className={linkStyle}
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            className={linkStyle}
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <BriefcaseBusiness size={20} />
            Applications
          </NavLink>

          <NavLink
            to="/analytics"
            className={linkStyle}
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <ChartColumn size={20} />
            Analytics
          </NavLink>

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;
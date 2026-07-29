import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./auth.context";

const DashboardContext = createContext();

function DashboardProvider({ children }) {

  const { backendUrl, token } = useAuth();

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    oa: 0,
    interview: 0,
    rejected: 0,
    offer: 0,
    ghosted: 0,
    interviewRate: 0,
    offerRate: 0,
  });

  const [analytics, setAnalytics] = useState({
    statusStats: [],
    sourceStats: [],
    monthlyApplications: [],
    topCompanies: [],
    topLocations: [],
    topRoles: [],
    sourceSuccess: [],
    salaryStats: {
      averageSalary: 0,
      highestSalary: 0,
      lowestSalary: 0,
    },
    insights: {
      thisMonthApplications: 0,
      lastMonthApplications: 0,
      monthlyGrowth: 0,
      pendingApplications: 0,
      mostAppliedRole: null,
      topLocation: null,
      topCompany: null,
      bestSource: null,
    },
  });

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const getDashboardStats = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        backendUrl + "/api/applications/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        setStats(response.data.stats);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  const getAnalytics = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        backendUrl + "/api/applications/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        setAnalytics(response.data.analytics);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(
       backendUrl + "/api/applications/upcoming-events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    
    if (response.data.success) {
      setUpcomingEvents(response.data.events);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (

    <DashboardContext.Provider
      value={{

        loading,

        stats,

        analytics,

        getDashboardStats,

        getAnalytics,

        getUpcomingEvents,
        upcomingEvents,

      }}
    >

      {children}

    </DashboardContext.Provider>

  );

}

export default DashboardProvider;

export const useDashboard = () => {

  return useContext(DashboardContext);

};
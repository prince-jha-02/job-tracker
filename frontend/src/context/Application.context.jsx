import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useAuth } from "./auth.context";

const AppContext = createContext();

function ApplicationProvider({ children }) {

  const { backendUrl, token } = useAuth();

  const [applications, setApplications] = useState([]);



  const getApplications = async () => {

    try {

      const response = await axios.get(
        backendUrl + "/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setApplications(response.data.applications);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }

  };

  const createApplication = async (applicationData) => {
    try {

      const response = await axios.post(
        backendUrl + "/api/applications/create",
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        toast.success(response.data.message);

        // Add the newly created application at the top
        setApplications((prev) => [
          response.data.application,
          ...prev,
        ]);

        return true;

      } else {

        toast.error(response.data.message);
        return false;

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

      return false;

    }
  };
  const deleteApplication = async (id) => {
    try {

      const response = await axios.delete(
        `${backendUrl}/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        setApplications((prev) =>
          prev.filter((job) => job._id !== id)
        );

        toast.success(response.data.message);

        return true;

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

      return false;

    }
  };

  const updateApplication = async (id, updatedData) => {
    try {

      const response = await axios.put(
        `${backendUrl}/api/applications/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        setApplications((prev) =>
          prev.map((job) =>
            job._id === id
              ? response.data.application
              : job
          )
        );

        toast.success(response.data.message);

        return true;

      } else {

        toast.error(response.data.message);
        return false;

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

      return false;

    }
  };


  const updateEvent = async (id, updatedData) => {
     console.log("Frontend: getUpcomingEvents called");
    try {

      const response = await axios.patch(
        `${backendUrl}/api/applications/${id}/event`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        setApplications((prev) =>
          prev.map((job) =>
            job._id === id
              ? response.data.application
              : job
          )
        );

        toast.success(response.data.message);

        return true;

      } else {

        toast.error(response.data.message);
        return false;

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

      return false;

    }
  };
  const value = {
    applications,
    setApplications,
    getApplications,
    createApplication,
    deleteApplication,
    updateApplication,
    updateEvent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default ApplicationProvider;

export const useApplication = () => {
  return useContext(AppContext);
};
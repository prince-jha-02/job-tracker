import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
  localStorage.getItem("token") || ""
);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
  const value = {
    token,
    setToken,
    backendUrl
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
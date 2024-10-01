import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("verifying...");
    const token = localStorage.getItem("token");
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL +
              "/api/auth/verify-token",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser(response.data.user);
        } catch (error) {
          console.log(error);
          localStorage.removeItem("token");
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post(
      import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + "/api/auth/login",
      credentials
    );
    setUser(response.data.user);
    localStorage.setItem("token", response.data.token);
  };

  const register = async (data) => {
    await axios.post(
      import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + "/api/auth/register",
      data
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL}/api/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { success: true, users: data.users };
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, fetchUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

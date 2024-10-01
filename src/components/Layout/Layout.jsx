import React from "react";
import Header from "../Header/Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (location.pathname != "/login" && location.pathname != "/register") {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;

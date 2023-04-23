import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setTimeout(() => {
      navigate("/login");
    }, 1500); // 1.5 seconds delay before redirecting to the login page
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;

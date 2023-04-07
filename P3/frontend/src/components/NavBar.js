import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in by checking if the access token exists in the local storage
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <nav>
      {isLoggedIn ? (
        <>
          {/* Render the navigation items for logged-in users */}
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          {/* Add more navigation items as needed */}
        </>
      ) : (
        <>
          {/* Render the navigation items for non-logged-in users */}
          {location.pathname !== '/login' && <Link to="/login">Login</Link>}
          {location.pathname !== '/signup' && <Link to="/signup">Signup</Link>}
        </>
      )}
    </nav>
  );
};

export default NavBar;

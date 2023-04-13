import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Profile from "./components/EditProfile";
// import Properties from "./components/Properties";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/properties/getproperty/:propID"
            element={<PropertyDetail />}
          />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

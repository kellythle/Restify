import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in by checking if the access token exists in the local storage
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
    checkIsHost();
  }, [location]);

  function checkIsHost() {
    try {
      fetch("http://localhost:8000/accounts/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsHost(data.isHost);
        });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      alert(error);
    }
  }

  return (
    // <nav>
    //   {isLoggedIn ? (
    //     <>
    //       {/* Render the navigation items for logged-in users */}
    //       <Link to="/dashboard">Dashboard</Link>
    //       <Link to="/profile">Profile</Link>
    //       {/* Add more navigation items as needed */}
    //     </>
    //   ) : (
    // <>
    //   {/* Render the navigation items for non-logged-in users */}
    //   {location.pathname !== '/login' && <Link to="/login">Login</Link>}
    //   {location.pathname !== '/signup' && <Link to="/signup">Signup</Link>}
    // </>
    //   )}
    // </nav>
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ marginBottom: "2vh" }}
    >
      {isLoggedIn ? (
        <>
          <div className="navbar-brand">
            <a className="navbar-item" href="http://localhost:3000/properties">
              <img
                src="http://localhost:8000/media/Restify-Logo.png"
                width="112"
                height="50"
              ></img>
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div
              className="navbar-start"
              style={{ flexGrow: 1, justifyContent: "center" }}
            >
              <a
                className="navbar-item"
                href="http://localhost:3000/properties"
                style={{
                  height: "7vh",
                  textDecoration: "none",
                }}
              >
                View Listings
              </a>

              <a
                className="navbar-item"
                href="http://localhost:3000/guestsreservations"
                style={{
                  height: "7vh",
                  textDecoration: "none",
                }}
              >
                My Reservations
              </a>

              {isHost ? (
                <a
                  className="navbar-item"
                  href="http://localhost:3000/hostsreservations"
                  style={{
                    height: "7vh",
                    textDecoration: "none",
                  }}
                >
                  My Hostings
                </a>
              ) : (
                <></>
              )}
              {isHost ? (
                <a
                  className="navbar-item"
                  href="http://localhost:3000/properties/hostproperties"
                  style={{
                    height: "7vh",
                    textDecoration: "none",
                  }}
                >
                  My Properties
                </a>
              ) : (
                <></>
              )}
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a
                      className="navbar-item"
                      href="http://localhost:3000/notifications"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Notifications
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                      <a
                        className="button navbar-link"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <strong>
                          <div className="field">My Account</div>
                        </strong>
                      </a>
                      <div className="navbar-dropdown is-right">
                        <a
                          className="navbar-item"
                          href="http://localhost:3000/profile"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          Edit Profile
                        </a>
                        <hr className="navbar-divider"></hr>
                        <a
                          className="navbar-item"
                          href="http://localhost:3000/login"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-brand">
            <a className="navbar-item" href="http://localhost:3000/properties">
              <img
                src="assets/picture/Restify-Logo.png"
                width="112"
                height="50"
              ></img>
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div
              className="navbar-start"
              style={{ flexGrow: 1, justifyContent: "center" }}
            >
              <a
                className="navbar-item"
                href="http://localhost:3000/properties"
              >
                View Listings
              </a>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a
                      className="button is-link"
                      href="http://localhost:3000/signup"
                    >
                      <strong>Create an account</strong>
                    </a>
                    <a
                      className="button is-light"
                      href="http://localhost:3000/login"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;

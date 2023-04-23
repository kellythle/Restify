import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check if the user is logged in by checking if the access token exists in the local storage
        const token = localStorage.getItem("access");
        setIsLoggedIn(!!token);
    }, [location]);

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
            class="navbar"
            role="navigation"
            aria-label="main navigation"
            style={{ marginBottom: "2vh" }}
        >
            {isLoggedIn ? (
                <>
                    <div class="navbar-brand">
                        <a
                            class="navbar-item"
                            href="http://localhost:3000/properties"
                        >
                            <img
                                src="http://localhost:8000/media/Restify-Logo.png"
                                width="112"
                                height="50"
                            ></img>
                        </a>

                        <a
                            role="button"
                            class="navbar-burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div
                            class="navbar-start"
                            style={{ flexGrow: 1, justifyContent: "center" }}
                        >
                            <a
                                class="navbar-item"
                                href="http://localhost:3000/properties"
                                style={{
                                    height: "7vh",
                                    textDecoration: "none",
                                }}
                            >
                                View Listings
                            </a>

                            <a
                                class="navbar-item"
                                href="http://localhost:3000/guestsreservations"
                                style={{
                                    height: "7vh",
                                    textDecoration: "none",
                                }}
                            >
                                My Reservations
                            </a>

                            <a
                                class="navbar-item"
                                href="http://localhost:3000/hostsreservations"
                                style={{
                                    height: "7vh",
                                    textDecoration: "none",
                                }}
                            >
                                My Hostings
                            </a>

                            <div class="navbar-end">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <a
                                            class="navbar-item"
                                            href="http://localhost:3000/notifications"
                                            style={{
                                                textDecoration: "none",
                                            }}
                                        >
                                            Notifications
                                        </a>

                                        <div class="navbar-item has-dropdown is-hoverable">
                                            <a
                                                class="button navbar-link"
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <strong>
                                                    <div class="field">
                                                        My Account
                                                    </div>
                                                </strong>
                                            </a>
                                            <div class="navbar-dropdown is-right">
                                                <a
                                                    class="navbar-item"
                                                    href="http://localhost:3000/profile"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    Edit Profile
                                                </a>
                                                <hr class="navbar-divider"></hr>
                                                <a
                                                    class="navbar-item"
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
                    <div class="navbar-brand">
                        <a
                            class="navbar-item"
                            href="http://localhost:3000/properties"
                        >
                            <img
                                src="assets/picture/Restify-Logo.png"
                                width="112"
                                height="50"
                            ></img>
                        </a>

                        <a
                            role="button"
                            class="navbar-burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarBasicExample"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div
                            class="navbar-start"
                            style={{ flexGrow: 1, justifyContent: "center" }}
                        >
                            <a
                                class="navbar-item"
                                href="http://localhost:3000/properties"
                            >
                                View Listings
                            </a>

                            <div class="navbar-end">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <a
                                            class="button is-link"
                                            href="http://localhost:3000/signup"
                                        >
                                            <strong>Create an account</strong>
                                        </a>
                                        <a
                                            class="button is-light"
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css"; // create CSS later

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const loginUser = async (credentials) => {
    const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const tokenData = await loginUser({
        username: username,
        password: password,
      });

      localStorage.setItem("access", tokenData.access);
      localStorage.setItem("refresh", tokenData.refresh);
      navigate("/"); // Redirect to the main page or dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title is-1">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input is-rounded"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input is-rounded"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && <p className="has-text-danger">{error}</p>}
        <div className="field">
          <div className="control">
            <button className="button is-link is-rounded" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
      <div>
        <p>
          Don't have an account?{" "}
          <a href="/signup">Sign up now!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    username: "",
    password: "",
    confirm_password: "",
    avatar_file: null,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar_file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
        method: "POST",
        body: data,
      });

      console.log("Response:", response);
      console.log("data:", data);

      if (response.ok) {
        alert("Account created successfully!");
      } else {
        const errorData = await response.json();
        alert(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      alert(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirm password:
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Avatar:
          <input type="file" name="avatar_file" onChange={handleFileChange} />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;

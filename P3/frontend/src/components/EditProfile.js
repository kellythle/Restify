import React, { useState, useEffect } from "react";
// import "./EditProfile.css"; // create CSS later


const EditProfile = ({ token }) => {
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      username: "",
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      avatar_file: null,
    });
  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_new_password) {
      alert("New passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/accounts/change_password/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({
          current_password: formData.current_password,
          new_password: formData.new_password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error changing password");
      }

      alert("Password changed successfully!");
      setFormData((prevFormData) => ({
        ...prevFormData,
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      }));
    } catch (error) {
      console.error(error);
      alert(error.message || "Error changing password");
    }
};


  useEffect(() => {
    fetchUserData();
  }, []);

const updateUserProfile = async (formData, token) => {
    const url = "http://localhost:8000/accounts/profile/";
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
  
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
        body: data,
      });
  
      if (!response.ok) {
        throw new Error("Error updating user profile");
      }
  
      const updatedUser = await response.json();
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  

  const fetchUserData = async () => {
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:8000/accounts/profile/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching user data');
      }
  
      const data = await response.json();
      setUser(data);
      setFormData({
        ...formData,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        username: data.username,
        // You can add more fields here if needed
      });
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="edit-profile-container">
    <h1 className="title is-1">Edit your profile</h1>
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
        <div>
            {/* Display the user's avatar */}
            {user.avatar && (
              <div>
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  style={{ width: '200px', borderRadius: '50%' }}
                />
              </div>
            )}

            {/* Display the user's host status */}
            <div>
              <p>{user.is_host ? 'You are a host.' : 'You are not a host.'}</p>
            </div>
          
        <div className="columns">
        <div className="column is-5">
          <form onSubmit={handleProfileUpdate}>
            <h3 className="title is-3">Edit account information.</h3>
            <div className="field">
              <div className="field-body">
                <div className="column is-one-half">
                  <label className="label" htmlFor="first_name">
                    First name
                  </label>
                  <input
                    className="input is-rounded"
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    name="first_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="column auto">
                  <label className="label" htmlFor="last_name">
                    Last name
                  </label>
                  <input
                    className="input is-rounded"
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    name="last_name"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="control">
                    <input
                      className="input is-rounded"
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Phone Number</label>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="control">
                    <input
                      className="input is-rounded"
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone_number}
                      name="phone_number"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="text"              placeholder="Username"
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <label className="label" htmlFor="avatar_file">
              Change your avatar
            </label>
            <div className="file has-name" id="avatarupload">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="avatar_file"
                  onChange={handleFileChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fa fa-upload" style={{ fontSize: "20px" }}></i>
                  </span>
                  <span className="file-label">Upload image</span>
                </span>
                <span className="file-name">
                  {formData.avatar_file
                    ? formData.avatar_file.name
                    : "No file selected"}
                </span>
              </label>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link is-rounded" type="submit">
                  Make changes
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-5">
          <form onSubmit={handleChangePassword}>
            <h3 className="title is-3">Change your password.</h3>
            <div className="field">
              <label className="label">Enter your current password</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="password"
                  placeholder="Current password"
                  name="current_password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Create a password</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="password"
                  placeholder="New password"
                  name="new_password"
                  onChange={handleChange}
                />
              </div>
              <p className="help">Password must be 8 characters or longer</p>
            </div>
            <div className="field">
              <label className="label">Confirm your new password</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="password"
                  placeholder="Confirm password"
                  name="confirm_new_password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link is-rounded" type="submit">
                  Change password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
        )}
    </div>
    </div>
  );
};

export default EditProfile; 

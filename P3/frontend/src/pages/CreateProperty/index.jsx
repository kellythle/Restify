import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import "./style.css";

const CreateProperty = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isHost, setIsHost] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        property_name: "",
        address: "",
        group_size: '',
        number_of_beds: "",
        number_of_baths: "",
        date_created: "",
        price_night: "",
        description: "",
        amenities: [],
        images: [{}]
    })

    useEffect(() => {
        const token = localStorage.getItem('access');
        setIsLoggedIn(!!token);
        console.log(token)
      }, []);

    useEffect(() => {
        checkIsHost();
        console.log(isLoggedIn)
      }, [isLoggedIn]);

    async function checkIsHost(){
        if (isLoggedIn){
            await fetchUserData();

            console.log('here1111')
            if (!isHost){
                console.log('here1')
                navigate('/')
                throw new Error('Must be host');
            }
        }
        else{
            navigate('/login');
        }
    }

    const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:8000/accounts/profile/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
          });
      
          if (!response.ok) {
            throw new Error('Error fetching user data');
          }
      
          const data = await response.json();
          setIsHost(data.isHost);
      
        } catch (error) {
          console.error(error);
        }
      };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };

    const handleAmenityChange = (e) => {
        var updatedAmenities = [...formData.amenities];
        if (e.target.checked) {
            updatedAmenities = [...formData.amenities, e.target.value];
        } else {
            updatedAmenities.splice(formData.amenities.indexOf(e.target.value), 1);
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          amenities: [...prevFormData.updatedAmenities],
        }));
      };

      const handleImageChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: e.target.files
        }))
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && formData[key]) {
            data.append(key, formData[key]);
          }
        }
    
        try {
          const response = await fetch("http://127.0.0.1:8000/properties/addproperty/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
              },
            body: data,
          });
    
          console.log("Response:", response);
          console.log("data:", data);
    
          if (response.ok) {
            alert("Property created successfully!");
            navigate("/properties/");
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

    return <>
        <section className="section">            
              <form onSubmit={handleSubmit}>              
                <div className="container">          
                  <div className="columns is-centered">
                    <div className="column is-two-fifths is-narrow-mobile">
                      <h2 className="title is-2">Create your New Property</h2>

                      <div className="field">
                        <label className="label">Property Name</label>
                        <div className="control">
                          <input onChange={handleChange} name="property_name" className="input" type="text" placeholder="Choose your property's name" required/>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Address</label>
                        <div className="control pb-2">
                          <input onChange={handleChange} name="address" className="input" type="text" placeholder="Address" required/>
                        </div>
                        {/* <div className="control pb-2">
                          <input className="input" type="text" placeholder="Apartment, suite, etc. (optional)"/>
                        </div>
                        <div className="columns is-variable is-1 ">
                          <div className="column is-one-third">
                            <input className="input" type="text" placeholder="City" required/>
                          </div>
                          <div className="column auto">
                            <input className="input" type="text" placeholder="Province" required/>
                          </div>
                          <div className="column auto">
                            <input className="input" type="text" placeholder="Postal Code" required/>
                          </div>
                        </div> */}
                      </div>

                      <div className="field pt-4">
                        <label className="label">Group Size</label>
                        <div className="control">
                          <div className="select">
                            <select onChange={handleChange} name="group_size">
                              <option>Choose a number of guests</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                              <option>13</option>
                              <option>14</option>
                              <option>15</option>
                              <option>16</option>
                              <option>17</option>
                              <option>18</option>
                              <option>19</option>
                              <option>20</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Property Information</label>
                        <div className="control">
                          <div className="columns is-variable is-1 ">
                            <div className="column is-one-half">
                              <label className="label has-text-weight-semibold">Number of Beds</label>
                              <div className="select">
                                <select onChange={handleChange} name="number_of_beds">
                                  <option>Choose a number of beds</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>15</option>
                                  <option>16</option>
                                  <option>17</option>
                                  <option>18</option>
                                  <option>19</option>
                                  <option>20</option>
                                </select>
                              </div>
                            </div>

                            <div className="column auto">
                              <label className="label has-text-weight-semibold">Number of Baths</label>
                              <div className="select">
                                <select onChange={handleChange} name="number_of_baths">
                                  <option>Choose a number of baths</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>15</option>
                                  <option>16</option>
                                  <option>17</option>
                                  <option>18</option>
                                  <option>19</option>
                                  <option>20</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Amenities</label>
                        <label className="label has-text-weight-semibold">Essentials</label>
                        <div className="control">
                          <div className="columns is-variable is-1">
                            <div className="column is-one-half">
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Wifi
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Washer
                              </label><br/>
                            </div>
                            <div className="column auto">
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Kitchen
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Dryer
                              </label><br/>
                            </div>
                          </div>    
                        </div>

                        <label className="label has-text-weight-semibold pt-3">Features</label>
                        <div className="control">
                          <div className="columns is-variable is-1">
                            <div className="column is-one-half">
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Pool
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Free parking on premises
                              </label><br/>
                            </div>
                          </div>    
                        </div>
                      </div>
                    
                      <div className="field pt-4">
                        <label className="label">Property Images</label>
                        <div className="control">
                          <div className="file">
                            <label className="file-label">
                              <input onChange={handleImageChange} className="file-input" type="file" multiple="multiple" required/>
                              <span className="file-cta">
                                <span className="file-icon">
                                  <i className="fa fa-upload" style={{fontSize:"20px"}}></i>
                                </span>
                                <span className="file-label">
                                  Upload image(s)
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Availability</label>
                        <div className="columns">
                          <div className="control column is-one-quarter">
                            <label className="label has-text-weight-semibold">Start Date</label>
                            <input type="date" value="2023-02-10" />
                          </div>
                          <div className="control column auto">
                            <label className="label has-text-weight-semibold">End Date</label>
                            <input type="date" value="2025-02-10" />
                          </div>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Price Per Night</label>
                        <div className="control">
                          <input onChange={handleChange} name="price_night" className="input" type="number" step="0.01" min={0} placeholder="Input your price/night" required></input>
                        </div>
                      </div>                      

                      <div className="field pt-4">
                        <label className="label">Description</label>
                        <div className="control">
                          <textarea onChange={handleChange} name="description" className="textarea" type="text" placeholder="Write out a description of your property for guests" required></textarea>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <div className="control">
                          <label className="checkbox">
                            <input type="checkbox" required/>
                            I agree to the <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <a href="myproperties.html" className="button is-link">Submit</a>
                        </div>
                        <div className="control">
                          <a className="button is-link is-light" href="myproperties.html">Cancel</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
    </>

}

export default CreateProperty


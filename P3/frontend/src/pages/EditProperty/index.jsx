import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import "./style.css";


const EditProperty = () => {
    const propID = useParams("propID")
    const amenityDict = {
        "Laundry": 1,
        "Wifi": 2,
        "Kitchen": 3,
        "Dryer": 4,
        "Pool": 5,
        "Free parking on premises": 6,
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const allAmenitiesLeft = ["Wifi", "Laundry", "Pool"]
    const allAmenitiesRight = ["Kitchen", "Dryer", "Free parking on premises"]
    let bedSizes = [];
    for (let i = 1; i < 21; i++){
        bedSizes.push({
            value: i.toString(),
            label: i.toString(),
            });
    };
    const [size, setSize] = useState({});
    const [img, setImg] = useState('')
    const [formData, setFormData] = useState({
        owner: -1,
        property_name: "",
        address: "",
        group_size: '',
        number_of_beds: "",
        number_of_baths: "",
        date_created: "",
        price_night: "",
        description: "",
        amenities: [],
        image: []
    })
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('access'))
        console.log(propID);
    }, [])


    useEffect(() => {
        if(isLoggedIn){
            fetch(`http://localhost:8000/properties/isOwner/${propID.propID}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                  },
            }).then((response)=> {
                return response.json();
            }).then((data) => {
                if (data.owner == 'true'){
                    setIsOwner(true);
                    getFormData();
                }
                else{
                    setIsOwner(false);
                    alert('Must be the owner to edit a property');
                    navigate('/');
                }
            });
        }
    }, [isLoggedIn]);

    function getFormData(){
        fetch(`http://localhost:8000/properties/getproperty/${propID.propID}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
              },
        }).then(response => response.json()
        ).then(data => {
          setImg(data.images[0])
            setFormData({
                ...formData,
                owner: data.owner,
                property_name: data.property_name,
                address: data.address,
                group_size: data.group_size,
                number_of_beds: data.number_of_beds,
                number_of_baths: data.number_of_baths,
                date_created: data.date_created,
                price_night: data.price_night,
                description: data.description,
                amenities: data.amenities,
                image: data.images,
            });
        });
    }

    useEffect(()=>{
        // console.log(formData.amenities)
    }, [formData]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    };

    // const handleAmenityChange = (item, checked) => {
    //     var updatedAmenities = [...formData.amenities];
    //     if (e.target.checked) {
    //         console.log(e.target.value)
    //         updatedAmenities = [...formData.amenities, e.target.value];
    //     } else {
    //         updatedAmenities.splice(formData.amenities.indexOf(e.target.value), 1);
    //     }
    //     console.log(updatedAmenities)
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       amenities: updatedAmenities,
    //     }));
    //   };
    const handleAmenityChange = (item, checked) => {
        var updatedAmenities = [...formData.amenities];
        if (checked) {
            updatedAmenities = [...formData.amenities, item.item];
        } else {
            updatedAmenities.splice(formData.amenities.indexOf(item.item), 1);
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          amenities: updatedAmenities,
        }));
      };

      const handleImageChange = (e) => {
        if (e.target.files.length > 0){
          const fileName = document.querySelector('.file-name');
          fileName.textContent = e.target.files[0].name;
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files
        }))
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        const imgData = new FormData();
        let tempData = {...formData};
        for (const key in tempData) {
          if (tempData.hasOwnProperty(key) && tempData[key]) {
            if (key == 'amenities'){
              let obj = [];
              for (let propName of tempData['amenities']){
                obj.push(amenityDict[propName]);
              };
              data.append(key, obj);
            }else if(key == 'image'){
              for(let item of tempData[key]){
                imgData.append(key, item)
              }
            }
            else{
            data.append(key, formData[key]);
            };
          }
        }
    
        try {
          const response = await fetch(`http://127.0.0.1:8000/properties/editproperty/${propID.propID}/`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
              },
            body: data,
          });
    
          console.log("Response:", response);
          console.log("data:", data);
    
          if (response.ok) {
            fetch(`http://localhost:8000/properties/editingpropertyimages/${propID.propID}/`, {
              method: "PATCH",
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
              },
              body: imgData,
            }).then(response => {
              alert("Property edited successfully!");
              navigate(`/properties/getproperty/${propID.propID}`);
            })
            
          } else {
            const errorData = await response.json();
            alert(JSON.stringify(errorData) + 'here');
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
                      <h2 className="title is-2">Edit Property</h2>

                      <div className="field">
                        <label className="label">Property Name</label>
                        <div className="control">
                          <input onChange={handleChange} name="property_name" className="input" type="text" placeholder="Choose your property's name"  defaultValue={formData.property_name} required/>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Address</label>
                        <div className="control pb-2">
                          <input onChange={handleChange} defaultValue={formData.address} name="address" className="input" type="text" placeholder="Address" required/>
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
                            {/* <Select options={bedSizes} defaultValue={{value: formData.number_of_beds, label: formData.number_of_beds}}></Select> */}
                            {/* <Select options={bedSizes} defaultValue={size}></Select> */}
                            <select name='group_size' onChange={handleChange}>
                            {sizes.map((item, index) => {
                                if (Number(formData.group_size) == item){
                                    return <option key={index} selected>{item}</option>
                                }
                                else{
                                    return <option key={index}>{item}</option>
                                }
                            })}
                            </select>
                            {/* <select defaultValue={formData.group_size} onChange={handleChange} name="group_size">
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
                            </select> */}
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
                                {/* <select defaultValue={formData.number_of_beds} onChange={handleChange} name="number_of_beds">
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
                                </select> */}
                                <select name='number_of_beds' onChange={handleChange}>
                                    {sizes.map((item, index) => {
                                    if (Number(formData.number_of_beds) == item){
                                        return <option key={index} selected>{item}</option>
                                    }
                                    else{
                                        return <option key={index}>{item}</option>
                                    }
                                    })}
                                </select>
                              </div>
                            </div>

                            <div className="column auto">
                              <label className="label has-text-weight-semibold">Number of Baths</label>
                              <div className="select">
                                {/* <select defaultValue={formData.number_of_baths} onChange={handleChange} name="number_of_baths">
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
                                </select> */}
                                <select name='number_of_baths' onChange={handleChange}>
                                    {sizes.map((item, index) => {
                                        if (Number(formData.number_of_baths) == item){
                                            return <option key={index} selected>{item}</option>
                                        }
                                        else{
                                            return <option key={index}>{item}</option>
                                        }
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="field pt-4">
                        <label className="label">Amenities</label>
                        <div className="control">
                          <div className="columns is-variable is-1">
                            <div className="column is-one-half">
                              {allAmenitiesLeft.map((item, index)=>{
                                if (formData.amenities.includes(item)){
                                    return <div key={index}>
                                    <label className="checkbox">
                                        <input onChange={(e)=>{
                                            handleAmenityChange({item}, e.target.checked)}} type="checkbox" checked/>
                                            {item}
                                    </label><br/>
                                    </div>
                                }
                                else{
                                    return <div key={index}>
                                    <label className="checkbox">
                                        <input onChange={(e)=>{
                                            handleAmenityChange({item}, e.target.checked)}} type="checkbox"/>
                                            {item}
                                    </label><br/>
                                    </div>
                                }
                              })}
                              {/* <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Wifi
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Laundry
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Pool
                              </label><br/> */}
                            </div>
                            <div className="column auto">
                                {allAmenitiesRight.map((item, index)=>{
                                    if (formData.amenities.includes(item)){
                                        return <div key={index}>
                                        <label className="checkbox">
                                            <input onChange={(e)=>{
                                            handleAmenityChange({item}, e.target.checked)}} type="checkbox" checked/>
                                                {item}
                                        </label><br/>
                                        </div>
                                    }
                                    else{
                                        return <div key={index}>
                                        <label className="checkbox">
                                            <input onChange={(e)=>{
                                            handleAmenityChange({item}, e.target.checked)}} type="checkbox"/>
                                                {item}
                                        </label><br/>
                                        </div>
                                    }
                                })}
                              {/* <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Kitchen
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Dryer
                              </label><br/>
                              <label className="checkbox">
                                <input onChange={handleAmenityChange} type="checkbox"/>
                                Free parking on premises
                              </label><br/> */}
                            </div>
                          </div>    
                        </div>
                      </div>
                    
                      <div className="field pt-4">
                        <label className="label">Property Images</label>
                        <div className="control">
                          <div className="file">
                            <label className="file-label">
                              <input name="property_images" onChange={handleImageChange} className="file-input" type="file" multiple="multiple" required/>
                              <span className="file-cta">
                                <span className="file-icon">
                                  <i className="fa fa-upload" style={{fontSize:"20px"}}></i>
                                </span>
                                <span className="file-label">
                                  Upload image(s)
                                </span>
                              </span>
                              <span class="file-name">
                                  {/* {formData.image[0]} */}
                                  {img}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* <div className="field pt-4">
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
                      </div> */}

                      <div className="field pt-4">
                        <label className="label">Price Per Night</label>
                        <div className="control">
                          <input defaultValue={formData.price_night} onChange={handleChange} name="price_night" className="input" type="number" step="0.01" min={0} placeholder="Input your price/night" required></input>
                        </div>
                      </div>                      

                      <div className="field pt-4">
                        <label className="label">Description</label>
                        <div className="control">
                          <textarea defaultValue={formData.description} onChange={handleChange} name="description" className="textarea" type="text" placeholder="Write out a description of your property for guests" required></textarea>
                        </div>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <button type="submit" className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                          <Link className="button is-link is-light" to={`../properties/getproperty/${propID.propID}`}>Cancel</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
    </>

}

export default EditProperty
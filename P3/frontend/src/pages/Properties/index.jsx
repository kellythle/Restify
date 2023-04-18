import React, { useEffect, useState } from 'react';
import './style.css'

const Properties = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
      fetchProperties();
    }, []);
  
  async function fetchProperties() {
    try {
      const response = await fetch("http://localhost:8000/properties/all/");
      console.log("API response: ", response);
      
      const data = await response.json();
      console.log("Data received: ", data);
  
      // Access the 'results' property of the data object
      setProperties(data.results);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }
  return <>
    {properties.map(property => {
      return <div key={property.id}>
        <div className="columns tile is-parent">
          <div className="tile is-child box itembox">
            <a href="assets/picture/house.png" className="tilelink">
              <div className="columns is-mobile refunparent">
                <div className="image listingimg column is-one-third">
                  <img src="assets/picture/house.png" alt="House" />
                </div>

                <div className="listingdesc column auto">
                  <b>{property.property_name}</b>
                  <p>
                    {property.number_of_beds} beds, {property.number_of_baths}{" "}
                    baths
                  </p>
                  <p className="refun" id="pricing">
                    <b>${property.price_night}</b>/night
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    })}
  </>;
};

export default Properties;
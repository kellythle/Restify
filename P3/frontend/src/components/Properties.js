import React, { useState, useEffect } from 'react';

const Properties = () => {
  const [properties, setProperties] = useState([]);

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
  

  return (
    <div>
        <h2>Properties</h2>
        {properties.map((property) => (
        <div key={property.id} style={{ border: '1px solid', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{property.property_name}</h3>
            <p>{property.address}</p>
            <p>Group size: {property.group_size}</p>
            <p>Number of beds: {property.number_of_beds}</p>
            <p>Number of baths: {property.number_of_baths}</p>
            <p>Price per night: ${property.price_night}</p>
            <p>
            Amenities:
            {property.amenities && (
                <ul>
                {property.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                ))}
                </ul>
            )}
            </p>
            <p>{property.description}</p>
            <h4>Images</h4>
            {property.images && (
            property.images.map((image) => (
                <img key={image.image_url} src={image.image_url} alt={property.property_name} width="200" />
            ))
            )}
        </div>
        ))}
    </div>
  );
};

export default Properties;

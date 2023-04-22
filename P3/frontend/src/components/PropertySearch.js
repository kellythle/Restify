import React, { useState } from 'react';


const PropertySearch = () => {
  const token = localStorage.getItem('access');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [guests, setGuests] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [features, setFeatures] = useState([]);
  const [safety, setSafety] = useState([]);
  const [properties, setProperties] = useState([]); // You can replace this with the properties fetched from your backend
  const [sortMethod, setSortMethod] = useState('');

  const handleAmenityChange = (e) => {
    const amenity = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter((item) => item !== amenity));
    }
  };

  const handleFeatureChange = (e) => {
    const feature = e.target.value;
    if (e.target.checked) {
      setFeatures([...features, feature]);
    } else {
      setFeatures(features.filter((item) => item !== feature));
    }
  };

  const handleSafetyChange = (e) => {
    const safetyItem = e.target.value;
    if (e.target.checked) {
      setSafety([...safety, safetyItem]);
    } else {
      setSafety(safety.filter((item) => item !== safetyItem));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      location,
      start_date: startDate,
      end_date: endDate,
      min_price: minPrice,
      max_price: maxPrice,
      guests,
      beds,
      baths,
      amenities: amenities.join(','),
      features: features.join(','),
      safety: safety.join(','),
      sortMethod: sortMethod,
    });

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
        const response = await fetch(
          `http://localhost:8000/properties/search/?${queryParams.toString()}`,
          requestOptions
        );
        
        if (response.ok) {
          const data = await response.json();
          setProperties(data.results); // Save the results array to the properties state
          console.log('API response data:', data);
          console.log('Properties:', properties);
          console.log('Type of properties:', typeof properties);
    
        } else {
          // Handle error
          console.error('Error fetching properties:', response.statusText);
        }
      } catch (error) {
        // Handle error
        console.error('Error fetching properties:', error);
      }
    };

  const clearFilters = () => {
    setLocation('');
    setStartDate('');
    setEndDate('');
    setMinPrice('');
    setMaxPrice('');
    setGuests('');
    setBeds('');
    setBaths('');
    setAmenities([]);
    setFeatures([]);
    setSafety([]);
  };

  const sortProperties = async (method) => {
    setSortMethod(method);
    handleSubmit(new Event('submit', { cancelable: true }));
  };
  
  
  

  return (
        <main>
          {/* Your component JSX structure */}
          <section>
            {/* Rest of the JSX structure */}
            {/* Location input */}
      <div className="field">
        <label className="label">Location</label>
        <input
          className="input"
          type="text"
          placeholder="Search location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Group size input */}
      <div className="field">
        <label className="label">Group size</label>
        <input
          className="input"
          type="number"
          min={1}
          placeholder="Number of guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      {/* Beds input */}
      <div className="field">
        <label className="label">Beds</label>
        <input
          className="input"
          type="number"
          min={1}
          placeholder="Number of beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
      </div>

      {/* Baths input */}
      <div className="field">
        <label className="label">Baths</label>
        <input
          className="input"
          type="number"
          min={1}
          placeholder="Number of baths"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />
      </div>
            <div className="field">
              <label className="label">Availability</label>
              <div className="columns is-variable is-1">
                <div className="column is-one-half">
                  <label className="label has-text-weight-semibold">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="column auto">
                  <label className="label has-text-weight-semibold">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Rest of the JSX structure */}
            <div className="field">
              <label className="label has-text-weight-semibold">Price per night</label>
              <div className="columns is-variable is-1">
                <div className="column is-one-half">
                  <input
                    className="input"
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="column auto">
                  <input
                    className="input"
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Rest of the JSX structure */}
            <div className="field is-grouped pt-4">
                <div className="control">
                    <button className="button is-link" onClick={handleSubmit}>
                    Submit
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={clearFilters}>
                    Clear Filters
                    </button>
                </div>
            </div>

</section>
{/* Property listing section */}
<section>
<div className="sort-options">
<label>Sort by: </label>
<select onChange={(e) => sortProperties(e.target.value)}>
  <option value="">Select...</option>
  <option value="price_asc">Price (Low to High)</option>
  <option value="price_desc">Price (High to Low)</option>
  <option value="group_size_asc">Group Size (Low to High)</option>
  <option value="group_size_desc">Group Size (High to Low)</option>
</select>

</div>

{
  properties.length > 0 ? (
    properties.map((property) => (
      <div key={property.id} className="property-item">
        <h3>{property.property_name}</h3>
        <p>{property.address}</p>
        <p>Group size: {property.group_size}</p>
        <p>Beds: {property.number_of_beds}</p>
        <p>Baths: {property.number_of_baths}</p>
        <p>Price per night: {property.price_night}</p>
      </div>
    ))
  ) : (
    <p>No properties found.</p>
  )
}


</section>
</main>
);
};

export default PropertySearch;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import "./style.css";
import ImageGallery from 'react-image-gallery';
import Carousel from 'react-bootstrap/Carousel';

const PropertyDetails = () => {
    const { propID } = useParams();
    const [property, setProperty] = useState({owner:"", property_name:"", address:"",group_size:"",
number_of_beds:"", number_of_baths:"", price_night:"", amenities:[], images:[], description:""});
    const [images, setImages] = useState([]);
    let api = "http://localhost:8000/properties/getproperty/" + propID.toString() + "/";
    useEffect(()=>{
        getProperty();
        
    }, [property]);

    function toggleCollapsible(item){
        console.log(item.target)
        item.target.classList.toggle("active");
        var content = item.target.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    }

    async function getProperty(){
        try {
            const response = await fetch(api);
            // console.log("API response: ", response);
      
            const data = await response.json();
            // console.log("Data received: ", data);
      
            // Access the 'results' property of the data object
            setProperty(data);
            let arr = data.images.map((image)=>(
                {
                    // original: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                    // thumbnail: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
                    original: image
                }
                ))
            setImages(arr)
            // console.log(arr)
          } catch (error) {
            console.error("Error fetching property:", error);
          }
    }
    return <>
    {/* {property ? console.log(property.amenities === undefined):console.log("no")} */}
    {property ? <div className="columns">
        <div
        className="column is-full"
        style={{display: "flex", flexDirection: "column", justifyContent: "centers"}}
        >
            {/* <Carousel>
                {property.images.map((image, index) => {
                    <Carousel.Item key={index} className="d-block w-100" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
                })}
                <Carousel.Item className="d-block w-100" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
            </Carousel> */}
            
            
            {/* <ImageGallery items={images}
                    // src="assets/picture/house.png"
                    // alt="House image"
                    // style={{borderRadius: "0.5rem", border: "1rem"}}
                /> */}
        <h1 className="title" style={{padding: "0 0 0 2rem"}}>
            {property.property_name}
        </h1>
        <div className="tile is-ancestor basetile box">
            <div className="tile is-parent">
            <div className="tile is-child">
                {/* <figure className="image is-4by3">
                
                </figure> */}
                <Carousel className='d-block w-100'>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100" src={image.original} alt={`Slide ${index}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            </div>
            <div className="tile is-parent">
            <div className="tile is-child">
                <p style={{padding: "1rem", fontSize: "larger"}}>
                {/* <b>{property.property_name}</b> <br /> */}
                <b>${property.price_night}/night</b> <br />
                <b>Contact:{property.owner}</b>
                </p>
            </div>
            </div>
            <div className="tile is-parent">
            <div
                className="tile is-child box"
                style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"}}
            >
                <h1 style={{textAlign: "center", fontSize: "large"}}>As a guest, you can:</h1>
                <a className="button propertydetails is-link is-rounded" href="newrequest.html">New Request</a>
                <a className="button propertydetails is-link is-rounded" href="reservationdescription.html">View Comments</a>
                <h1 style={{textAlign: "center", fontSize: "large"}}>Status: Request Pending</h1>
            </div>
            </div>
        </div>
        <div className="box">
            <button type="button" className="collapsible">
            <b>Information</b>
            </button>
            <div className="ccontent">
            <ul>
                <li>Address: {property.address}</li>
                <li>Max Number of Guests: {property.group_size}</li>
                <li>Beds: {property.number_of_beds}</li>
                <li>Baths: {property.number_of_baths}</li>
            </ul>
            </div>
        </div>
        <div className="box">
            <button type="button" className="collapsible">
            <b>Description</b>
            </button>
            <div className="ccontent">
            <p>{property.description}</p>
            </div>
        </div>
        <div className="box">
            <button type="button" className="collapsible" onClick={toggleCollapsible}>
            <b>Amenities</b>
            </button>
            <div className="ccontent">
                {property.amenities.map(amenity => {
                    return <div className='icon-text' key={amenity}>
                        <span>{amenity}</span>
                    </div>
                })}        
            </div>
        </div>
        </div>
    </div>
    :<></>}
        
        
    </>
}

export default PropertyDetails
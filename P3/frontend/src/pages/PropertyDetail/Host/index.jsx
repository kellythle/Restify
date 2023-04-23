import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import "../style.css";
import Carousel from 'react-bootstrap/Carousel';

const HostPropertyDetails = ({email}) => {
    const { propID } = useParams();
    const location = useLocation();
    const [deleting, setDelete] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [property, setProperty] = useState({owner:"", property_name:"", address:"",group_size:"",
number_of_beds:"", number_of_baths:"", price_night:"", amenities:[], images:[], description:""});
    const [images, setImages] = useState([]);
    let api = "http://localhost:8000/properties/getproperty/" + propID.toString() + "/";
    
    useEffect(()=>{
        getProperty();
    }, []);



    useEffect(() => {
        const token = localStorage.getItem('access');
        setIsLoggedIn(!!token);
      }, [location]);

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

    function toggleDelete(){
        let temp = !deleting;
        setDelete(temp);
        console.log(temp);
    }

    function deleteHandler(){
        fetch(`http://localhost:8000/properties/deleteproperty/${propID}/`,{
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('access')}`
            }
        }).then(response => response.json()).then(data => {
            navigate('../properties/hostproperties');
            alert('Successfully deleted');
            console.log(data)})
    }


    async function getProperty(){
        
        try {
            const response = await fetch(api);
            // console.log("API response: ", response);
      
            const data = await response.json();
            setProperty(data);
            let arr = data.images.map((image)=>(
                {
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
    {property ? <><div className="columns">
        <div
        className="column is-full"
        style={{display: "flex", flexDirection: "column", justifyContent: "centers"}}
        >
        <h1 className="title" style={{padding: "0 0 0 2rem"}}>
            {property.property_name}
        </h1>
        <div className="tile is-ancestor basetile box">
            <div className="tile is-parent">
            <div className="tile is-child">
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
            <div className="tile is-child" style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <p style={{padding: "1rem", fontSize: "larger", marginTop:"5rem"}}>
                {/* <b>{property.property_name}</b> <br /> */}
                <b>${property.price_night}/night</b> <br />
                <b>Contact:{email}</b>
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
                <h1 style={{textAlign: "center", fontSize: "large"}}>As the owner of this property, you can:</h1>
                    <a className="button propertydetails is-link is-rounded" href="hostreservations.html">View Requests and History</a>
                    <Link className="button propertydetails is-link is-rounded" to={`/properties/editproperty/${propID}`}>Edit Property</Link>
                    <button className="js-modal-trigger button propertydetails is-link is-rounded" onClick={toggleDelete}>Delete Property</button>
                    <a className="button propertydetails is-link is-rounded" href="reservationdescription.html">View Property Comments</a>

                <h1 style={{textAlign: "center", fontSize: "large"}}>Status: Open for Requests</h1>
            </div>
            </div>
        </div>
        <div className="box">
            <button type="button" className="collapsible" onClick={toggleCollapsible}>
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
            <button type="button" className="collapsible" onClick={toggleCollapsible}>
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
    <div className={`modal ${deleting ?  "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Delete Property</p>
                <button className="delete" aria-label="close" onClick={toggleDelete}></button>
            </header>
            <section className="modal-card-body">
                Are you sure you want to delete this property?
            </section>
            <footer className="modal-card-foot">
                <button className="button is-danger" onClick={deleteHandler}>Delete</button>
            </footer>
        </div>
     </div>
    </>           
    :<></>}
        
        
    </>
}

export default HostPropertyDetails
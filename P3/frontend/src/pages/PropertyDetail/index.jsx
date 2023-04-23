import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import "./style.css";
import Carousel from 'react-bootstrap/Carousel';
import Guest from './Guest'
import Host from './Host'

const PropertyDetails = () => {
    const { propID } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [ownerEmail, setOwnerEmail] = useState("");
    const [isGuest, setIsGuest] = useState(true);
    const [property, setProperty] = useState({owner:"", property_name:"", address:"",group_size:"",
number_of_beds:"", number_of_baths:"", price_night:"", amenities:[], images:[], description:""});
    const [images, setImages] = useState([]);
    let api = "http://localhost:8000/properties/isOwner/" + propID.toString() + "/";

    async function checkIsOwner(){
        try {
            const response = await fetch(api, {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('access')}`
                }
            });
            const data = await response.json();
            if (data.owner == 'true'){
                setIsGuest(false);
                setOwnerEmail(data.email);
                console.log(data)
            }
            else{
                setIsGuest(true);
                setOwnerEmail(data.email);
            }
        } catch (error) {
            console.error("Error fetching property:", error);
        }; 
    }

    useEffect(() => {
        checkIsOwner();
      }, []);


    return <>
        {isGuest?<Guest email={ownerEmail}/>:<Host email={ownerEmail}/>}
    </>
}

export default PropertyDetails
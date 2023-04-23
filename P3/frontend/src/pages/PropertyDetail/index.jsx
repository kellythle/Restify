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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isGuest, setIsGuest] = useState(true);
    const [property, setProperty] = useState({owner:"", property_name:"", address:"",group_size:"",
number_of_beds:"", number_of_baths:"", price_night:"", amenities:[], images:[], description:""});
    const [images, setImages] = useState([]);
    let api = "http://localhost:8000/properties/isowner/" + propID.toString() + "/";
    // useEffect(()=>{
    //     checkIsOwner();
    // }, []);

    async function checkIsOwner(){
        if (isLoggedIn){
            try {
                const response = await fetch(api);
                const data = await response.json();
                if (data.owner == 'true'){
                    setIsGuest(false);
                }
                else{
                    setIsGuest(true)
                }
              } catch (error) {
                console.error("Error fetching property:", error);
              }
        }
        else {
            console.log('no')
            setIsGuest(true);
        }
        
    }

    useEffect(() => {
        const token = localStorage.getItem('access');
        setIsLoggedIn(!!token);
        checkIsOwner();
      }, [location]);


    return <>
        {isGuest?<Guest/>:<Host/>}
    </>
}

export default PropertyDetails
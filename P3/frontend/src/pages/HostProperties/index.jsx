import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import "./style.css";

const HostProperty = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState(0);
    const [hostProperties, setHostProperties] = useState([{}]);
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('access'))
        checkIsHost();
        fetchProperties();
    }, []);

    function fetchProperties(){
        fetch('http://localhost:8000/properties/hostproperties/', {
            method: 'GET', 
            headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }).then(response => response.json())
        .then(data => {
            setHostProperties(data.results);
            if(data.next!==null){
                setNext(data.next);
            }
        });
    }

    function nextHandler(){
        fetch(next, {
            method: 'GET', 
            headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }).then(response => response.json())
        .then(data => {
            setHostProperties(data.results);
            if(data.next!==null){
                setNext(data.next);
            }
            else{
                setNext("");
            }
            if(data.previous!==null){
                setPrevious(data.previous);
            }
            else{
                setNext("");
            }
            setCurrPage((prevPage)=>{
                return prevPage + 1;
            })
        });
    }

    function previousHandler(){
        fetch(previous, {
            method: 'GET', 
            headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }).then(response => response.json())
        .then(data => {
            setHostProperties(data.results);
            if(data.next!==null){
                setNext(data.next);
            }
            else{
                setNext("");
            }
            if(data.previous!==null){
                setPrevious(data.previous);
            }
            else{
                setPrevious("");
            }
            setCurrPage((prevPage)=>{
                return prevPage - 1;
            })
        });
    }

    function checkIsHost(){
        try{
                fetch('http://localhost:8000/accounts/profile/', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                },
            }).then(response => response.json())
            .then(data => {
                if (data.isHost == false){
                    navigate('/');
                    alert('Must be a host');
                }
                else{
                    setUserID(data.id);
                }
            })
        }
        catch(error){
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
          alert(error);
        }
    }

    return <>
        <div>
            <h1 className="title is-2 pl-5">My Properties</h1>
        </div>
        <div className="tile is-ancestor basetile">
            <div className="tile is-parent">
                <div className="tile is-child box itembox">
                    <Link to="../properties/createproperty" className="tilelink">
                    <figure className="image is-4by3">
                        <img src="add.png" />
                    </figure>
                    <p>
                        <b>Add a New Property</b>
                    </p>
                    </Link>
                </div>
            </div>
            {hostProperties.map((item, index) => {
                return  <div key={index} className="tile is-parent">
                            <div className="tile is-child box itembox">
                            <Link to={`../properties/getproperty/${item.id}`} className="tilelink">
                                <figure className="image is-4by3">
                                    <img src={item.image} />
                                </figure>
                                <p>
                                    <b>{item.property_name}</b> <br />
                                    <b>${item.price_night}</b>/night
                                </p>
                            </Link>
                            </div>
                        </div>
            })}

        </div>
        <div className="field is-grouped is-grouped-centered">
            <p className="control">
                {previous ?
                <button className="button is-primary is-outlined" onClick={previousHandler}>
                Previous
                </button>: <></>
                }
            </p>
            <p className='control'>{currPage}</p>
            <p className="control">
                {next ? <button className="button is-primary is-outlined" onClick={nextHandler}>
                Next
                </button> : <></>}
            </p>
        </div>
    </>
}

export default HostProperty
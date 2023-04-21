import React, { useEffect, useState } from 'react';
import "./style.css";

let token = localStorage.getItem('access');

const HostsReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);
    
    async function fetchReservations() {
        try {
          const response = await fetch("http://localhost:8000/properties/guestreservation/", 
          {headers: { Authorization: `Bearer ${token}` }});  
          console.log("API response: ", response);
          const data = await response.json();
          console.log("Data received: ", data);
          setReservations(data.results);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
    }
    return <>
        {reservations?.map(reservation => {
            return <div key={reservation.id}>
                <section>
                    <div className="columns">
                        <div className="column is-offset-1 is-5">
                            <h2 className="title is-2">Upcoming Reservations</h2>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="table-container"> 
                                <table className="table is-hoverable is-narrow" style={{alignSelf: "flex-style"}}>
                                    <thead>
                                        <tr>
                                        <th>Property</th>
                                        <th>Address</th>
                                        <th>Check-in Date</th>
                                        <th>Check-out Date</th>
                                        <th>Guest Details</th>
                                        <th>Guest Requests</th>
                                        <th>Reservation Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src="assets/picture/house.png" style={{alignSelf: "flex-style"}}></img>
                                            </td>
                                            <td>
                                                <h5 className="title is-5">{reservation.property}</h5>
                                            </td>
                                            <td>
                                                <h5 className="title is-5">{reservation.start_date}</h5>
                                            </td>
                                            <td>
                                                <h5 className="title is-5">{reservation.end_date}</h5>
                                            </td>
                                            <td>
                                                <a href=""><h5 className="title is-5">{reservation.user}</h5></a>
                                            </td>
                                            <td>
                                                <h6 className="title is-6">{reservation.message}</h6>
                                            </td>
                                            <td>
                                                <button className="button is-rounded is-primary">{reservation.status}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="columns">
                        <div className="column is-offset-1 is-5">
                            <h2 className="title is-2">Past Reservations</h2>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="table-container"> 
                                <table className="table is-hoverable is-narrow" style={{alignSelf: "flex-style"}}>
                                    <thead>
                                        <tr>
                                        <th>Property</th>
                                        <th>Address</th>
                                        <th>Check-in Date</th>
                                        <th>Check-out Date</th>
                                        <th>Guest Details</th>
                                        <th>Guest Comments</th>
                                        <th>Reservation Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src="assets/picture/house.png" style={{alignSelf: "flex-style"}}></img>
                                            </td>
                                            <td>
                                                <h5 className="title is-5">{reservation.property}</h5>
                                            </td>
                                            <td>
                                                <h5 className="title is-5">{reservation.start_date}</h5>
                                            </td>
                                            <td>
                                                <h5 className="title is-5">{reservation.end_date}</h5>
                                            </td>
                                            <td>
                                                <a href=""><h5 className="title is-5">{reservation.user}</h5></a>
                                                <block>
                                                    <a href="">Add/View<br></br>comments</a>
                                                </block>
                                            </td>
                                            <td>
                                                <h6 className="title is-6">{reservation.message}</h6>
                                            </td>
                                            <td>
                                                <button className="button is-rounded is-primary">{reservation.status}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        })}
    </>
};

export default HostsReservations;
import React, { useEffect, useState } from "react";

let token = localStorage.getItem("access");

const GuestsReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    async function fetchReservations() {
        try {
            const response = await fetch(
                "http://localhost:8000/properties/guestreservation/",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("API response: ", response);
            const data = await response.json();
            console.log("Data received: ", data);
            setReservations(data.results);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }
    return (
        <>
            <div>
                <h2 className="title is-2 pl-5">My Reservations</h2>
            </div>
            <div className="tile is-ancestor basetile">
                <div className="tile is-parent">
                    <div className="tile is-child box itembox">
                        <a href="" class="tilelink">
                            <figure className="image is-4by3">
                                <img
                                    src="assets/picture/add.png"
                                    alt="Add image"
                                />
                            </figure>
                            <p>
                                <b>Look for another residence?</b>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
            {reservations?.map((reservation) => {
                return (
                    <div key={reservation.id}>
                        <div className="tile is-parent">
                            <div className="tile is-child box itembox">
                                <a href="" className="tilelink">
                                    <figure className="image is-4by3">
                                        <img
                                            src="assets/picture/house.png"
                                            alt="House image"
                                        />
                                    </figure>
                                    <p>
                                        <b>
                                            {
                                                reservation?.property
                                                    ?.property_name
                                            }
                                        </b>{" "}
                                        <br />
                                        <b>
                                            {reservation.start_date}
                                        </b>/night <br />
                                        <b>{reservation.status}</b>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
            ;
        </>
    );
};
export default GuestsReservations;

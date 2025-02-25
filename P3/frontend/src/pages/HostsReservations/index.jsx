import React, { useEffect, useState } from "react";
import "./style.css";

let token = localStorage.getItem("access");

const HostsReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [status, setStatus] = useState({ status: "" });
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        fetchReservations();
    }, [status]);

    async function fetchReservations() {
        try {
            const response = await fetch(
                "http://localhost:8000/properties/hostreservation/",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("API response: ", response);
            const data = await response.json();
            console.log("Data received: ", data);
            if (status.status === "") {
                setReservations(data.results);
                if (data.next !== null) {
                    setNext(data.next);
                }
            } else {
                setReservations(
                    data.results.filter(
                        (reservations) => reservations.status === status.status
                    )
                );
                setNext("");
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    function nextHandler() {
        fetch(next, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setReservations(data.results);
                if (data.next !== null) {
                    setNext(data.next);
                } else {
                    setNext("");
                }
                if (data.previous !== null) {
                    setPrevious(data.previous);
                } else {
                    setNext("");
                }
                setCurrPage((prevPage) => {
                    return prevPage + 1;
                });
            });
    }

    function previousHandler() {
        fetch(previous, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setReservations(data.results);
                if (data.next !== null) {
                    setNext(data.next);
                } else {
                    setNext("");
                }
                if (data.previous !== null) {
                    setPrevious(data.previous);
                } else {
                    setPrevious("");
                }
                setCurrPage((prevPage) => {
                    return prevPage - 1;
                });
            });
    }

    return (
        <>
            <section>
                <div className="columns">
                    <div className="column is-5">
                        <h2 className="title is-2">My Hostings</h2>
                    </div>
                    <div
                        className="dropdown filter is-right is-hoverable"
                        style={{ marginLeft: "95vh", marginTop: "4vh" }}
                    >
                        <div className="dropdown-trigger">
                            <button
                                className="button"
                                aria-haspopup="true"
                                aria-controls="dropdown-menu6"
                            >
                                <span>Sort by: {status.status}</span>
                            </button>
                        </div>
                        <div
                            className="dropdown-menu"
                            id="dropdown-menu6"
                            role="menu"
                        >
                            <div className="dropdown-content">
                                <button
                                    className="dropdown-item"
                                    selected
                                    onClick={() => setStatus({ status: "" })}
                                >
                                    All
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "pend" })
                                    }
                                >
                                    Pending
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "deni" })
                                    }
                                >
                                    Denied
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "expi" })
                                    }
                                >
                                    Expired
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "appr" })
                                    }
                                >
                                    Approved
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "canc" })
                                    }
                                >
                                    Cancelled
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "term" })
                                    }
                                >
                                    Terminated
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "comp" })
                                    }
                                >
                                    Completed
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() =>
                                        setStatus({ status: "peca" })
                                    }
                                >
                                    Pending Cancellation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="table-container">
                            <table
                                className="table is-hoverable is-narrow"
                                style={{
                                    alignSelf: "flex-style",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Name</th>
                                        <th>Check-in Date</th>
                                        <th>Check-out Date</th>
                                        <th>Guest Details</th>
                                        <th>Guest Message</th>
                                        <th>
                                            Reservation Status
                                            <button
                                                class="button is-small is-rounded"
                                                style={{ marginLeft: "1vw" }}
                                                onClick={() =>
                                                    alert(
                                                        "Reservation Status Information\nPending -> Approve: approves a guest's request to rent your property.\nPending -> Deny: denies a guest's request to rent your property.\nApproved -> Terminate: terminates a guest's currently approved stay at your property.\nCompleted -> Add Comment: you are able to comment on the guest regarding their stay.\nPending Cancellation -> Approve: approves a guest's request to cancel their stay at your property.\nCancellation -> Deny: denies a guest's request to cancel their stay at your property."
                                                    )
                                                }
                                            >
                                                <span class="icon">
                                                    <img src="http://localhost:8000/media/info-icon.png" />
                                                </span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                {reservations?.map((reservation) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img
                                                        src={reservation.image}
                                                        style={{
                                                            width: 250,
                                                            height: 150,
                                                        }}
                                                    ></img>
                                                </td>
                                                <td>
                                                    <a
                                                        href={
                                                            "http://localhost:3000/properties/getproperty/" +
                                                            reservation.property +
                                                            "/"
                                                        }
                                                    >
                                                        <h5 className="title is-6">
                                                            {reservation.name}
                                                        </h5>
                                                    </a>
                                                </td>
                                                <td>
                                                    <h5 className="title is-5">
                                                        {reservation.start_date}
                                                    </h5>
                                                </td>
                                                <td>
                                                    <h5 className="title is-5">
                                                        {reservation.end_date}
                                                    </h5>
                                                </td>
                                                <td>
                                                    <a href="">
                                                        <h5 className="title is-5">
                                                            Guest{" "}
                                                            {reservation.user}
                                                        </h5>
                                                    </a>
                                                </td>
                                                <td>
                                                    <h6 className="title is-6">
                                                        {reservation.message}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <div>
                                                        {(() => {
                                                            switch (
                                                                reservation.status
                                                            ) {
                                                                case "pend":
                                                                    return (
                                                                        <div class="dropdown is-hoverable">
                                                                            <div class="dropdown-trigger">
                                                                                <button
                                                                                    class="button is-rounded is-warning"
                                                                                    aria-haspopup="true"
                                                                                    aria-controls="dropdown-menu"
                                                                                >
                                                                                    <span>
                                                                                        Pending
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div
                                                                                class="dropdown-menu"
                                                                                id="dropdown-menu"
                                                                                role="menu"
                                                                            >
                                                                                <div class="dropdown-content">
                                                                                    <button
                                                                                        class="dropdown-item"
                                                                                        onClick={() => {
                                                                                            fetch(
                                                                                                "http://localhost:8000/properties/editreservation/" +
                                                                                                    reservation.id +
                                                                                                    "/",
                                                                                                {
                                                                                                    headers:
                                                                                                        {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                            "Content-Type":
                                                                                                                "application/json",
                                                                                                        },
                                                                                                    method: "PATCH",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            status: "appr",
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Approve
                                                                                    </button>
                                                                                    <hr class="dropdown-divider"></hr>
                                                                                    <button
                                                                                        class="dropdown-item"
                                                                                        onClick={() => {
                                                                                            fetch(
                                                                                                "http://localhost:8000/properties/editreservation/" +
                                                                                                    reservation.id +
                                                                                                    "/",
                                                                                                {
                                                                                                    headers:
                                                                                                        {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                            "Content-Type":
                                                                                                                "application/json",
                                                                                                        },
                                                                                                    method: "PATCH",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            status: "deni",
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Deny
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                case "deni":
                                                                    return (
                                                                        <button
                                                                            class="button is-rounded is-danger"
                                                                            disabled
                                                                        >
                                                                            Denied
                                                                        </button>
                                                                    );
                                                                case "expi":
                                                                    return (
                                                                        <button
                                                                            class="button is-rounded is-danger"
                                                                            disabled
                                                                        >
                                                                            Expired
                                                                        </button>
                                                                    );
                                                                case "appr":
                                                                    return (
                                                                        <div class="dropdown is-hoverable">
                                                                            <div class="dropdown-trigger">
                                                                                <button
                                                                                    class="button is-rounded is-primary"
                                                                                    aria-haspopup="true"
                                                                                    aria-controls="dropdown-menu"
                                                                                >
                                                                                    <span>
                                                                                        Approved
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div
                                                                                class="dropdown-menu"
                                                                                id="dropdown-menu"
                                                                                role="menu"
                                                                            >
                                                                                <div class="dropdown-content">
                                                                                    <button
                                                                                        class="dropdown-item"
                                                                                        onClick={() => {
                                                                                            fetch(
                                                                                                "http://localhost:8000/properties/editreservation/" +
                                                                                                    reservation.id +
                                                                                                    "/",
                                                                                                {
                                                                                                    headers:
                                                                                                        {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                            "Content-Type":
                                                                                                                "application/json",
                                                                                                        },
                                                                                                    method: "PATCH",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            status: "term",
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Terminate
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                case "canc":
                                                                    return (
                                                                        <button
                                                                            class="button is-rounded is-danger"
                                                                            disabled
                                                                        >
                                                                            Cancelled
                                                                        </button>
                                                                    );
                                                                case "term":
                                                                    return (
                                                                        <button
                                                                            class="button is-rounded is-danger"
                                                                            disabled
                                                                        >
                                                                            Terminated
                                                                        </button>
                                                                    );
                                                                case "comp":
                                                                    return (
                                                                        <div class="dropdown is-hoverable">
                                                                            <div class="dropdown-trigger">
                                                                                <button
                                                                                    class="button is-rounded is-primary"
                                                                                    aria-haspopup="true"
                                                                                    aria-controls="dropdown-menu"
                                                                                >
                                                                                    <span>
                                                                                        Completed
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div
                                                                                class="dropdown-menu"
                                                                                id="dropdown-menu"
                                                                                role="menu"
                                                                            >
                                                                                <div class="dropdown-content">
                                                                                    <button class="dropdown-item">
                                                                                        Add
                                                                                        Comment
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                case "peca":
                                                                    return (
                                                                        <div class="dropdown is-hoverable">
                                                                            <div class="dropdown-trigger">
                                                                                <button
                                                                                    class="button is-rounded is-warning"
                                                                                    aria-haspopup="true"
                                                                                    aria-controls="dropdown-menu"
                                                                                >
                                                                                    <span>
                                                                                        Pending
                                                                                        Cancellation
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div
                                                                                class="dropdown-menu"
                                                                                id="dropdown-menu"
                                                                                role="menu"
                                                                            >
                                                                                <div class="dropdown-content">
                                                                                    <button
                                                                                        class="dropdown-item"
                                                                                        onClick={() => {
                                                                                            fetch(
                                                                                                "http://localhost:8000/properties/editreservation/" +
                                                                                                    reservation.id +
                                                                                                    "/",
                                                                                                {
                                                                                                    headers:
                                                                                                        {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                            "Content-Type":
                                                                                                                "application/json",
                                                                                                        },
                                                                                                    method: "PATCH",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            status: "canc",
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Approve
                                                                                    </button>
                                                                                    <hr class="dropdown-divider"></hr>
                                                                                    <button
                                                                                        class="dropdown-item"
                                                                                        onClick={() => {
                                                                                            fetch(
                                                                                                "http://localhost:8000/properties/editreservation/" +
                                                                                                    reservation.id +
                                                                                                    "/",
                                                                                                {
                                                                                                    headers:
                                                                                                        {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                            "Content-Type":
                                                                                                                "application/json",
                                                                                                        },
                                                                                                    method: "PATCH",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            status: "pend",
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Deny
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                            }
                                                        })()}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    );
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div className="field is-grouped is-grouped-centered">
                <p className="control">
                    {previous ? (
                        <button
                            className="button is-primary is-outlined"
                            onClick={previousHandler}
                        >
                            Previous
                        </button>
                    ) : (
                        <></>
                    )}
                </p>
                <p className="control">{currPage}</p>
                <p className="control">
                    {next ? (
                        <button
                            className="button is-primary is-outlined"
                            onClick={nextHandler}
                        >
                            Next
                        </button>
                    ) : (
                        <></>
                    )}
                </p>
            </div>
        </>
    );
};

export default HostsReservations;

import React, { useState, useEffect } from "react";

let token = localStorage.getItem("access");

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isRead, setRead] = useState(Boolean);
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        fetchNotifications();
    }, []);

    async function fetchNotifications() {
        try {
            const response = await fetch(
                "http://localhost:8000/properties/usernotifications/",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("API response: ", response);
            const data = await response.json();
            console.log("Data received: ", data);
            setNotifications(data.results);
            if (data.next !== null) {
                setNext(data.next);
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
                setNotifications(data.results);
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
                setNotifications(data.results);
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
            <div className="columns">
                <div className="column is-5">
                    <h2 className="title is-2">Notifications</h2>
                </div>
            </div>
            {notifications?.map((notification) => {
                return (
                    <div key={notification.id}>
                        <p>
                            <div
                                class="notification"
                                style={{
                                    display: "flex",
                                }}
                            >
                                <button
                                    class="delete"
                                    onClick={() => {
                                        fetch(
                                            "http://localhost:8000/properties/usernotifications/delete/" +
                                                notification.id +
                                                "/",
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                method: "DELETE",
                                            }
                                        );
                                    }}
                                ></button>
                                {notification.notification}
                            </div>
                        </p>
                    </div>
                );
            })}
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

export default Notifications;

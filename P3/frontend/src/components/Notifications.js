import React, { useState, useEffect } from "react";

let token = localStorage.getItem("access");

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isRead, setRead] = useState(Boolean);

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
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
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
                                    justifyContent: "center",
                                    alignItems: "center",
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
                                {() => setRead(notification.is_read)}
                                <button
                                    className="button is-primary is-rounded"
                                    onClick={() => {
                                        fetch(
                                            "http://localhost:8000/properties/usernotifications/update_read/" +
                                                notification.id +
                                                "/",
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                method: "PUT",
                                                body: JSON.stringify({
                                                    is_read: true,
                                                }),
                                            }
                                        );
                                        setRead(true);
                                    }}
                                    style={{ marginLeft: "100vh" }}
                                >
                                    Read: {isRead.toString()}
                                </button>
                            </div>
                        </p>
                    </div>
                );
            })}
        </>
    );
};

export default Notifications;

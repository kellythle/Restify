import React, { useState, useEffect } from 'react';

let token = localStorage.getItem('access');

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    async function fetchNotifications() {
        try {
            const response = await fetch(
                "http://localhost:8000/properties/usernotifications/",
                {headers: { Authorization: `Bearer ${token}` }});  
            console.log("API response: ", response);
            const data = await response.json();
            console.log("Data received: ", data);
            setNotifications(data.results);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }
    return <>
        {notifications?.map(notification => {
            return <div key={notification.id}>
                <p>{notification.notification}</p>
            </div> 
        })}
    </>
}

export default Notifications;
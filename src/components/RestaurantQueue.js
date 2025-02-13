import React, { useState } from "react";
import RoleSelection from "./RoleSelection";
import HotelSelection from "./HotelSelection";
import QueueSelection from "./QueueSelection";
import Navbar from "./Navbar";
import "../styles/global.css";

const RestaurantQueue = ({ user }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <div className="container">
      <Navbar user={user} />
      {!role ? (
        <RoleSelection setRole={setRole} />
      ) : !selectedHotel ? (
        <HotelSelection setSelectedHotel={setSelectedHotel} />
      ) : (
        <QueueSelection selectedHotel={selectedHotel} role={role} />
      )}
    </div>
  );
};

export default RestaurantQueue;

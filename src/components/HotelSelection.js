import React from "react";
import "../styles/hotelSelection.css";

const HotelSelection = ({ setSelectedHotel }) => {
  return (
    <div className="hotel-selection-container">
      <h2 className="hotel-selection-title">Select a Hotel</h2>
      <div className="hotel-buttons">
        <button onClick={() => setSelectedHotel("hotelA")} className="hotel-button hotelA">Hotel A</button>
        <button onClick={() => setSelectedHotel("hotelB")} className="hotel-button hotelB">Hotel B</button>
      </div>
    </div>
  );
};

export default HotelSelection;

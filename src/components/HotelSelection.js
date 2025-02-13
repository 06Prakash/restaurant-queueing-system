import React from "react";

const HotelSelection = ({ setSelectedHotel }) => {
  return (
    <div className="hotel-selection">
      <h2>Select a Hotel</h2>
      <button onClick={() => setSelectedHotel("hotelA")}>Hotel A</button>
      <button onClick={() => setSelectedHotel("hotelB")}>Hotel B</button>
    </div>
  );
};

export default HotelSelection;

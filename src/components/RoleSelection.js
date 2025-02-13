import React from "react";
import "../styles/roleSelection.css";

const RoleSelection = ({ setRole }) => {
  return (
    <div className="role-selection-container">
      <h2 className="role-selection-title">Select a Role</h2>
      <div className="role-buttons">
        <button onClick={() => setRole("customer")} className="role-button customer">Customer</button>
        <button onClick={() => setRole("owner")} className="role-button owner">Hotel Owner</button>
      </div>
    </div>
  );
};

export default RoleSelection;

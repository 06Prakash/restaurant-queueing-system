import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/navbar.css";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Restaurant Queueing System</span>
      {user && (
        <div className="navbar-user">
          <span>{user.email}</span>
          <button className="logout-button" onClick={() => signOut(auth)}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

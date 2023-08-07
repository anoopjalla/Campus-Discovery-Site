import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './Navbar.css';
const Navbar = () => {
    return (
        <div>
            <nav className="nav">
                <a href="/events" className="nav_brand">Raftel</a>
                <ul className="nav_menu">
                    <li className="nav_item">
                        <a href="/about" className="nav_link">About</a>
                    </li>
                    <li className="nav_item">
                        <a href="/future" className="nav_link">Future Events</a>
                    </li>
                    <li className="nav_item">
                        <a href="/signup" className="nav_link">Sign up</a>
                    </li>
                    <li className="nav_item">
                        <a href="/create" className="nav_link">Create</a>
                    </li>
                    <li className = "nav_item">
                        <a href="/rsvp" className="nav_link">RSVP</a>
                    </li>
                    <li className = "nav_item">
                        <a href="/map" className="nav_link">Map</a>
                    </li>
                </ul>
                <div className="nav_toggler">
                    <div className="line1"> </div>
                    <div className="line2"> </div>
                    <div className="line3"> </div>
                </div>
            </nav>
        </div>
    )
  };

  export default Navbar; 
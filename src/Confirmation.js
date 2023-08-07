import React from "react";
import {BrowserRouter as Router, useNavigate, useSearchParams} from 'react-router-dom';
function Confirmation({callback, callbackRole}) {
    const [searchparams] = useSearchParams(); 
    const name = searchparams.get("name");
    const email = searchparams.get("email"); 
    const role = searchparams.get("role"); 
    let color = ""; 
    let font = ""; 
    if (role === "Student") {
        color = "blue"; 
        font = "Times New Roman"; 
    } else if (role === "Teacher") {
        color = "orange"; 
        font = "Arial"; 
    } else {
        color = "red";
        font = "Verdana"; 
    }
    let nav = useNavigate(); 
    function navigateEvents() {
        nav("/events"); 
        callback(name); 
        callbackRole(role); 
        window.sessionStorage.setItem("user", name); 
        window.sessionStorage.setItem("userRole", role); 
    }
    return (
        <div>
            <h1>Signup Confirmation Form</h1>
            <p> Please confirm that the following information is correct.</p>
            <p style={{color: color, fontFamily: font}}> Name: {name} </p>
            <p style={{color: color, fontFamily: font}}> Email: {email} </p>
            <p style={{color: color, fontFamily: font}}> Role: {role} </p>

            <button type="button" value="Submit" onClick={navigateEvents}>The Information is Correct</button>
        </div>
    );
}

export default Confirmation; 
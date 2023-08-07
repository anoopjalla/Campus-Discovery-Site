import React from "react";
import {useNavigate, createSearchParams} from "react-router-dom"

function validateInfo() {
    let name = document.forms["signup-form"]["name"].value.trim(); 
    let email = document.forms["signup-form"]["email"].value.trim(); 
    let role = document.getElementById("role").value; 
    if (name === null || name.length === 0) {
        return false; 
    }
    else if (email === null || email.length === 0 || !email.includes("@")) 
    {
        return false; 
    }
    return true; 
}




function Signup() {
    let nav = useNavigate(); 
    function navigateConfirmation() {
        if (!validateInfo()) {
            alert("Fields cannot be null or empty. Please enter new information."); 
        }
        else {
        let name = document.forms["signup-form"]["name"].value.trim(); 
        let email = document.forms["signup-form"]["email"].value.trim(); 
        let role = document.getElementById("role").value; 
        nav({
            pathname: "/Confirmation",
            search: createSearchParams({
              name: name,
              email: email,
              role: role,
            }).toString()
          });
        }
    }
    return (
        <div>
            <h1>Raftel's Campus Discovery Portal Signup</h1>
            <p> Please enter the following detais: </p>
            <form name="signup-form">
                <div>
                    <label htmlFor="name"> Please enter your full name: </label>
                    <input id="name" name="name" type="text" placeholder="George Burdell" required/>
                </div>
                <div>
                    <label htmlFor="email">Please enter your email: </label>
                    <input id="email" type="email" name="email" placeholder="gburdell12@gatech.edu" required/>
                </div>
                <div>
                    <p> Please select your role below</p>
                    <select name="role" id="role"> required
                        <option id="student" value = "Student">Student</option>
                        <option id="seacher" value = "Teacher">Teacher</option>
                        <option id= "organizer" value = "Organizer">Organizer</option> 
                    </select>
                </div>
                <button type="button" value="Submit" onClick={navigateConfirmation}>Submit</button>
            </form>    
        </div>
    ); 
}

export default Signup; 
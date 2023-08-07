import React from "react";
import {BrowserRouter as Router, useNavigate, useSearchParams} from 'react-router-dom';

function Edit({callback, value}) {
    const [searchparams] = useSearchParams(); 
    const editNum = searchparams.get("index");
    let nav = useNavigate(); 
    function editEvent() {
        let title = document.forms["edit-event-complete-form"]["title"].value.trim(); 
        let host = document.forms["edit-event-complete-form"]["host"].value.trim(); 
        let description = document.forms["edit-event-complete-form"]["description"].value.trim(); 
        let location = document.forms["edit-event-complete-form"]["location"].value.trim(); 
        let time = document.forms["edit-event-complete-form"]["time"].value.trim(); 
        const data = {title: title,
        host: host,
        description: description,
        location: location,
        time: time                
        }
        var t = [];
        for (let i = 0; i < value.length; i++) {
            if(i != editNum) {
                t.push(value[i]); 
            } else {
                t.push(data); 
            }
        }
        callback(t);  
        console.log('set');
        console.log(t); 
        window.sessionStorage.setItem('event', JSON.stringify(t));   
        nav("/future"); 
    }
    return (
        <div>
            <h1>Please Edit your Event below</h1>
            <form name="edit-event-complete-form">
                <div>
                    <label htmlFor="title"> Please enter the title of your event: </label>
                    <input id="title" name="title" type="text" placeholder="George Burdell's Theatre Show" required/>
                </div>
                <div>
                    <label htmlFor="host">Please enter the host's name : </label>
                    <input id="host" type="text" name="host" placeholder="George Burdell" required/>
                </div>
                <div>
                    <label htmlFor="description">Please enter a description for the event : </label>
                    <input id="description" type="text" name="description" placeholder="Watch a Fall Special Theatrical Production." required/>
                </div>
                <div>
                    <label htmlFor="location">Please enter the location for the event: </label>
                    <input id="location" type="text" name="location" placeholder="Ferst Center of Arts" required/>
                </div>
                <div>
                    <label htmlFor="time">Please enter the time and date for the event: </label>
                    <input id="time" type="text" name="time" placeholder="08/24/2022 6:00 P.M." required/>
                </div>
                <button type="button" value="Submit" onClick={editEvent}>Edit Event</button>
            </form>  
        </div>
    );
}

export default Edit; 
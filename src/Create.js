import React, {useState, useContext} from "react";
import Navbar from "./Navbar";

/*export default class Create extends React.Component {
    render() {
       return (
            <div>
                <Navbar></Navbar>
                <h1> Welcome to the Events Creation Page</h1>
                <p>Fill out the following form to create an event</p>
                <form name="create-event-form">
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
                    <button type="button" value="Submit" onClick={}>Create Event</button>
                </form>  
                <a>{}</a>
            </div>
        );
    }
}*/

function Create({callback, value}) {
    /*function createEvent() {
        let title = document.forms["create-event-form"]["title"].value.trim(); 
        let host = document.forms["create-event-form"]["host"].value.trim(); 
        let description = document.forms["create-event-form"]["description"].value.trim(); 
        let location = document.forms["create-event-form"]["location"].value.trim(); 
        let time = document.forms["create-event-form"]["time"].value.trim(); 
        eventList.push(title); 
        console.log(allEvent);
    }*/
    
    function handleAddEvent() {
        let title = document.forms["create-event-form"]["title"].value.trim(); 
        let host = document.forms["create-event-form"]["host"].value.trim(); 
        let description = document.forms["create-event-form"]["description"].value.trim(); 
        let location = document.forms["create-event-form"]["location"].value.trim(); 
        let time = document.forms["create-event-form"]["time"].value.trim(); 
        let guest = document.forms["create-event-form"]["guest"].value.trim();
        let invite = document.getElementById("invite").value; 
        let numGuests = 0; 
        let attendList = []; 
        let maybeList = []; 
        let notList = []; 
        let nemesisList = []; 
        let show = true; 
        let inviteOnly = invite == "Yes"; 
        const data = {title: title,
        host: host,
        description: description,
        location: location,
        time: time,
        guest: guest,
        numGuests: numGuests,
        attendList: attendList,
        maybeList: maybeList, 
        notList: notList,
        nemesisList: nemesisList, 
        inviteOnly: inviteOnly,
        show: show
        }
        var t = [];
        for (let i = 0; i < value.length; i++) {
            t.push(value[i])
        }
        t.push(data); 
        callback(t);  
        console.log('set');
        console.log(t); 
        window.sessionStorage.setItem('event', JSON.stringify(t));   
    }


    return (
        <div>
            <Navbar></Navbar>
            <h1> Welcome to the Events Creation Page</h1>
            <p>Fill out the following form to create an event</p>
            <form name="create-event-form">
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
                <div>
                <label htmlFor="guest">Please enter the guest capacity for your event: </label>
                <input id="guest" type="text" name="guest" placeholder="100" required/>
                </div>
                <div>
                    <p> Please select if you want the event to be invite-only</p>
                    <select name="invite" id="invite"> required
                        <option id="Yes" value = "Yes">Yes</option>
                        <option id="No" value = "No">No</option>
                    </select>
                </div>
                <button type="button" value="Submit" onClick={handleAddEvent}>Create Event</button>
            </form>  
        </div>
    );
}


export default Create;

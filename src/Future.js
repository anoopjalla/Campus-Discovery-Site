import React, {useState} from "react";
import Navbar from "./Navbar";
import "./EventPage.css"; 
import {useNavigate, createSearchParams} from "react-router-dom";

function Future({callback, value, user, userRole, map, mapcall}) {
    //const [allEvent, setAllEvent] = useContext(Context); 
    const [page, setPage] = useState(0); 
    function remove() {
        let removeNum = document.forms["remove-event-form"]["numberRemove"].value.trim(); 
        removeNum = parseInt(removeNum);
        if (user != value[removeNum].host) {
            if(userRole == "Student" || userRole == "Teacher") {
                alert("Do not have access to remove."); 
                return; 
            }
        }
        var t = []; 
        for (let i = 0; i < value.length; i++) {
            t.push(value[i])
        }
        t.splice(removeNum,1); 
        callback(t); 
        console.log('set');
        console.log(t); 
        window.sessionStorage.setItem('event', JSON.stringify(t));  
    }
    let nav = useNavigate(); 
    
    function edit() {
        let editNum = document.forms["edit-event-form"]["numberEdit"].value.trim(); 
        editNum = parseInt(editNum);
        console.log(editNum); 
        nav({
            pathname: "/Edit",
            search: createSearchParams({
              index: editNum
            }).toString()
          });
    }

    const conditional = () => {
        if(value.length > 10) {
            return <div>
                <button type="button" onClick={decrement}>Previous</button>
                <button type="button" onClick={increment}>Next</button>
            </div>;
        } else {
            return null; 
        }
    }

    function increment() {
        var totalPage = value.length/10; 
        if (page + 1 <= totalPage) {
            setPage(page+1); 
        } 
    }
    function rsvp() {
        let eventidx = document.forms["rsvp-event-form"]["numberRSVP"].value.trim(); 
        let status = document.getElementById("status").value; 
        if(value[eventidx].inviteOnly && userRole != "Organizer") {
            alert("Cannot rsvp. Invite only event"); 
            return; 
        }
        var newMap = new Map(); 
        for (const [key,value] of map.entries()) {
            newMap.set(key, value); 
        }

        if(!newMap.has(user)) {
            newMap.set(user,[]); 
        }

        var t = []; 
        for (let i = 0; i < value.length; i++) {
            t.push(value[i]);
        } 
        if(status == "Will Attend") {
            t[eventidx].numGuests++; 
            t[eventidx].attendList.push(user); 
        }
        else if (status == "Maybe") {
            t[eventidx].maybeList.push(user); 
        }
        else if(status == "Won't Attend") {
            t[eventidx].notList.push(user); 
        } 
        else if(status == "I'm Your Nemesis") {
            t[eventidx].nemesisList.push(user); 
        }
        console.log(status); 
        console.log(eventidx); 
        const arr = [eventidx, status]; 
        console.log(arr); 
        newMap.get(user).push(arr); 
        console.log(newMap.get(user)); 
        callback(t); 
        mapcall(newMap); 
        const json = JSON.stringify(Object.fromEntries(newMap)); 
        console.log(json); 
        window.sessionStorage.setItem('map', json); 
        window.sessionStorage.setItem('event', JSON.stringify(t));
    }
    function decrement() {
        if (page - 1 >= 0) {
            setPage(page-1); 
        }
    }

    const attendListPage = (val) => {
        if(val == undefined || val.attendList.length == 0) {
            return null; 
        }
        else {
        return val.attendList.map((val2) => makeAttend(val2));  
        }
    }

    const makeAttend = (val2) => {
        return <div>{val2}</div>;
    }

    const maybeListPage = (val) => {
        if(val == undefined || val.maybeList.length == 0) {
            return null; 
        } else {
            return val.maybeList.map((val2) => makeMaybe(val2));  
        }
    }

    const makeMaybe = (val2) => {
        return <div>{val2}</div>;
    }

    const notListPage = (val) => {
        if(val == undefined || val.notList.length == 0) {
            return null; 
        } else {
            return val.notList.map((val2) => makeNot(val2)); 
        }
    }

    const makeNot = (val2) => {
        return <div>{val2}</div>;
    }

    const nemesisListPage = (val) => {
        if(val == undefined || val.nemesisList.length ==0) {
            return null; 
        } else {
            return val.nemesisList.map((val2) => makeNemesis(val2)); 
        }
    }
    const makeNemesis = (val2) => {
        return <div>{val2}</div>;
    }

    function removeUser() {
        let eventidx = document.forms["rsvp-user-remove-form"]["numberRSVPUser"].value.trim();
        if(user != value[eventidx].host) {
            alert("Do not have access to remove attendees")
            return; 
        }

        let name = document.forms["rsvp-user-remove-form"]["nameRSVPUser"].value.trim();
        let t = []; 
        let idx = 0;
        for (let i = 0; i < value.length; i++) {
            if(value[i].host == name) {
                idx = i; 
            }
            t.push(value[i]);
        }
        let removeIdx = -1;  
        for (let i = 0; i<t[idx].attendList.length; i++) {
            if(t[idx].attendList[i] == name) {
                removeIdx = i; 
            }
        }
        if(removeIdx != -1) {
            t[idx].attendList.splice(removeIdx,1); 
            t[idx].numGuests--; 
        }
        removeIdx = -1; 
        for (let i = 0; i<t[idx].maybeList.length; i++) {
            if(t[idx].maybeList[i] == name) {
                removeIdx = i; 
            }
        }
        if(removeIdx != -1) {
            t[idx].maybeList.splice(removeIdx,1); 
        }
        removeIdx = -1; 
        for (let i = 0; i<t[idx].notList.length; i++) {
            if(t[idx].notList[i] == name) {
                removeIdx = i; 
            }
        }
        if(removeIdx != -1) {
            t[idx].notList.splice(removeIdx,1); 
        }
        removeIdx = -1; 
        for (let i = 0; i<t[idx].nemesisList.length; i++) {
            if(t[idx].nemesisList[i] == name) {
                removeIdx = i; 
            }
        }
        if(removeIdx != -1) {
            t[idx].nemesisList.splice(removeIdx,1); 
        }
        var newMap = new Map()
        
        for (const [key,value] of map.entries()) {
            newMap.set(key, value); 
        }

        removeIdx = -1; 
        for (let i = 0; i < newMap.get(name).length; i++) {
            if(newMap.get(name)[i][0] == eventidx) {
                removeIdx = i; 
            }
        }
        newMap.get(name).splice(removeIdx, 1); 
        callback(t); 
        mapcall(newMap); 
        const json = JSON.stringify(Object.fromEntries(newMap)); 
        window.sessionStorage.setItem('map', json); 
        window.sessionStorage.setItem('event', JSON.stringify(t));
    }
    const makePage = (val, count, pageNum) => {
        var lowerbound = 10 * pageNum; 
        var upperbound = 10 * pageNum + 9; 
        if (count >= lowerbound && count <= upperbound && val.show) {
            return <details>
                <summary>{"Event " + count + ": " + val.title}</summary>
            {"Host: " + val.host}
            <br></br>
            {"Description: " + val.description}
            <br></br>
            {"Location: " + val.location}
            <br></br>
            {"Time: " + val.time} 
            <br></br>
            {"Guest Capacity: " + val.guest}
            <br></br>
            {"Number of Guest: " + val.numGuests}
            <br></br>
            {"Will Attend: "}
            {attendListPage(val)}
            <br></br>
            {"Maybe: "}
            {maybeListPage(val)}
            <br></br>
            {"Won't Attend: "}
            {notListPage(val)}
            <br></br>
            {"I'm Your Nemesis: "}
            {nemesisListPage(val)}
            <br></br>
            {val.inviteOnly == true ? "Invite Only: Yes" : "Invite Only: No"}
            </details>;
        } else {
            return null; 
        }
    }

    function filter() {
        var t = []; 
        console.log(value); 
        let hostFilter = document.forms["filter-user-form"]["filterHost"].value.trim(); 
        let locationFilter = document.forms["filter-user-form"]["filterLocation"].value.trim(); 
        let timeFilter = document.forms["filter-user-form"]["filterTime"].value.trim(); 
        console.log(hostFilter); 
        console.log(locationFilter);
        console.log(timeFilter); 
        for (let i = 0; i < value.length; i++) {
            if(hostFilter.length > 0) {
                if(hostFilter != value[i].host) {
                    value[i].show = false; 
                }
            }
            if(locationFilter.length > 0) {
                if(locationFilter != value[i].location) {
                    value[i].show = false; 
                }
            }
            if(timeFilter.length > 0) {
                if(timeFilter != value[i].time) {
                    value[i].show = false; 
                }
            }
            t.push(value[i]); 
        }
        callback(t);
        window.sessionStorage.setItem('event', JSON.stringify(t));
    }


    function unfilter() {
        var t = [];
        for (var i = 0; i < value.length; i++) {
            value[i].show = true;
            t.push(value[i]); 
            console.log("HI"); 
        }
        callback(t);
        window.sessionStorage.setItem('event', JSON.stringify(t));
    }
    return (
       
        <div>
            <Navbar></Navbar>   
            <h1> Welcome to the Future Events Page</h1>
            <p>Here is are the upcoming events:</p>
            <p>Total Number of Events: {value.length}</p>
            {value.map((val, count) => makePage(val,count,page))}
            {conditional()}
            <form name="remove-event-form">
                <div>
                    <label htmlFor="numberRemove"> Please enter the number of the event you want to remove: </label>
                    <input id="numberRemove" name="numberRemove" type="text" placeholder="0" required/>
                </div>
                <button type="button" value="Submit" onClick={remove}>Remove this Event</button>
            </form> 
            <form name="edit-event-form">
                <div>
                    <label htmlFor="numberEdit"> Please enter the number of the event you want to edit: </label>
                    <input id="numberEdit" name="numberEdit" type="text" placeholder="0" required/>
                </div>
                <button type="button" value="Submit" onClick={edit}>Edit this Event</button>
            </form>
            <form name ="rsvp-event-form">
                <div>
                <label htmlFor="numberRSVP"> Please enter the number of the event you want to rsvp to: </label>
                <input id="numberRSVP" name = "numberRSVP" type = "text" placeholder="0" required/>
                <p> Please select your status below</p>
                    <select name="status" id="status"> required
                        <option id="Will Attend" value = "Will Attend">Will Attend</option>
                        <option id="Maybe" value = "Maybe">Maybe</option>
                        <option id= "Won't Attend" value = "Won't Attend">Won't Attend</option> 
                        <option id= "I'm Your Nemesis" value = "I'm Your Nemesis">I'm Your Nemesis</option>
                    </select>
                </div>
                <button type="button" value="Submit" onClick={rsvp}>RSVP to this Event</button>
            </form>
            <form name="rsvp-user-remove-form">
                <div>
                <label htmlFor="numberRSVPUser"> Please enter the number of the event you want to remove attendees from: </label>
                <input id="numberRSVPUser" name = "numberRSVPUser" type = "text" placeholder="0" required/>
                </div>
                <div>
                <label htmlFor="nameRSVPUser"> Please enter the name of person you want to remove from the event: </label>
                <input id="nameRSVPUser" name = "nameRSVPUser" type = "text" placeholder="George Burdell" required/>
                </div>
                
                <button type="button" value="Submit" onClick={removeUser}>Remove User From Event</button>
            </form>
            <form name="filter-user-form">
                <div>
                <label htmlFor="filterLocation">Please enter the location of events you want to filter by</label>
                <input id="filterLocation" name="filterLocation" type ="text" placeholder="Klaus"></input>
                </div>
                <div>
                    <label htmlFor="filterHost"> Please enter the host of events you want to filter by</label>
                    <input id="filterHost" name="filterHost" type="text" placeholder="Srikar"></input>
                </div>
                <div>
                <label htmlFor="filterTime"> Please enter the time of events you want to filter by </label>
                <input id="filterTime" name="filterTime" type="text" placeholder="08/24/2022 4:00 PM"></input>
                </div>
                <button type="button" value="Submit" onClick={filter}>Filter Events</button>
            </form>
            <button type="button" value="Submit" onClick={unfilter}> Reset Event Filter</button>
        </div>
    );
}
export default Future;
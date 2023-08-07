import React from "react";
import Navbar from "./Navbar";
function Rsvp({map, value, user, mapcall, callback}) {

    function remove() {
        let removeNum = document.forms["rsvp-remove-form"]["removeRSVPNum"].value.trim(); 
        var newMap = new Map(); 
        var t = []; 
        for (let i = 0; i < value.length; i++) {
            t.push(value[i]);
        } 
        for (const [key,value] of map.entries()) {
            newMap.set(key, value); 
        }
        let oldStatus; 
        for (let i = 0; i < newMap.get(user).length; i++) {
            if(newMap.get(user)[i][0] == removeNum) {
                oldStatus = newMap.get(user)[i][1]; 
                newMap.get(user).splice(i,1); 
                break; 
            }
        }
        if(oldStatus == "Will Attend") {
            t[removeNum].numGuests--; 
        }

        if(oldStatus == "Will Attend") {
            let newarr = []
            for (let i = 0; i < value[removeNum].attendList.length; i++) {
                if(value[removeNum].attendList == user) {
                    continue; 
                }
                newarr.push(value[removeNum].attendList[i]); 
            }
            t[removeNum].attendList = newarr; 
        }
        else if(oldStatus == "Maybe") {
            let newarr = []
            for (let i = 0; i < value[removeNum].maybeList.length; i++) {
                if(value[removeNum].maybeList == user) {
                    continue; 
                }
                newarr.push(value[removeNum].maybeList[i]); 
            }
            t[removeNum].maybeList = newarr; 
        } else if(oldStatus == "Won't Attend") {
            let newarr = []
            for (let i = 0; i < value[removeNum].notList.length; i++) {
                if(value[removeNum].notList == user) {
                    continue; 
                }
                newarr.push(value[removeNum].notList[i]); 
            }
            t[removeNum].notList = newarr; 
        } else if(oldStatus == "I'm Your Nemesis") {
            let newarr = []
            for (let i = 0; i < value[removeNum].nemesisList.length; i++) {
                if(value[removeNum].nemesisList == user) {
                    continue; 
                }
                newarr.push(value[removeNum].nemesisList[i]); 
            }
            t[removeNum].nemesisList = newarr; 
        }



        mapcall(newMap);   
        callback(t); 
        const json = JSON.stringify(Object.fromEntries(newMap)); 
        window.sessionStorage.setItem('map', json); 
        window.sessionStorage.setItem('event', JSON.stringify(t));
    }

    function edit() {
        var newMap = new Map(); 
        var t = []; 
        for (let i = 0; i < value.length; i++) {
            t.push(value[i]);
        } 
        for (const [key,value] of map.entries()) {
            newMap.set(key, value); 
        }
        let editNum = document.forms["rsvp-edit-form"]["editnumberRSVP"].value.trim(); 
        let newStatus = document.getElementById("newstatus").value; 
        let oldStatus; 
        for (let i = 0; i < newMap.get(user).length; i++) {
            if (newMap.get(user)[i][0] == editNum) {
                oldStatus = newMap.get(user)[i][1]; 
                newMap.get(user)[i][1] = newStatus; 
                break; 
            }
        }

        if(oldStatus == "Will Attend") {
            let newarr = []
            for (let i = 0; i < value[editNum].attendList.length; i++) {
                if(value[editNum].attendList == user) {
                    continue; 
                }
                newarr.push(value[editNum].attendList[i]); 
            }
            t[editNum].attendList = newarr; 
        }
        else if(oldStatus == "Maybe") {
            let newarr = []
            for (let i = 0; i < value[editNum].maybeList.length; i++) {
                if(value[editNum].maybeList == user) {
                    continue; 
                }
                newarr.push(value[editNum].maybeList[i]); 
            }
            t[editNum].maybeList = newarr; 
        } else if(oldStatus == "Won't Attend") {
            let newarr = []
            for (let i = 0; i < value[editNum].notList.length; i++) {
                if(value[editNum].notList == user) {
                    continue; 
                }
                newarr.push(value[editNum].notList[i]); 
            }
            t[editNum].notList = newarr; 
        } else if(oldStatus == "I'm Your Nemesis") {
            let newarr = []
            for (let i = 0; i < value[editNum].nemesisList.length; i++) {
                if(value[editNum].nemesisList == user) {
                    continue; 
                }
                newarr.push(value[editNum].nemesisList[i]); 
            }
            t[editNum].nemesisList = newarr; 
        }


        if(newStatus == "Will Attend") {
            t[editNum].attendList.push(user); 
        } else if(newStatus == "Maybe") {
            t[editNum].maybeList.push(user);
        } else if(newStatus == "Won't Attend") {
            t[editNum].notList.push(user); 
        } else if(newStatus == "I'm Your Nemesis") {
            t[editNum].nemesisList.push(user); 
        }
        

        if(newStatus == "Will Attend" && oldStatus != "Will Attend") {
            t[editNum].numGuests++; 
        }
        else if(newStatus != "Will Attend" && oldStatus == "Will Attend") {
            t[editNum].numGuests--; 
        }
        console.log(newStatus);
        console.log(oldStatus); 
        mapcall(newMap); 
        callback(t); 
        const json = JSON.stringify(Object.fromEntries(newMap)); 
        window.sessionStorage.setItem('map', json);
        window.sessionStorage.setItem('event', JSON.stringify(t)); 
    }
    const conditional = () => {
        console.log(JSON.stringify(Object.fromEntries(map)));
        console.log(user); 
        console.log(value);
        if(map.has(user) && value != undefined && map.get(user).length > 0) {
            return map.get(user).map((val) => makeRSVP(val));  
        } else {
            return null;
        }
    }
    const makeRSVP = (val) => {
        console.log(val); 
        const idx = val[0];
        const status = val[1];
        return <div><p>{"Event " + idx + ": " + value[idx].title}</p>
               <p>{"Guest Capacity: " + value[idx].guest}</p>
               <p>{"Status: " + status}</p></div>;
    }

    const checkConflicts = () => {
        var countMap = new Map(); 
        var check = false; 
        for (const [key,val] of map.entries()) {
            console.log(key); 
            for (let i = 0; i < map.get(key).length; i++) {
                let eventidx = map.get(key)[i][0]; 
                if (!countMap.has(value[eventidx].time)) {
                    countMap.set(value[eventidx].time, []); 
                } 
                countMap.get(value[eventidx].time).push(eventidx); 
                if(countMap.get(value[eventidx].time).length > 1) {
                    check = true; 
                }
            }
        }
        if(check) {
            var content = []
            for (const [key, val] of countMap.entries()) {
                if(countMap.get(key).length > 1) {
                    console.log(key); 
                    content.push(<div>
                        <p>{"These events have conflict at this time: " + key}</p>
                        {countMap.get(key).map((val) => showConflict(val))}
                    </div>); 
                } 
                console.log(key); 
            }
            return content; 

        }
        else {
            return null; 
        }
    }

    /*const renderConflict = (key, val) => {
        console.log(val); 
        if(val.length > 1) {
            return <div>
                 <p>{"These events have conflict at this time: " + key}</p>
                        {val.map((val2) => showConflict(val2))}
            </div>
        }
        else {
            return null; 
        }
    }*/

    const showConflict = (val) => {
        return <p>{"Event "+ val}</p>
    }

    return (
        <div>   
            <Navbar></Navbar>   
            <h1> You can view your events here!</h1>
            {conditional()}
            <form name="rsvp-remove-form">
                <div>
                <label htmlFor="removeRSVPNum"> Please enter the number of the event you want to remove your rsvp to: </label>
                <input id="removeRSVPNum" name = "removeRSVPNum" type = "text" placeholder="0" required/>
                </div>
                <button type="button" value="Submit" onClick={remove}>Remove RSVP</button>
            </form>

            <form name="rsvp-edit-form">
                <div>
                <label htmlFor="editnumberRSVP"> Please enter the number of the event you want to edit your rsvp to: </label>
                <input id="editnumberRSVP" name = "editnumberRSVP" type = "text" placeholder="0" required/>
                <p> Please select your new status below</p>
                    <select name="newstatus" id="newstatus"> required
                        <option id="Will Attend" value = "Will Attend">Will Attend</option>
                        <option id="Maybe" value = "Maybe">Maybe</option>
                        <option id= "Won't Attend" value = "Won't Attend">Won't Attend</option> 
                        <option id= "I'm Your Nemesis" value = "I'm Your Nemesis">I'm Your Nemesis</option>
                    </select>
                </div>
                <button type="button" value="Submit" onClick={edit}>Edit RSVP</button>
            </form>
            {checkConflicts()}
        </div>
    );
}
export default Rsvp;
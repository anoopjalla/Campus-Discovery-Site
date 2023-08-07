import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Welcome from './Welcome';
import Signup from './Signup';
import Events from './Events';
import Confirmation from './Confirmation';
import Future from './Future';
import About from './About'; 
import Create from './Create';
import Edit from './Edit'; 
import Rsvp from './Rsvp';
import {useState} from "react";
import EventMap from './EventMap'; 

function Parent() {
    var event = window.sessionStorage.getItem('event');
    var sessionmap = window.sessionStorage.getItem('map'); 
    if (event == null) {
        event = []; 
    } else {
        event = JSON.parse(event); 
    }
    if(sessionmap == null) {
        var sessionmap = new Map(); 
    } else {
        var sessionmap = new Map(Object.entries(JSON.parse(sessionmap)));
    }
    var initUser = window.sessionStorage.getItem('user');
    var initUserRole = window.sessionStorage.getItem('userRole');
    if (initUser == null) {
        initUser = ''; 
    }
    if (initUserRole == null) {
        initUserRole = ''; 
    }
    const [allEvent, setAllEvent] = useState(event);
    const [user, setUser] = useState(initUser); 
    const [userRole, setUserRole] = useState(initUserRole); 
    const [map, setMap] = useState(sessionmap); 
    console.log(event); 
    console.log(user);
    console.log(userRole); 
    return(
        <div>
        <Routes>
        <Route exact path='/*' element={<Welcome/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/confirmation' element={<Confirmation callback={setUser} callbackRole={setUserRole}/>}></Route>
        <Route exact path='/events' element={<Events/>}></Route> 
        <Route exact path='/future' element={<Future callback={setAllEvent} value={allEvent} user={user} userRole={userRole} map={map} mapcall={setMap}/>}></Route>
        <Route exact path='/about' el   ement={<About/>}></Route>
        <Route exact path='/create' element={<Create callback={setAllEvent} value ={allEvent}/>}></Route>
        <Route exact path='/edit' element={<Edit callback={setAllEvent} value ={allEvent}/>}></Route>
        <Route exact path='/rsvp' element={<Rsvp map={map} value={allEvent} user={user} mapcall={setMap} callback={setAllEvent}/>}></Route>
        <Route exact path='/map' element={<EventMap value={allEvent} callback={setAllEvent}></EventMap>}></Route>
      </Routes>  
        </div>
    ); 
}



export default Parent; 
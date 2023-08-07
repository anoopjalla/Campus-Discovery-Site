import React, {useState} from "react";
import Navbar from "./Navbar";
import "./EventPage.css"; 
import {useNavigate, createSearchParams} from "react-router-dom"; 
import {TileLayer, Marker, MapContainer, Popup} from "react-leaflet"; 



function EventMap({callback, value}) {
    const position = [33.7772032, -84.3968062] 

    var location_dict = {"Klaus": [33.7772032, -84.3962062], "CRC": [33.7756, -84.4038761], "Culc": [33.7749247, -84.3986035],
    "Tech Green": [33.7740099,-84.3980529], "Brittain Dining Hall": [33.7725161, -84.3912068], "Instructional Center": [33.774763, -84.4027784], 
    }

    const makeMarker = (val, location_dict) => {
      if(val.show == true) {
      return <div>
        <Marker position={location_dict[val.location]}>
            <Popup>
              {val.title} <br/> Host: {val.host} <br/>
              Description: {val.description} <br/>
              Location: {val.location} <br/>
              Time: {val.time} <br/>
            </Popup>
          </Marker>
      </div>
      }
      else {
      return null; 
      }
    }
    

    return (
      <div>
        <Navbar>
        </Navbar>
        <MapContainer center={position} zoom={16} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {value.map((val) => makeMarker(val, location_dict))}
  </MapContainer>
      </div>
    );
}
export default EventMap;
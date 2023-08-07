import React from 'react';
import {useNavigate} from "react-router-dom"
  
const Welcome = () => {
  const navigate = useNavigate();
    
  return (
      <>
        <h1>Welcome Raftel's 2340 Campus Discovery Portal!</h1>
        <button onClick={()=>navigate("/signup")}>Please click this button to go the sign up page!</button>
      </>
  )
};
  
export default Welcome;
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Welcome from './Welcome';
import Signup from './Signup';
import Events from './Events';
import Confirmation from './Confirmation';
import Future from './Future';
import About from './About'; 
import Create from './Create';
import {useState} from "react";
import Parent from './Parent'; 
function App() {
  /*var event = ['a'];*/
 
  return (
    <div className="App"> 
     <Parent>
     </Parent>
    </div>
  );
}

export default App; 
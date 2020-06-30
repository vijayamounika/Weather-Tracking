import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import Demo1 from "./MapView";

function Dashboard() {
  const [latitude, setLatitude] = useState(17.363763199999998);
  const [longitude, setLongitude] = useState(78.4072704);

//   useEffect(() => {
    
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(function (position) {
//         console.log("Latitude is :", position.coords.latitude);
//         console.log("Longitude is :", position.coords.longitude);
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//       });
//     }
//   },[latitude,longitude]);
  function handleMapClickChange(mPros,map, clickEvt) {
      console.log(mPros, map ,clickEvt )
   setLatitude(clickEvt.latLng.lat())
   setLongitude(clickEvt.latLng.lng())
  }
  
  return (
    <Demo1
      google={"hello"}
      latitude={latitude}
      longitude={longitude}
      onMapClicked = {handleMapClickChange}
    />
  );
}

export default Dashboard;

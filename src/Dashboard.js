import React, { useState } from "react";
import MapView from "./MapView";

function Dashboard() {
  const [latitude, setLatitude] = useState(17.363763199999998);
  const [longitude, setLongitude] = useState(78.4072704);
  const [isShow, setIsShow] = useState(false);

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
  function handleMapClickChange(mPros, map, clickEvt) {
    console.log(
      mPros,
      map,
      clickEvt,
      clickEvt.latLng.lat(),
      clickEvt.latLng.lng()
    );
    setLatitude(clickEvt.latLng.lat());
    setLongitude(clickEvt.latLng.lng());
    setIsShow(true);
  }

  return (
    <MapView
      google={"hello"}
      latitude={latitude}
      longitude={longitude}
      onMapClicked={handleMapClickChange}
      isShow={isShow}
    />
  );
}

export default Dashboard;

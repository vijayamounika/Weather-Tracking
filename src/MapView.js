import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow  } from 'google-maps-react';
import Dashboard from "./Dashboard";

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }
  onMarkerClick = (e) =>{
    console.log("hey")

  }
  onMapClicked = () =>{
      console.log("hello")
      
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.props.onMapClicked}
          zoom={14}
          style={mapStyles}
        //   center={{
        //     lat: this.props.latitude,
        //     lng: this.props.longitude
        //   }}
          initialCenter={{
            lat: this.props.latitude,
            lng: this.props.longitude
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
          position={{lat: this.props.latitude,
            lng: this.props.longitude}}
          
        />
        <InfoWindow/>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA7vWDDkimcvyp1gkM757hfKEO-3v1SR_A'
})(Demo1);
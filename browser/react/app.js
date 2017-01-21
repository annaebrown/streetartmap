import _ from "lodash";
import axios from 'axios';
import {
  default as React,
  Component,
} from "react";

import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import Helmet from "react-helmet";

import { 
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
} from "react-google-maps";

const InitialMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

export default class MainMap extends Component {

constructor(props) {
	super(props);

	this.state = {
		//axios request to get all markers
	    markers: [{
	      position: {
	        lat: 25.0112183,
	        lng: 121.52067570000001,
	      },
	      showInfo: false,
	      infoContent: (<div></div>),
	      key: 'New York',
	      defaultAnimation: 2
    	}],
    	formValue: ""
  };

  this.handleMapLoad = this.handleMapLoad.bind(this);
  this.handleMapClick = this.handleMapClick.bind(this);
  this.handleMarkerClick = this.handleMarkerClick.bind(this);
  this.handleMarkerClose = this.handleMarkerClose.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleFormSubmit = this.handleFormSubmit.bind(this);
}


  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    axios.post('/api', {'latitude': lat, 'longitude': lng})
    .then(response => {
      console.log(response.data)
      const nextMarkers = response.data;
    })


    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        showInfo: false,
	    infoContent: 
	    (
		  <form onSubmit={this.handleFormSubmit}>
	        <label>
	          Name:
	          <input type="text" onChange={this.handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
      	),
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      }
    ];

    this.setState({
      markers: nextMarkers,
    });

   }

   handleFormSubmit(event) {
   	console.log('event value', this.state.formValue)

   	event.preventDefault();

   }

   handleChange(event) {
   	this.setState({formValue: event.target.value})
   }

    // if (nextMarkers.length === 3) {
    //   this.props.toast(
    //     "Right click on the marker to remove it",
    //     "Also check the code!"
    //   );
    // }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMarkerClick(targetMarker) {
     this.setState({
       markers: this.state.markers.map(marker => {
         if (marker === targetMarker) marker.showInfo = true
         return marker;
       }),
     });
   }

	handleMarkerClose(targetMarker) {
	 this.setState({
	   markers: this.state.markers.map(marker => {
	     if (marker === targetMarker) marker.showInfo = false
	     return marker;
	   }),
	 });
	}

  render() {
    return (
      <div style={{height: "100%"}}>
        <InitialMap
          containerElement={
            <div style={{ height: '100vh', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '100vh', width: '100vw' }} />
          }
          markers={this.state.markers}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          onMarkerRightClick={this.handleMarkerRightClick}
		  onMarkerClick={this.handleMarkerClick}
		  onMarkerClose={this.handleMarkerClose}
        />
      </div>
    );
  }
}
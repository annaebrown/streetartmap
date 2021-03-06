import InitialMap from './InitialMap.js';

import _ from "lodash";
import axios from 'axios';
import {
  default as React,
  Component,
} from "react";

import {Button} from 'react-bootstrap';

import Helmet from "react-helmet";

import { 
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
} from "react-google-maps";

const imageArray = [
  'images/biggie.jpg',
  'images/child.jpeg',
  'images/einstein.jpeg',
  'images/cookie.jpeg',
  'images/evolve.jpeg',
  'images/eyeball.jpg',
  'images/fox.jpg',
  'images/future.jpeg',
  'images/jayz.jpeg',
  'images/lollipop/jpeg',
  'images/biggie.jpg'
]

export default class MainMap extends Component {

  constructor(props) {
    super(props);
  	
    this.state = {
        markers: [],
      	formValue: ""
    }

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updatingContent = this.updatingContent.bind(this);
  }


  componentDidMount() {
    // this._mapComponent = map;
    axios.get('/api')
      .then(response => {
        const markerData = response.data;
        console.log(response.data)
        const nextMarkers = markerData.map(markerObject => {
          const latLng = {lat: Number(markerObject.latitude), lng: Number(markerObject.longitude)}
          const content = markerObject.content ? markerObject.content : null
          return {
          id: markerObject.id,
          position: latLng,
          content: content
          }
      })
      this.setState({
        markers: nextMarkers
      })
    })
  }

  handleMapClick(event) {

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    axios.post('/api', {'latitude': lat, 'longitude': lng})
      .then(response => {
        const markerData = response.data;
        console.log(response.data)
        const nextMarkers = markerData.map(markerObject => {
          const latLng = {lat: Number(markerObject.latitude), lng: Number(markerObject.longitude)}
          const content = markerObject.content ? markerObject.content : null
          return {
          id: markerObject.id,
          position: latLng,
          content: content
          }
      })
      this.setState({
        markers: nextMarkers
      })
    })
  }

  handleChange(event) {
  	this.setState({formValue: event.target.value})
  }


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
         if (!marker.content) {
          marker.content = (
            <form onSubmit={(event) => {
              console.log(event, marker.id)
              this.updatingContent(this.state.formValue, marker.id)
            }}>
              <label>Description:</label>
              <input type="text" onChange={this.handleChange}/>
              <Button type="submit">
                Submit
              </Button>
            </form>
            )} else {
            marker.imageUrl = imageArray[Math.floor(Math.random() * 10)]
            console.log(imageArray[Math.floor(Math.random() * 10)])
          }
         console.log(marker)
         return marker;
      })
  })
}

 updatingContent(content, markerId) {
  axios.put('/api', {content: content, id: markerId})
  .then(response => {
      const markerData = response.data;
      const nextMarkers = markerData.map(markerObject => {
        const latLng = {lat: Number(markerObject.latitude), lng: Number(markerObject.longitude)}
        const content = markerObject.content ? markerObject.content : null
        return {
          id: markerObject.id,
          position: latLng,
          content: content
        }
      })
      this.setState({
        markers: nextMarkers
      })
   })
 }

	handleMarkerClose(targetMarker) {
	 this.setState({
	   markers: this.state.markers.map(marker => {
	     if (marker === targetMarker) marker.showInfo = false
	     return marker;
	   }),
	 })
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


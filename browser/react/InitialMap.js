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

import 

const InitialMap = withGoogleMap(props => {

// const markers = props.markers;

const fancyStyles = [
  {"featureType":"water","stylers":[{"color":"#19a0d8"}]},
  {"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},
  {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},
  {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},
  {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},
  {"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},
  {"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},
  {"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},
  {"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},
  {"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},
  {"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},
  {"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},
  {"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},
  {"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},
  {"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},
  {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},
  {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},
  {"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}
]


return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={14}
      defaultCenter={{ lat: 40.6944, lng: -73.9213 }}
      onClick={props.onMapClick}
      defaultOptions={{ styles: fancyStyles }}
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
  )
});

export default InitialMap;
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

const InitialMap = withGoogleMap(props => {

// const markers = props.markers;

return (
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
  )
});

export default InitialMap;
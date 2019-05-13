import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Button from '../Button/Button.js';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const google = window.google;



const MapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDN5mCz2_1PMlG3Z7eZZ8NPp9I6rgEzKMQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(() => ({
        isMarkerShown: true,
        markerPosition: null,
         isOpen: false,
         infoOpen: false,
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerLat: e.latLng.lat(),
            markerLng: e.latLng.lng(),
            isMarkerShown:true
        }), 
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
        onMarkerClick: ({infoOpen}) => (e) => ({
      infoOpen: !infoOpen,
            currentMarkerLat: e.latLng.lat(),
            currentMarkerLng: e.latLng.lng(),
    }),
  }),
  withScriptjs,
  withGoogleMap
)(props => (
<div>
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 37.774, lng: -122.4313 }} onClick={props.onMapClick}>
  //goes through data to make markers
  // do i need an array of markers so i can reference them?
  {
    props.data.map(category => (
        props.isMarkerShown && (
          <Marker position={{ lat: category.geometry.coordinates[0], lng: category.geometry.coordinates[1] }} onClick={props.onMarkerClick}/>
        )
                    ))
    }
    //click and marker appears
    {props.isMarkerShown && (
          <Marker position={{ lat: props.markerLat, lng: props.markerLng }} onClick={props.onMarkerClick}/>
        )}
        
          //this only reports if infoOpen is true, not every time marker is clicked
        {props.infoOpen && (
        <Button>
        marker {props.currentMarkerLat}, {props.currentMarkerLng} was clicked on
        </Button>
        )}
  </GoogleMap>
      <div>

      </div>
  </div>
));

ReactDOM.render(<MapComponent isMarkerShown />, document.getElementById("root"));

export default MapComponent;


import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withState, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

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
  
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 37.774, lng: -122.4313 }}>
  {
    props.data.map(category => (
        props.isMarkerShown && (
          <Marker position={{ lat: category.geometry.coordinates[0], lng: category.geometry.coordinates[1] }} />
        )
                    ))
    }

  </GoogleMap>
));

ReactDOM.render(<MapComponent isMarkerShown />, document.getElementById("root"));

export default MapComponent;


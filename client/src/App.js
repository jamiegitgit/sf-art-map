/* global google */

import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';


import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';
import MapContainer from './components/MapContainer/MapContainer.js';
import GoogleMap from './components/GoogleMap/GoogleMap.js';

const google = window.google;

let exampleData= [
    {
      "type": "Feature",
      "properties": {
            "name": "mural 1",
            "artist": "bob ross"
            },
      "geometry": {
        "type": "Point",
        "coordinates": [
           37.790523241426946,
          -122.42563247680664

        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
            "name": "mural 2",
            "artist": "keith Harring"
            },
      "geometry": {
        "type": "Point",
        "coordinates": [
           37.78563944612241,
          -122.40211486816406
          
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
            "name": "sculpture 1",
            "artist": "doug jones"
            },
      "geometry": {
        "type": "Point",
        "coordinates": [
           37.783468766829,
          -122.44091033935547
          
        ]
      }
    }
  ]


class App extends Component {
constructor() {
  super();
  this.state = {
    zoom: 13,
    maptype: 'roadmap',
    data: null,
    userMarkerCoord: {lat: 37.773972, lng: -122.431297},
  }
}



  componentDidMount() {
      this._isMounted = true;

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng: -122.431297},
      zoom: 13,
      mapTypeId: 'roadmap',
    });
    
    let userMarker = new window.google.maps.Marker({
      map: map,
      position: {lat: 37.773972, lng: -122.431297},
    });
    
        map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });

    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });
    
      map.addListener('click', (e) =>{
        this.placeMarker(e.latLng, map, userMarker);
      });
    


    
    
    this.fetchArtListing(map);


    
  }
  
  
    componentWillUnmount() {
    this._isMounted = false;
  }
  

    placeMarker(latLng, map, userMarker) {

        this.setState({
        userMarkerCoord: latLng,
      });
      console.log(this.state.userMarkerCoord)
      userMarker.setPosition(this.state.userMarkerCoord)
    }


  fetchArtListing(map) {
    console.log('Fetching data from Mongo');
    fetch('/api/mongodb/ArtCollectionServer/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        this.setState({
          data: data,
        });
        console.log("art collection from mongo", this.state.data)
              for (let item of this.state.data) {
        //console.log("item is:", item);
          let coords = item.geometry.coordinates
          var latLng = new google.maps.LatLng(coords[0],coords[1]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      });

}


  render() {
    return (
      <div className="App">
        <nav className="App-navigation">
          <h1 className="App-title">MERN Starter</h1>
          <Link to="/">Welcome</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/write/">Write Article</Link>
        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/blog/' component={Blog} />
            <Route exact path='/write/' component={WriteArticle} />
          </Switch>

          <div id='app'>
                <div id='map' />
          </div>


          
        </div>

      </div>
    );
  }
}

export default App;

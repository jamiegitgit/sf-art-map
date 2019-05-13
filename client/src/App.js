import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';
import MapComponent from './components/MapComponent/MapComponent.js';


let exampleData= {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
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
      "properties": {},
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
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
           37.783468766829,
          -122.44091033935547
          
        ]
      }
    }
  ]
}


class App extends Component {
  state = {
    data: exampleData.features,
  }
  
  
  render() {
    return (
    <div>
          <script>
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDN5mCz2_1PMlG3Z7eZZ8NPp9I6rgEzKMQ=3.31&libraries=geometry,drawing,places"
      </script>
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
          <MapComponent isMarkerShown='true' data={this.state.data} lat='37.77' lng='-122.4'/>
          {console.log(this.state.data)}
          <div className="space">
          </div>
        </div>

      </div>

      </div>
    );
  }
}

export default App;

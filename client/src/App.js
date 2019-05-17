import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';
import MapContainer from './components/MapContainer/MapContainer.js';

let exampleData= {
  "type": "FeatureCollection",
  "features": [
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
}

class App extends Component {
   state = {
        data: exampleData,
  };

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
          <MapContainer data={this.state.data}/>
        </div>

      </div>
    );
  }
}

export default App;

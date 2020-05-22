import React from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {HomeView} from './views/HomeView'
import CameraView from './views/CameraView'
import ResultsView from './views/ResultsView'
import InfoView from './views/InfoView'

export default function App() {

  let [color, setColor] = React.useState('r')

  function handleColor(){
    if(color==='r'){
      setColor('b')
    } else if(color=='b'){
      setColor('y')
    } else if (color=='y'){
      setColor('r')
    }
  }
  return (
    <Router>
      <div className="app">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/camera">Camera</Link>
            </li>
          
          </ul>
        </nav> */}

       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/camera">
            
            <CameraView color={color} colorCallback={handleColor}/>
          </Route>
          <Route path="/results">
            <ResultsView color={color}/>
          </Route>
          <Route path="/info">
            <InfoView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

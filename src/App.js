import React from 'react';
//import logo from './splash_logo.png';
import './css/App.css';
import './css/animate.css';
import RandomAnimations from './components/RandomAnimations.js';
//import sitedata from './data/site.data';
const songs = ["Kill Myself"]


function App() {
  return (
    <div className="App">
        <RandomAnimations />
    </div>
  );
}

export default App;

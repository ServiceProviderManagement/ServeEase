import React from 'react';
import { useState } from "react";

import './HeroSection.css';
import '../App.css';
// import { Button } from './Button';
import './SearchBar';
import './SearchBar.css';
// import SearchBar from './SearchBar';
import { SB } from './SB';
import { SRL } from './SRL';
// import LocationDisplay from './LocationDisplay';
import LocationInput from './LocationInput';



function HeroSection() {
    const [results, setResults] = useState([]);

  return (
    
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
    
      <p><h1>Home Services , On Demand</h1></p>
      <hr></hr>
      {/* <SearchBar/> */}
      <LocationInput/>
      {/* <LocationDisplay/> */}

      <div className="App">

      <div className="search-bar-container">
        <SB setResults={setResults} />
        {results && results.length > 0 && <SRL results={results} />}
      </div>
    </div>
      </div>
  )
}

export default HeroSection
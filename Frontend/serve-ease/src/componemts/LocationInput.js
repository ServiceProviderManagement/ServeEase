import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationInput.css';


const LocationInput = () => {
  const [city, setCity] = useState('Loading...');
  const [tel, setTel] = useState('');
  const [dist, setDist] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postcode, setPostcode] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        axios
          .get(url)
          .then((response) => {
            const data = response.data;
            setCity(data.address.suburb);
            setTel(data.address.county);
            setDist(data.address.state_district);
            setState(data.address.state);
            setCountry(data.address.country);
            setPostcode(data.address.postcode);
          })
          .catch((error) => console.error(error));
      },
      (error) => console.error(error)
    );
  }, []);

  return (
    <div className="location">
      <h2></h2>
      <h3>{city}</h3>
      <h6>{tel} {dist} {state} {country} {postcode}</h6>
    </div>
  );
};

export default LocationInput;

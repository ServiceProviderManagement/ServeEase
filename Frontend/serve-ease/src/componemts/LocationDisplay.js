import React, { useState, useEffect } from 'react';

function LocationDisplay() {
  const [userCity, setUserCity] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const opencageAPIKey = 'ba66de2ff2f1443b93470ba32af53e09';
        const opencageAPI = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${opencageAPIKey}`;

        try {
          const response = await fetch(opencageAPI);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const city = data.results[0].components.city || 'Unknown';
            setUserCity(city);
          } else {
            setUserCity('Unknown');
          }
        } catch (error) {
          console.error("Error fetching user city:", error);
          setUserCity('Unknown');
        }
      });
    }
  }, []);

  return (
    <div className="location-display">
      Your Location: {userCity}
    </div>
  );
}

export default LocationDisplay;

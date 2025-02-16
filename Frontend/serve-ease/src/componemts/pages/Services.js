import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Services.css'; // Make sure to update the path accordingly

function Services() {
  const servicesData = [
    'Salon For Women',
    'Hair, Skin & Nails',
    'Women\'s Therapies',
    'Salon For Men',
    'Men\'s Therapies',
    'AC/Appliance Repair',
    'Home Painting',
    'Cleaning & Pest Control',
    'Home Repairs',
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [notAvailable, setNotAvailable] = useState(false); // State for showing the not available message
  const filteredServices = servicesData.filter(service =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setNotAvailable(false); // Reset not available message when search term changes
  };

  const handleSearchClick = () => {
    if (!filteredServices.length) {
      setNotAvailable(true);
    }
  };

  return (
    <div className="services-container">
      <div className="services-box">
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search services"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
        <div className="services-list">
          {filteredServices.map((service, index) => (
            <Link key={index} to={`/services/${service}`} className="service-link">
              <div className="service-box">
                {service}
              </div>
            </Link>
          ))}
          {notAvailable && <p className="not-available-message">Sorry, We are on the way to Introduce this Service</p>}
        </div>
      </div>
    </div>
  );
}

export default Services;

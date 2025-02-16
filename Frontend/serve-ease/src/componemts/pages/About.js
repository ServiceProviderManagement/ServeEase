import React from 'react';
import './About.css'; // Make sure to update the path accordingly

function About() {
  return (
    <div>
      <div className="section">
        <h1>About Us</h1>
        <br></br>
        <br></br>
        <h3 className="center-text">Who we are</h3>
        <br></br>
        <p>ServeEase Company is a technology platform offering a variety of services at home. Customers use our platform to book services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. These services are delivered in the comfort of their home and at a time of their choosing. We promise our customers a high quality, standardized and reliable service experience. To fulfill this promise, we work closely with our hand-picked service partners.</p>
        <p><strong>Our Vision:</strong> Empower local professionals to deliver services at home like never experienced before</p>
      </div>

      <div className="section">
        <h3 className="center-text">How We do it</h3>
        <br></br>
        <p>ServeEase Company provides a platform that allows skilled and experienced professionals to connect with users looking for specific services. Once on the platform, our match-making algorithm identifies professionals who are closest to the users' requirements and available at the requested time and date.</p>
      </div>

      <div className="section center-text">
        <h1>Our Developers Team</h1>
        <div className="team-container">
          <div className="team-member">
            <img src alt="Chinmayi Hankare" />
            <p><strong>Chinmayi Hankare</strong></p>
            <p>(Team Member)</p>
          </div>
          <div className="team-member">
            <img src alt="ALif" />
            <p><strong>Alif Shaikh</strong></p>
            <p>(Team Member)</p>
          </div>
          <div className="team-member">
            <img src alt="Ayush Raut" />
            <p><strong>Ayush Raut</strong></p>
            <p>(Team Member)</p>
          </div>
          <div className="team-member">
            <img src alt="Firdous sayyed" />
            <p><strong>Firdous sayyed</strong></p>
            <p>(Team Member)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
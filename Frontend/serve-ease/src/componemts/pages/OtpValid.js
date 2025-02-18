import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './OtpValid.css'; // Import your custom CSS for styling

export const OtpValid = () => {
  const history = useHistory();
  const [otp, setOTP] = useState('');

  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pin_code, setPin_code] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        axios
          .get(url)
          .then((response) => {
            const data = response.data;
            setAddress1(data.address.suburb);
            setCity(data.address.county);
            setDistrict(data.address.state_district);
            setState(data.address.state);
            setPin_code(data.address.postcode);
          })
          .catch((error) => console.error(error));
      },
      (error) => console.error(error)
    );
  }, []);

  

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleVerifyOTPAndRegister = async () => {
    try {

      const addressData=
      {
        address1,
        city,
        district,
        state,
        pin_code
      };
      // Send entered OTP to the server for verification
      const otpVerificationResponse = await fetch(`http://localhost:49471/api/saveuser/?MailedOtp=${otp}`)
      if (otpVerificationResponse.ok) {
        // OTP verification successful, proceed with registration
      toast.success('OTP verification successful! You can now  Login.');
      history.push('/SignIn'); // Replace with your actual route

        
      }
      else
      throw new Error('OTP verification failed');
      
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
      console.error('OTP Verification Error:', error);
    }
  };

  return (
    <div className="SignIn">
        <div className="wrapper2">
    <div className="otp-validation-container">
      <div className="otp-validation-content">
        <h2>OTP Validation</h2>
        <p>Please enter the OTP sent to your email:</p>
        <input
          type="text"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
          className="otp-input"
        />
        <button onClick={handleVerifyOTPAndRegister} className="verify-button">Verify OTP</button>
      </div>
    </div>
    </div>
    </div>
  );
};


import './Register.css'
import '../../App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

// import { Link } from 'react-router-dom';

// import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


export const Register = () => { 

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [mobile, setMobileNo] = useState('');
  const [dob, setDOB] = useState('');
  const [role_id, setRole] = useState(''); // Default role is 'patient'

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleMobileNoChange = (event) => {
    setMobileNo(event.target.value);
  };

  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.id;
   
    setRole(selectedRole);
  };

debugger;


const handleSubmit = async (event) => {
  event.preventDefault();

  const requestData = {
    email,
    password,
    first_name,
    last_name,
    mobile,
    dob,
    role_id
  };

  try {
    const response = await axios.post('http://localhost:49471/servease/SignUp', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Registration failed');
    }

    toast.success('Sign-up successful! You can now log in.');
    history.push('/OtpValid');
  } catch (error) {
    toast.error('Sign-up failed. Please try again.');
    console.error('Sign-up Error:', error);
  }
};


  return (
    
    <div className='SignIn11'>

    <div className='wrapper1'>
     

    <div className='form-box register'>
    <h2>Register</h2> 
     <form onSubmit={handleSubmit}>

       <div className="input-box1"> {/* Added 'className' */}
         <span className="icon">
         <ion-icon name="person"></ion-icon>
         </span> {/* Added 'className' */}
         <input type="text" required 
         value={first_name}
         onChange={handleFirstNameChange}/>
         <label>First Name</label> {/* Fixed the spelling of 'Email' */}
       </div>

       <div className="input-box1"> {/* Added 'className' */}
         {/* <span className="icon">
           <ion-icon name="mail"></ion-icon>
         </span> Added 'className' */}
         <input type="text" required
         value={last_name}
         onChange={handleLastNameChange} />
         <label>Last Name</label> {/* Fixed the spelling of 'Email' */}
       </div>

       <div className="input-box1"> {/* Added 'className' */}
       
         <input type="date" required 
         value={dob}
         onChange={handleDOBChange}/>
         <label>Date Of Birth</label> {/* Fixed the spelling of 'Email' */}
       </div>

       <div className="input-box1"> {/* Added 'className' */}
         <span className="icon">
         <ion-icon name="keypad"></ion-icon>
         </span> {/* Added 'className' */}
         <input type="tel" required 
         value={mobile}
         onChange={handleMobileNoChange} />
         <label>Mobile Number</label> {/* Fixed the spelling of 'Email' */}
       </div>

       <div className="input-box1"> {/* Added 'className' */}
         <span className="icon">
           <ion-icon name="mail"></ion-icon>
         </span> {/* Added 'className' */}
         <input type="email" required 
         value={email}
         onChange={handleEmailChange}/>
         <label>Email</label> {/* Fixed the spelling of 'Email' */}
       </div>


       
       <div className="input-box1"> {/* Added 'className' */}
         <span className="icon">
           <ion-icon name="lock-closed"></ion-icon>
         </span> {/* Added 'className' */}
         <input type="password" required 
         value={password}
         onChange={handlePasswordChange}/>
         <label>Password</label> {/* Fixed the spelling of 'Email' */}
       </div>

       <div className="role-selection">
              <input type="radio" id="customer" name="role" value={role_id} onChange={handleRoleChange} required />
              <label htmlFor="customer">Customer</label>
              <input type="radio" id="sp" name="role" value={role_id} onChange={handleRoleChange} required />
              <label htmlFor="sp">Service Provider</label>
            </div> 
      
       
       <button type="submit" className="btn">Register</button> {/* Fixed closing tag and attribute */}

       {/* Don't have an account */}
       <div className='login-register'>
         <p>Already have an account? <a href="SignIn" className='login-link'>Login</a></p>
       </div>


     </form> 

   

   </div>

          


   </div>

         

   </div>

  )
}





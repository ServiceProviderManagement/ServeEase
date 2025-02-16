

import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UpdateProfile.css'

const UpdateProfile = () => {
  const [user_id, setUserId] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [role_id, setRole] = useState('');
  const history = useHistory();
  const [user, setUser] = useState([]);

  

  useEffect(() => {

    fetchUserData();
  }, [user_id]);



  const fetchUserData = async () => {
    try {
debugger;
      const user_id= sessionStorage.getItem('user_id')

      const response = await axios.get(`http://localhost:49471/servease/SignUp/${user_id}`); 
      const userData = response.data;
      setUserId(userData.userId);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setMobile(userData.mobile);
      setEmail(userData.email);
      setDob(userData.dob);
      setPassword(userData.password);
      setRole(userData.role_id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prepare updated data
    const updatedData = {
      user_id,
      first_name,
      last_name,
      mobile,
      email,
      password,
      dob,
    };
 
    try {

      debugger;
      const user_id= sessionStorage.getItem('user_id')


      await axios.put(`http://localhost:49471/servease/SignUp/${user_id}`, updatedData)
      .then(response =>{
        const userData = response.data;
                  setUser(userData);
        
    });
      toast.success('Profile updated successfully');
      history.push(`/ViewProfile`);
        window.location.reload() ;
    } catch (error) {
      console.error('Error updating profile:', error);
        window.location.reload() ;
    }
  };

  return (
    <div className='SignIn5'>
      <div className='container5'>

     
    <Container className="p-4">
      <h2 className="text-center">Update Profile</h2>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="card">
            <div className="card-body">
              <Form>
              <div className="mb-3" hidden>
                  <input
                    type="text"
                    value={user_id}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={first_name}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="last name"
                    value={last_name}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="mobile number"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    readOnly
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="mb-3" >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="mb-3" >
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                  />
                </div>

                <div className="mb-3" hidden>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your role"
                    value={role_id}
                    readOnly
                    onChange={(event) => setRole(event.target.value)}
                  />
                </div>

               

                <div className="text-center">
                  <Button variant="primary" onClick={handleSubmit}>
                    Update Profile
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  );
};

export default UpdateProfile;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {  Link} from 'react-router-dom';
import './ViewProfile.css'

const ViewProfile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id= sessionStorage.getItem('user_id')
// debugger;
        const response = await axios.get(`http://localhost:49471/servease/SignUp/${user_id}`)

        .then(response =>{
            const userData = response.data;
                      setUser(userData);
            
        })
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
    });



  return (
    <div className='SignIn3'>
     <div className='container'>   
    <Container className="p-4">
      <h2 className="text-center">Welcome , {sessionStorage.getItem('first_name')}</h2>
      {user && (
        <Row className="justify-content-center">
          <Col md={8}>
            <Table striped bordered hover>
              <tbody>
                <tr style={{display:'none'}}>
                  <td><strong>User ID:</strong></td>
                  <td>{user.user_id}</td>
                </tr>
                <tr>
                  <td><strong>First Name:</strong></td>
                  <td>{user.first_name}</td>
                </tr>
                <tr>
                  <td><strong>Last Name:</strong></td>
                  <td>{user.last_name}</td>
                </tr>
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{user.mobile}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td><strong>Date of Birth:</strong></td>
                  <td>{user.dob}</td>
                </tr>
                <tr style={{display:'none'}}>
                  <td><strong>Role:</strong></td>
                  <td>{user.role_id}</td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center">
              <Link to={'/UpdateProfile'} className="btn btn-primary">
                Update Profile
              </Link>
            </div>
            {/* <div className="text-center">
              <Link to={'/DeleteProfile'} className="btn btn-primary">
                Delete  Profile
              </Link>
            </div> */}
          </Col>
        </Row>
      )}
    </Container>
    </div>
    </div>
  );
};

export default ViewProfile;

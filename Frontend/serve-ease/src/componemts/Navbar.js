import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import Dropdown from 'react-bootstrap/Dropdown'; // Import the Dropdown component
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from 'react-router-dom';



function Navbar() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);
    const history = useHistory();


    const user_id = window.sessionStorage.getItem("user_id");
  const role_id = sessionStorage.getItem('role_id'); // Get the user's role from local storage
  var login = window.sessionStorage.getItem("isLoggedIn")=== "true"; 

  useEffect(() => {
    showButton();
    setButton(login);
  }, [login]);

  const logout=()=>
  {
    sessionStorage.clear();
    history.push('/')
    window.location.reload();
    
  }


    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };
    
      useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', showButton);
        };
      }, []);




  return (
    <>
   <nav className="navbar">
    <div className="navbar-container" >
        <Link to="/" className="navbar-logo">
        ServeEase
            <i class='fab fa-typo3' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Services' className='nav-links' onClick={closeMobileMenu}>
              Services
              </Link>
            </li>
          
            <li className='nav-item'>
              <Link to='/About' className='nav-links' onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Contacts' className='nav-links' onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/Notifications' className='nav-links' onClick={closeMobileMenu}>
              <i class='fas fa-bell' ></i>
              {/* style='font-size:48px;color:red' */}
              </Link>
            </li>
            
            {/* <li className='nav-item'> */}
            <li className='nav-item'>
              {login ? (
                
              <Dropdown className='drop'>
                <Dropdown.Toggle variant="success" id="profile-dropdown">
                  <i className="fas fa-user" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to={`/ViewProfile`} className="dropdown-item">
                    Profile
                  </Link>
                    {role_id === 'sp' && (
                  <>
                    <Link to={`/HomeSp`} className="dropdown-item">
                      Appointments
                    </Link>
                    <Link to={`/DashBoardSP`} className="dropdown-item">
                      Dashboard
                    </Link>
                    <Link to={`/ReviewSP`} className="dropdown-item">
                      Review
                    </Link>
                  </>
                  )}
                  {role_id === 'customer' && (
                  <>
                    {/* <Link to={`/AllAppointmentsCust/?user_id=${user_id}`} className="dropdown-item">
                      Appointments
                    </Link> */}
                    <a href={`/AllAppointmentsCust/?user_id=${user_id}`} className="dropdown-item">Appointments</a>
                  </>
                  )}
                  <Link to="/" className="dropdown-item">
                    <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
              
              ) : (
              <Link to='/SignIn' className='nav-links' >
                SIGN IN
              </Link>
              // <Button buttonStyle='btn--outline' destination='/SignIn'>SIGN IN</Button>
              )}
              </li>
            {/* </li> */}
          </ul>
        </div>
        
   </nav>
    
    </>
  )
}

export default Navbar
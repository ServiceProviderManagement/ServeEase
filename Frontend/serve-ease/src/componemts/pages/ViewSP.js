import React from 'react'
import './DashBoardSP.css'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; 


// import { useParams } from 'react-router-dom';



export const ViewSP = () => {

    const [user, setUser] = useState([]);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const spId = urlParams.get('sp_id');
    const userId = window.sessionStorage.getItem("user_id");
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const spUser_id= urlParams.get('spUser_id')
 debugger;
        const response = await axios.get(`http://localhost:49471/servease/ServiceProvider/${spUser_id}`)

        setUser(response.data);
      
      } catch (error) {
        toast.error('Error fetching data:', error);
      }
    }
    fetchData()
    },[]);




    return (
        <>
          
            
            <div className="frame-child36" />
              <div className="update-dashboard">
                {user.profession}</div>
      <div className='SignIn1'>
      
                <div className="dashboard-form">
                {user && (
                <form className='form' >
      
                <div className="form-banner">
                  {/* <label htmlFor="banner">Banner Image :</label>
                  <input type="file" id="banner" name="banner" accept="image/*" */}
                  <img src={user.profile_pic} className='img' alt=''></img>

                 
                </div>
                
                  <div className="form-group">
                  <label htmlFor="Profession">Profession :</label>

                    <input type="text" 
                    id="serviceTitle" 
                    name="serviceTitle" 
                    value={user.profession}
                    readOnly 
                    
                       />
                  </div>
      
                  <div className="form-group">
                  <label htmlFor="Expertise">Expertise :</label>

                    <input type="text" 
                    id="expertise" 
                    name="expertise" 
                    value={user.expertise }
                    readOnly 
                    
                    />
                  </div>
                  <div className="form-group">
                  <label htmlFor="Experience">Experience :</label>

                    <input type="number" 
                    id="experience" 
                    name="experience" 
                    value={user.experience }
                    readOnly
                    />
                  </div>
                  <div className="form-group">
                  <label htmlFor="Description">Description :</label>

                    <textarea id="description"
                     name="description"
                      rows="6" 
                      value={user.description }
                      readOnly
                    />
                  </div>
                  <div className="form-group1">
                  <label htmlFor="Charges">Charges :</label>

                    <input type="number" 
                    id="charges" 
                    name="charges"  
                    value={user.charges }
                    readOnly
                    />
                  </div>
      
                 
                  <Link to={`/AddAppointment/?sp_id=${spId}&user_id=${userId}`}> 
                  {/* <Link to=""> */}
                <button className="primary-button" type="submit">
                  Add Appointment
                </button>
              </Link>
                </form>
                )}
              </div>
              
              </div>
             
      </>
      
            
            
            
               
        );
}


// import React from 'react'
// import './DashBoardSP.css'
// import  { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom'; 


// // import { useParams } from 'react-router-dom';



// export const ViewSP = () => {

//     const [user, setUser] = useState('[]');
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const spId = urlParams.get('sp_id');
//     const userId = window.sessionStorage.getItem("user_id");
    
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const spUser_id= urlParams.get('spUser_id')
// //  debugger;
// //         const response = await axios.get(`http://localhost:49471/servease/getSPDtlsBySpId/${spId}`)

// //         setUser(response.data);
      
// //       } catch (error) {
// //         toast.error('Error fetching data:', error);
// //       }
// //     }
// //     fetchData()
// //     },[]);

//   const [serviceProviders, setServiceProviders] = useState('');

//   useEffect(() => {
//     const fetchData = async (spId) => {
//       try {
//         const response = await fetch(`http://localhost:49471/servease/getSPDtlsBySpId/${spId}`);
//         if (response.ok) {
//           const json = await response.json();
//           const filteredSPs = json.filter((user) => (
//             user &&
//             user.sp_id &&
//             user.user_id &&
//             user.profession &&
//             user.first_name &&
//             user.last_name  &&
//             user.expertise &&
//             user.experience &&
//             user.description &&
//             user.AverageRating ||
//             user.charges ||
//             user.profile_pic &&
//             user.other_images
            
//           ));
//           setServiceProviders(filteredSPs);
//         } else {
//           console.error('Failed to fetch service providers');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
 
//     fetchData(spId);

//   }, [spId]);
  

      




//     return (
//         <>
//           <div className="frame-child36" />
//               <div className="update-dashboard">
//                 {user.first_name}
//               </div>
//       <div className='SignIn1'>
      
//                 <div className="dashboard-form">
//                 {user && (
//                 <form className='form' >
      
//                 <div className="form-banner">
//                   {/* <label htmlFor="banner">Banner Image :</label>
//                   <input type="file" id="banner" name="banner" accept="image/*" */}
//                   <img src={user.profile_pic} className='img' alt=''></img>

                 
//                 </div>
                
//                   <div className="form-group">
//                   <label htmlFor="Profession">Profession :</label>

//                     <input type="text" 
//                     id="serviceTitle" 
//                     name="serviceTitle" 
//                     value={user.profession}
//                     readOnly 
                    
//                        />
//                   </div>
      
//                   <div className="form-group">
//                   <label htmlFor="Expertise">Expertise :</label>

//                     <input type="text" 
//                     id="expertise" 
//                     name="expertise" 
//                     value={user.expertise }
//                     readOnly 
                    
//                     />
//                   </div>
//                   <div className="form-group">
//                   <label htmlFor="Experience">Experience :</label>

//                     <input type="number" 
//                     id="experience" 
//                     name="experience" 
//                     value={user.experience }
//                     readOnly
//                     />
//                   </div>
//                   <div className="form-group">
//                   <label htmlFor="Description">Description :</label>

//                     <textarea id="description"
//                      name="description"
//                       rows="6" 
//                       value={user.description }
//                       readOnly
//                     />
//                   </div>
//                   <div className="form-group1">
//                   <label htmlFor="Charges">Charges :</label>

//                     <input type="number" 
//                     id="charges" 
//                     name="charges"  
//                     value={user.charges }
//                     readOnly
//                     />
//                   </div>
      
                 
//                   <Link to={`/AddAppointment/?sp_id=${spId}&user_id=${userId}`}> 
//                   {/* <Link to=""> */}
//                 <button className="primary-button" type="submit">
//                   Add Appointment
//                 </button>
//               </Link>
//                 </form>
//                 )}
//               </div>
              
//               </div>
             
//       </>
      
            
            
            
               
//         );
//     };

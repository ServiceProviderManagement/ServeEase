import CardServiceProvider from './CardServiceProvider';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AllServiceProviders = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const profession = searchParams.get('profession');
  const userId = window.sessionStorage.getItem("user_id");
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    const fetchData = async (profession) => {
      try {
        const response = await fetch(`http://localhost:49471/servease/getserviceproviders/?profession=${profession}`);
        if (response.ok) {
          const json = await response.json();
          const filteredSPs = json.filter((user) => (
            user &&
            user.sp_id &&
            user.user_id &&
            user.profession &&
            user.first_name &&
            user.last_name  &&
            user.expertise &&
            user.experience &&
            user.description &&
            user.AverageRating ||
            user.charges ||
            user.profile_pic &&
            user.other_images
            
          ));
          setServiceProviders(filteredSPs);
        } else {
          console.error('Failed to fetch service providers');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData(profession);

  }, [profession]);
  
const handleAppointmentClick = (sp_id,user_id) => {
        // window.location.href = `/AddAppointment/?sp_id=${sp_id},user_id=${user_id}`;
        window.location.href = `/AddAppointment/?sp_id=${sp_id}&user_id=${user_id}`;

      };
  return (
    <div>
      <h1>All {profession}s</h1>
      <p></p>

      {/* Display the fetched service providers */}
      <div className='cards'>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
          
              {serviceProviders.map((user) => (
                <CardServiceProvider
                src={user.profile_pic}
                experties={user.description}
                name=<h5>{user.first_name} {user.last_name}</h5>
                // addAppointment= <button >Appoint</button>
                addAppointment={
                    <button onClick={() => handleAppointmentClick(user.sp_id,userId)}>Appoint</button>
                  }
                label={user.expertise}//"Painter"  // Add your desired label here
                // path="/DashBoardSP/?sp_id="{user.user_id}
                path = {`/ViewSP/?spUser_id=${user.user_id}&sp_id=${user.sp_id}`}
                ratings={user.AverageRating}
                
              />
                // <tr key={user.id}>
                //   {/* Display relevant user information */}
                //   <p>Name: {user.first_name} {user.last_name}</p>
                //   <p>Expertise: {user.expertise}</p>
                //   <p>Experience: {user.experience}</p>
                //   <p>description: {user.description}</p>
                //   <p>charges: {user.charges}</p>
                //   <p>profile_pic: {user.profile_pic}</p>
                //   {/* Display other relevant user information */}
                //   <h1>----------------------------------------</h1>
                // </tr>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServiceProviders;



// import CardServiceProvider from './CardServiceProvider';
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const AllServiceProviders = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const profession = searchParams.get('profession');
//   const userId = window.sessionStorage.getItem('user_id');
//   const [serviceProviders, setServiceProviders] = useState([]);

//   useEffect(() => {
//     const fetchData = async (profession) => {
//       try {
//         const response = await axios.get(`http://localhost:49471/servease/getserviceproviders/?profession=${profession}`);
//         if (response.status === 200) {
//           const json = response.data;
//           const filteredSPs = json.filter((user) => (
//             user &&
//             user.sp_id &&
//             user.user_id &&
//             user.profession &&
//             user.first_name &&
//             user.last_name &&
//             user.expertise &&
//             user.experience &&
//             user.description &&
//             user.AverageRating &&
//             user.charges &&
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

//     fetchData(profession);
//   }, [profession]);

//   const handleAppointmentClick = (sp_id, user_id) => {
//     window.location.href = `/AddAppointment/?sp_id=${sp_id}&user_id=${user_id}`;
//   };

//   return (
//     <div>
//       <h1>All {profession}</h1>
//       <p></p>

//       {/* Display the fetched service providers */}
//       <div className="cards">
//         <div className="cards__container">
//           <div className="cards__wrapper">
//             <ul className="cards__items">
//               {serviceProviders.map((user) => (
//                 <CardServiceProvider
//                   src={user.profile_pic}
//                   experties={user.description}
//                   name={<h5>{user.first_name} {user.last_name}</h5>}
//                   addAppointment={
//                     <button onClick={() => handleAppointmentClick(user.sp_id, userId)}>Appoint</button>
//                   }
//                   label={user.expertise}
//                   path={`/ViewSP/?spUser_id=${user.user_id}&sp_id=${user.sp_id}`}
//                   ratings={user.AverageRating}
//                 />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllServiceProviders;

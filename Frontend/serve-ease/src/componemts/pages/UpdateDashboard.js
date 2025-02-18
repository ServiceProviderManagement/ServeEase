import React from 'react'
import "./UpdateDashboard.css";
import { useState  } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

export const UpdateDashBoard = () => {

  
    const history = useHistory();
  const [formData, setFormData] = useState({
        profession: '',
        expertise: '',
        experience: '',
        description: '',
        charges: '',
        profile_pic: null,
        other_images: null,
      });

      const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
          setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (formData[key] !== null) {
            formDataToSend.append(key, formData[key]);
          }
        }
    
        try {
            debugger
            const user_id= sessionStorage.getItem('user_id')
          await axios.put(`http://localhost:49471/servease/ServiceProvider/${user_id}`, formDataToSend,
          {
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
            },
          });
          // Handle success: show a success toast
          toast.success('Data submitted successfully!');
          history.push('/DashBoardSP')
        } catch (error) {
          // Handle error: show an error toast
          toast.error('An error occurred while submitting the data.');
        }
      };
      



  return (
  <><div className="frame-child36" />
        <div className="update-dashboard">
          Update Dashboard
        </div>
        <div className='SignIn1'>
          <div className="dashboard-form">
            <form className='form' onSubmit={handleSubmit}>
              <div className="form-banner">
                <label htmlFor="banner">Banner Image :</label>
                <input type="file" id="banner" name="banner" accept='images'
                onChange={handleInputChange}/>
              </div>
          
              <div className="form-group">
                <label htmlFor="Profession">Profession :</label>
                <input type="text"
                id="profession"
                name="profession"
                placeholder='Profession'
                value={formData.profession}
                onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="Expertise">Expertise :</label>
                <input type="text" 
                id="expertise"
                name="expertise"
                placeholder='Expertise'
                value={formData.expertise}
                onChange={handleInputChange}/>
              </div>

              <div className="form-group">
                <label htmlFor="Experience">Experience :</label>
                <input type="number" 
                id="experience" 
                name="experience"  
                placeholder='Enter Experience (in Years)'
                value={formData.experience}
                onChange={handleInputChange}/>
              </div>

              <div className="form-group">
                <label htmlFor="Description">Description :</label>
                <textarea id="description" 
                name="description" 
                rows="6" 
                placeholder='Enter Description about Service'
                value={formData.description}
                onChange={handleInputChange}/>
              </div>

              <div className="form-group1">
                <label htmlFor="Charges">Charges :</label>
                <input type="number" 
                id="charges" 
                name="charges" 
                placeholder='Charges in RS' 
                value={formData.charges}
                onChange={handleInputChange}/>
              </div>

              <button className="primary-button1" type="submit">Save</button>
            </form>
          </div>
        </div>      
</>);
};



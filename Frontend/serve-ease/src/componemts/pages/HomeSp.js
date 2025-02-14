import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeSP.css'; 
import { toast } from 'react-toastify';

const HomeSp = () => {
  const [Appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);



  const fetchAppointments = async () => {
    try {
        debugger;
      const user_id = sessionStorage.getItem('user_id');
      const response = await axios.get(`http://localhost:49471/servease/getAptBySpId/?userId=${user_id}`);
      setAppointments(response.data);


    } catch (error) {
      toast.error('Error fetching appointments:', error);
    }
  };




  const handleChangeStatus = async (aptId, newStatus) => {
    try {
      console.log('Updating status for appointment ID:', aptId);
      console.log('New status:', newStatus);
  
      const response = await axios.put(
        `http://localhost:49471/servease/updateAppointmentStatus?aptId=${aptId}&newStatus=${newStatus}`
      );
  
      console.log('Response:', response);
         // Update the local state with the updated status
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.apt_id === aptId ? { ...appointment, apt_status: newStatus } : appointment
        )
      );

      toast.success('Appointment status updated successfully.');
  
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast.error('Error updating appointment status: ' + error.message);
    }
  };


  // const handleChangeStatus = async (aptId, newStatus) => {
  //   try {

  //     const apt_id=sessionStorage.getItem('apt_id')
  //     // Send a request to update the status on the backend
  //     await axios.put(`http://localhost:49471/servease/updateAppointmentStatus/${apt_id}`, {
  //       aptId,
  //       newStatus
  //     });

  //     // Update the local state with the updated status
  //     setAppointments(prevAppointments =>
  //       prevAppointments.map(appointment =>
  //         appointment.apt_id === aptId ? { ...appointment, apt_status: newStatus } : appointment
  //       )
  //     );

  //     toast.success('Appointment status updated successfully.');
  //   } catch (error) {
  //     toast.error('Error updating appointment status: ' + error.message);
  //   }
  // };


  return (
    <div className='SignIn9'>
    <div className="container8">
      <h2 className="heading">Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Order Description</th>
            <th>Appointment Date</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Appointments.map((appointment)=> (
            <tr key={appointment.apt_id}>
              <td>{appointment.apt_id}</td>
              <td>{appointment.ord_description}</td>
              <td>{appointment.apt_date}</td>
              <td>{appointment.order_date}</td>
              <td>{appointment.customerFirstName} {appointment.customerLastName}</td>
              <td><select
                value={appointment.apt_status}
                onChange={(e) => handleChangeStatus(appointment.apt_id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="inprog">In Progress</option>
                <option value="completed">Completed</option>
              </select></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default HomeSp;

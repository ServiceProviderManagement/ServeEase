
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddApt.css'; 

export default function AllAppointmentsCust() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const parameterValue = urlParams.get('user_id');

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:/servease/getAptByCustId/?userId=${parameterValue}`)
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching data.');
      });
  }, [parameterValue]);
  const handleReviewClick = (apt_id, cust_id, sp_id) => {
    const reviewUrl = `/AddReviews/?apt_id=${apt_id}&cust_id=${cust_id}&sp_id=${sp_id}`;
    window.location.href = reviewUrl;
  };
  const handleCancelAptClick = async (apt_id) => {
    try {
      await axios.delete(`http://localhost:/servease/appointment/${apt_id}`);
      toast.success('Appointment canceled successfully.');
      // Reload the page to update the list of appointments
      window.location.reload();
    } catch (error) {
      console.error('Error canceling appointment:', error);
      toast.error('An error occurred while canceling the appointment.');
    }
  };

  function getStatusColor(aptStatus) {
    switch (aptStatus) {
      case 'pending':
        return 'step1';
      case 'inprogress':
        return 'step2';
      case 'completed':
        return 'step3';
      default:
        return 'status-default';
    }
  }
 
  return (
    <div className="appointments-container">
      <h1>All Appointments</h1>
        {appointments.map(appointment => (
          <div class="container-fluid my-5 d-sm-flex justify-content-center">
          <div class="card px-2">
              <div class="card-header bg-white">
                <div class="row justify-content-between">
                  <div class="col">
                      <p class="text-muted"> Appointment ID  <span class="font-weight-bold text-dark">{appointment.apt_id}</span></p> 
                      <p class="text-muted"> Placed On <span class="font-weight-bold text-dark">{appointment.order_date}</span> </p>
                      </div>
                      <div class="flex-col my-auto">
                          <h6 class="ml-auto mr-3">
                              
                          </h6>
                      </div>
                </div>
              </div>
              <div class="card-body">
                  <div class="media flex-column flex-sm-row">
                    <table>
                      <tr>
                        <td class="media-body ">
                        <div class="ordDscr">

                          <h5 class="bold">{appointment.expertise}</h5>
                          <p class="text-muted">{`${appointment.first_name} ${appointment.last_name}`}</p>
                          <h4 class="mt-3 mb-4 bold"> <span class="mt-5">&#x20B9;</span> 200 <span class="small text-muted"> via (COD) </span></h4>
                          <p class="text-muted">Visit on:<br/> <span class="Today">{appointment.apt_date}</span></p>
                             
                          </div>

                        </td>
                        <td class="media-body ">
                          {/* <img class="align-self-right img-fluid" src="https://i.imgur.com/bOcHdBa.jpg" width="180 " height="180"/> */}
                          <div class="ordDscr">
                            <h5 class="bold">Summary</h5>
                            <h5>-------------------------</h5>
                            {appointment.ord_description}
                          </div> 
                        </td>
                      </tr>
                    </table>
                      
                  </div>
              </div>

              {/* <div class="container"> */}
                <ol class="progress-meter">
                  <li class={`progress-point ${appointment.apt_status === 'pending' ? 'done' : 'todo'}`}>Pending</li>
                  {/* <li class={`progress-point ${appointment.apt_status === 'inprog' ? 'done' : (appointment.apt_status === 'completed' ? 'done' : 'todo')}`}>In Progress</li> */}
                  <li class={`progress-point ${appointment.apt_status === 'inprog' ? 'done' : 'todo'}`}>In Progress</li>
                  <li class={`progress-point ${appointment.apt_status === 'completed' ? 'done' : 'todo'}`}>Completed</li>
                </ol>
              {/* </div> */}

               <div class="card-footer  bg-white px-sm-3 pt-sm-4 px-0">
                  <div class="row text-center  ">
                      <div class="col my-auto  border-line "><h5 >Contact</h5></div>
                      <div class="col  my-auto  border-line " onClick={() => handleReviewClick(appointment.apt_id, appointment.cust_id, appointment.sp_id)}>
                      <h5 >Add Review</h5></div>
                      {appointment.apt_status !== "completed" && appointment.apt_status !== "inprogress" &&(
                      <div class="col my-auto   border-line " onClick={() => handleCancelAptClick(appointment.apt_id)}>
                      <h5 >Cancel</h5></div>)}
                      {/* <div class="col  my-auto mx-0 px-0 "><img class="img-fluid cursor-pointer" src="https://img.icons8.com/ios/50/000000/menu-2.png" width="30" height="30"/></div> */}
                  </div>
              </div>
          </div>
      </div>
        ))}
     
    </div>

  
  );

}


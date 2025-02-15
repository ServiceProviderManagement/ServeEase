import { toast } from 'react-toastify';
import React, { useState } from 'react';
import './AddAppointment.css';
debugger;
export default function AddAppointment() {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const spId = urlParams.get('sp_id');
const uId = urlParams.get('user_id');

  const [cust_id, setcust_id] = useState(uId);
  const [sp_id, setsp_id] = useState(spId);
  const [ord_description, setord_description] = useState('');
  const [apt_date, setapt_date] = useState('');
  const [apt_status, setapt_status] = useState('pending');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      cust_id,
      sp_id,
      ord_description,
      apt_date,
      apt_status,
    };

    try {
      const response = await fetch('http://localhost:49471/servease/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        // Reset form fields after successful submission
        toast.success('Appoint Added successfully!');
        setcust_id('');
        setsp_id('');
        setord_description('');
        setapt_date('');
        setapt_status('');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      setcust_id('');
        setsp_id('');
        setord_description('');
        setapt_date('');
        setapt_status('');
    }
  };

  return (
    <div className="order-form">
      <center><h2> Add Appointment</h2></center>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="cust_id">Customer ID:</label>
        <input
          type="number"
          id="cust_id"
          value={cust_id}
          onChange={(event) => setcust_id(event.target.value)}
        /> */}

        {/* <label htmlFor="sp_id">Service Provider ID:</label>
        <input
          type="number"
          id="sp_id"
          value={sp_id}
          onChange={(event) => setsp_id(event.target.value)}
        /> */}

        <label htmlFor="ord_description">Order Description:</label>
        <textarea
          id="ord_description"
          value={ord_description}
          onChange={(event) => setord_description(event.target.value)}
        />

        <label htmlFor="apt_date">Appointment Date:</label>
        <input
          type="date"
          id="apt_date"
          value={apt_date}
          onChange={(event) => setapt_date(event.target.value)}
        />

        {/* <label htmlFor="apt_status">Completion Status:</label>
        <select
          id="apt_status"
          value={apt_status}
          onChange={(event) => setapt_status(event.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

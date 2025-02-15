import React, { useState } from 'react';
import axios from 'axios';
import './AddReviews.css'; 

export default function AddReviews(props) {
    const queryParams = new URLSearchParams(props.location.search);
    const apt_id = queryParams.get('apt_id');
    const cust_id = queryParams.get('cust_id');
    const sp_id = queryParams.get('sp_id');
  const [review, setReview] = useState('');
  const [complaint, setComplaint] = useState('');
  const [ratings, setRatings] = useState('');

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    debugger;
    const reviewData = {
      apt_id: parseInt(apt_id),
      cust_id: parseInt(cust_id),
      sp_id: parseInt(sp_id),
      review1: review,
      complaint: complaint,
      ratings: parseInt(ratings)
    };



    try {
      const user_id=sessionStorage.getItem('user_id')
      await axios.post('http://localhost:49471/servease/review', reviewData);
      // Display a success message or perform any other action
      window.location.href = `/AllAppointmentsCust/?user_id=${user_id}`;
    } catch (error) {
      console.error('Error adding review:', error);
      // Display an error message or perform error handling
    } 
  };

  return (
   
     <div className="add-reviews-container15">
      <h1>Add Review</h1>
      <form onSubmit={handleReviewSubmit}>
        <div className="form-group15">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div className="form-group15">
          <label htmlFor="complaint">Complaint:</label>
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          />
        </div>
        <div className="rating">
          {/* <label htmlFor="ratings">Ratings:</label> */}
          {/* <input
              type="number"
              id="ratings"
              value={ratings}
              onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                if (inputValue >= 1 && inputValue <= 5) {
                  setRatings(inputValue);
                }
              }}
              required
            /> */}

            <label>
                <input type="radio" name="stars" value="1" onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                setRatings(inputValue);
              }}/>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="2" onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                setRatings(inputValue);
              }}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="3" onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                setRatings(inputValue);
              }}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>   
              </label>
              <label>
                <input type="radio" name="stars" value="4" onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                setRatings(inputValue);
              }}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="5" onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                setRatings(inputValue);
              }}/>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
        </div>
        <button type="submit" className='btnSbmt'>Submit Review</button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewSP.css'; 
import { toast } from 'react-toastify';

const ReviewSP = () => {
  const [Reviews, setReviews] = useState([]);
  const userId = sessionStorage.getItem('user_id')

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:49471/servease/GetReviewByUserId?userId=${userId}`);
      setReviews(response.data);
    } catch (error) {
      toast.error('Error fetching reviews:', error);
    }
  };

  return (
    <div className='SignIn10'>
        <div className='container10'>

       
    <div className='ReviewsContainer'>
      <h2 className='Heading'>Reviews</h2>
      <div className='ReviewTable'>
        <table className='table'>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Review</th>
              <th>Complaint</th>
              <th>Ratings</th>
            </tr>
          </thead>
          <tbody>
            {Reviews.map((review) => (
              <tr key={review.review_id}>
                <td>{review.apt_id}</td>
                <td>{review.review1}</td>
                <td>{review.complaint}</td>
                <td>{review.ratings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ReviewSP;

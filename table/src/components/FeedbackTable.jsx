import React, { useState, useEffect } from 'react';
import './table.css';
import axios from 'axios';

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = () => {
    axios.get('http://localhost:4000/get-feedback')
      .then(response => {
        setFeedbackData(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback data:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete-feedback/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Feedback deleted successfully');
        fetchFeedbackData(); // Fetch updated feedback data after deleting feedback
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <h2>Feedback Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Feedback Type</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.feedbackType}</td>
              <td>{feedback.comments}</td>
              <td>
                <button onClick={() => handleDelete(feedback._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
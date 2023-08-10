import React, { useState } from 'react';
import './form.css';
import StarRating from './StarRating';

const FeedbackForm = () => {
  const topics = [
    'Overall satisfaction with the course:',
    "Instructor's knowledge and expertise:",
    'Clarity of course materials and resources:',
    'Relevance of the topics covered:',
    'Effectiveness of practical exercises and projects:',
    'Quality of the learning environment (online/offline):',
    'Availability of support and guidance:',
    'Communication and feedback from the instructor:',
    'How would you rate your overall learning experience? (1-5):',
  ];

  const instructorNames = ['Mrs. Geethara Gowri', 'Mr. Vimalesh', 'Ms. Lenora Smauel', 'Mr. Gajendra Babu'];
  const courseNames = ['Digital Marketing', 'Full Stack Web Development'];

  const [formData, setFormData] = useState({
    courseName: '',
    paperName: '',
    instructorName: '',
    studentName: '',
    batchNumber: '',
    ratings: Array(topics.length).fill(0), // Initial ratings array for topics
    courseExpectation: '',
    courseImprovement: '',
    additionalComments: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...formData.ratings];
    updatedRatings[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      ratings: updatedRatings,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ratings: topics.map((topic, index) => ({
            topic: topic,
            rating: formData.ratings[index], // Assuming formData.ratings[index] is the user's rating input
          })),
        }),
        });
      


      if (response.status === 200) {
        console.log('Feedback submitted successfully');
        alert('Feedback submitted successfully'); // Show alert for successful submission
      } else {
        console.error('Failed to submit feedback');
        alert('Failed to submit feedback'); // Show alert for submission failure
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback'); // Show alert for error
    }
  };

  return (
    <div className="feedback-form">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="form-label">Course Name:</label>
          <select
            className="form-select"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
          >
            <option value="">Select a course</option>
            {courseNames.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Paper Name:</label>
          <input
            className="form-table"
            type="text"
            name="paperName"
            value={formData.paperName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="form-label">Instructor Name:</label>
          <select
            className="form-select"
            name="instructorName"
            value={formData.instructorName}
            onChange={handleInputChange}
          >
            <option value="">Select an Instructor</option>
            {instructorNames.map((instructor) => (
              <option key={instructor} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Student Name:</label>
          <input
            className="form-table"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="form-label">Batch Number:</label>
          <input
            className="form-table"
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleInputChange}
            required
          />
        </div>
<div>
        {topics.map((topic, index) => (
          <div className="topic-container" key={index}>
            <h4>{topic}</h4>
            <StarRating value={formData.ratings[index]} onChange={(value) => handleRatingChange(index, value)} />
          </div>
        ))}
        </div>

        <div>
          <label className="form-label">Did the course meet your expectation? Please provide details:</label>
          <textarea
            className="box-model"
            name="courseExpectation"
            value={formData.courseExpectation}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label className="form-label">What aspects of the course (Training) could be improved?</label>
          <textarea
            className="box-model"
            name="courseImprovement"
            value={formData.courseImprovement}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label className="form-label">Any additional comments or suggestions:</label>
          <textarea
            className="box-model"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;

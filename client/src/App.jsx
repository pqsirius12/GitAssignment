import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feedback');
      if (response.ok) {
        const result = await response.json();
        setFeedbacks(result.data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleNewFeedback = (newFeedback) => {
    // Optimistically add the new feedback or re-fetch
    // Since the ID is returned, we can just prepend it
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  return (
    <div className="app-container">
      <h1>Premium Feedback Hub</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <FeedbackForm onFeedbackSubmit={handleNewFeedback} />
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

const FeedbackForm = ({ onFeedbackSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        rating: 5
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                onFeedbackSubmit(result.data);
                setFormData({ name: '', email: '', message: '', rating: 5 });
                alert('Feedback submitted successfully!');
            } else {
                alert('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback.');
        }
    };

    return (
        <div className="card">
            <h2 style={{ marginTop: 0 }}>Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Rating</label>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    checked={formData.rating === star}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ color: formData.rating >= star ? '#fbbf24' : '#475569' }}>★</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Your feedback..."
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;

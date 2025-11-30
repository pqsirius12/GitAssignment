import React from 'react';

const FeedbackList = ({ feedbacks }) => {
    return (
        <div className="card">
            <h2 style={{ marginTop: 0 }}>Recent Feedback</h2>
            {feedbacks.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No feedback yet.</p>
            ) : (
                <div>
                    {feedbacks.map((item) => (
                        <div key={item.id} className="feedback-item">
                            <div className="feedback-header">
                                <span className="feedback-name">{item.name}</span>
                                <span className="feedback-rating">{'★'.repeat(item.rating)}</span>
                            </div>
                            <p style={{ margin: '0.5rem 0' }}>{item.message}</p>
                            <div className="feedback-date">
                                {new Date(item.created_at).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackList;

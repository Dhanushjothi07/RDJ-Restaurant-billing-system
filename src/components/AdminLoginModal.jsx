import React, { useState } from 'react';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    // Predefined credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'password123';

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
            setError('');
            onLoginSuccess();
            onClose();
        } else {
            setError('Invalid username or password');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h2>Admin Login</h2>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    {error && (
                        <div style={{
                            color: 'var(--error-color)',
                            background: 'rgba(231, 76, 60, 0.1)',
                            padding: '10px',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter admin username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter admin password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-actions" style={{ marginTop: '20px' }}>
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginModal;

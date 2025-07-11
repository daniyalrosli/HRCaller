import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_number: '',
    company_name: '',
    department: '',
    contact_person: '',
    email: '',
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const API_BASE_URL = 'http://localhost:8000/api/v1';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate required fields
    if (!formData.phone_number.trim() || !formData.company_name.trim()) {
      setError('Phone number and company name are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/calls/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          phone_number: '',
          company_name: '',
          department: '',
          contact_person: '',
          email: '',
          location: '',
          notes: ''
        });
      } else {
        setError(data.detail || 'Failed to add HR number');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="report-container">
      <div className="search-form">
        <h2 className="text-center mb-3">Report New HR Number</h2>
        <p className="text-center mb-3">
          Help expand our database by reporting new HR contact information.
        </p>

        {success && (
          <div className="alert alert-success">
            <h3>Success!</h3>
            <p>Your HR number has been successfully added to our database. Thank you for contributing!</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number *</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                className="form-control"
                placeholder="Enter phone number (e.g., +1-555-0100)"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company_name">Company Name *</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                className="form-control"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className="form-control"
                placeholder="Enter department (e.g., Human Resources)"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact_person">Contact Person</label>
              <input
                type="text"
                id="contact_person"
                name="contact_person"
                className="form-control"
                placeholder="Enter contact person name"
                value={formData.contact_person}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                placeholder="Enter location (e.g., San Francisco, CA)"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-control"
              placeholder="Enter any additional information or notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="d-flex justify-center gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBackToHome}
              disabled={loading}
            >
              Back to Home
            </button>
          </div>
        </form>

        {loading && (
          <div className="spinner"></div>
        )}
      </div>

      <div className="report-guidelines mt-3">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Reporting Guidelines</h4>
          </div>
          <div className="card-body">
            <ul>
              <li>Only report legitimate HR contact information</li>
              <li>Ensure the phone number is publicly available or you have permission to share</li>
              <li>Provide accurate and up-to-date information</li>
              <li>Include as much detail as possible to help others</li>
              <li>Do not report personal or private contact information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm; 
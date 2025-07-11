import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NumberCard from '../components/NumberCard';

const Home = ({ setSearchResult, setSearchQuery }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [searchType, setSearchType] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:8000/api/v1';

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let url;
      let query;

      if (searchType === 'phone') {
        if (!phoneNumber.trim()) {
          setError('Please enter a phone number');
          setLoading(false);
          return;
        }
        url = `${API_BASE_URL}/calls/search`;
        query = phoneNumber;
      } else {
        if (!companyName.trim()) {
          setError('Please enter a company name');
          setLoading(false);
          return;
        }
        url = `${API_BASE_URL}/calls/search/company`;
        query = companyName;
      }

      const response = await fetch(`${url}?${searchType === 'phone' ? 'phone_number' : 'company_name'}=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setSearchResult(data);
        setSearchQuery(query);
        navigate('/result');
      } else {
        setError(data.message || 'No results found');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/calls/all`);
      const data = await response.json();

      if (data.success) {
        setSearchResult(data);
        setSearchQuery('all');
        navigate('/result');
      } else {
        setError('Failed to load all numbers');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Load all error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="search-form">
        <h2 className="text-center mb-3">Search HR Contact Information</h2>
        
        <div className="search-tabs mb-3">
          <button
            className={`btn ${searchType === 'phone' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSearchType('phone')}
            style={{ marginRight: '0.5rem' }}
          >
            Search by Phone Number
          </button>
          <button
            className={`btn ${searchType === 'company' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSearchType('company')}
          >
            Search by Company
          </button>
        </div>

        <form onSubmit={handleSearch}>
          {searchType === 'phone' ? (
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control"
                placeholder="Enter phone number (e.g., +1-555-0100)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                className="form-control"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="d-flex justify-center gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleViewAll}
              disabled={loading}
            >
              View All Numbers
            </button>
          </div>
        </form>

        {loading && (
          <div className="spinner"></div>
        )}
      </div>

      <div className="nav-links">
        <a href="/report" className="nav-link">
          Report New HR Number
        </a>
      </div>

      <div className="features-section mt-3">
        <h3 className="text-center mb-2">Features</h3>
        <div className="grid grid-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Quick Search</h4>
            </div>
            <div className="card-body">
              Find HR contact information by phone number or company name instantly.
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Comprehensive Database</h4>
            </div>
            <div className="card-body">
              Access a wide range of HR contact information from various companies.
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Easy Reporting</h4>
            </div>
            <div className="card-body">
              Report new HR numbers to help expand our database and assist others.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
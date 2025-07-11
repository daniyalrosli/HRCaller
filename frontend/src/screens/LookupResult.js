import React from 'react';
import { useNavigate } from 'react-router-dom';
import NumberCard from '../components/NumberCard';

const LookupResult = ({ result, query, setSearchResult, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleNewSearch = () => {
    setSearchResult(null);
    setSearchQuery('');
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!result) {
    return (
      <div className="result-container">
        <div className="alert alert-error">
          No search results available. Please try a new search.
        </div>
        <div className="d-flex justify-center gap-2">
          <button className="btn btn-primary" onClick={handleNewSearch}>
            New Search
          </button>
          <button className="btn btn-secondary" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isSingleResult = result.data && !Array.isArray(result.data);
  const results = isSingleResult ? [result.data] : (result.data || []);

  return (
    <div className="result-container">
      <div className="result-header">
        <h2 className="text-center mb-2">
          {query === 'all' ? 'All HR Numbers' : `Search Results for "${query}"`}
        </h2>
        <p className="text-center mb-3">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          <div className="alert alert-info">
            <h3>No Results Found</h3>
            <p>
              {query === 'all' 
                ? 'No HR numbers are currently available in the database.'
                : `No HR numbers found for "${query}". Please try a different search term.`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((hrNumber, index) => (
            <NumberCard key={index} hrNumber={hrNumber} />
          ))}
        </div>
      )}

      <div className="result-actions mt-3">
        <div className="d-flex justify-center gap-2">
          <button className="btn btn-primary" onClick={handleNewSearch}>
            New Search
          </button>
          <button className="btn btn-secondary" onClick={handleBackToHome}>
            Back to Home
          </button>
          <a href="/report" className="btn btn-success">
            Report New Number
          </a>
        </div>
      </div>

      {results.length > 0 && (
        <div className="search-tips mt-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Search Tips</h4>
            </div>
            <div className="card-body">
              <ul>
                <li>Try searching by company name if phone number search doesn't work</li>
                <li>Use partial company names for broader results</li>
                <li>Check the "View All Numbers" option to browse the entire database</li>
                <li>Report new HR numbers to help expand our database</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookupResult; 
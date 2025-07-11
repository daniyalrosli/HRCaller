import React from 'react';

const NumberCard = ({ hrNumber }) => {
  const handleCall = () => {
    window.open(`tel:${hrNumber.phone_number}`, '_self');
  };

  const handleEmail = () => {
    if (hrNumber.email) {
      window.open(`mailto:${hrNumber.email}`, '_self');
    }
  };

  return (
    <div className="card number-card">
      <div className="card-header">
        <h3 className="card-title">{hrNumber.company_name}</h3>
        {hrNumber.department && (
          <p className="card-subtitle">{hrNumber.department}</p>
        )}
      </div>
      
      <div className="card-body">
        <div className="card-info">
          <i className="fas fa-phone"></i>
          <span>{hrNumber.phone_number}</span>
        </div>
        
        {hrNumber.contact_person && (
          <div className="card-info">
            <i className="fas fa-user"></i>
            <span>{hrNumber.contact_person}</span>
          </div>
        )}
        
        {hrNumber.email && (
          <div className="card-info">
            <i className="fas fa-envelope"></i>
            <span>{hrNumber.email}</span>
          </div>
        )}
        
        {hrNumber.location && (
          <div className="card-info">
            <i className="fas fa-map-marker-alt"></i>
            <span>{hrNumber.location}</span>
          </div>
        )}
        
        {hrNumber.notes && (
          <div className="card-info">
            <i className="fas fa-info-circle"></i>
            <span>{hrNumber.notes}</span>
          </div>
        )}
      </div>
      
      <div className="card-actions">
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary" 
            onClick={handleCall}
            style={{ flex: 1 }}
          >
            <i className="fas fa-phone"></i> Call
          </button>
          {hrNumber.email && (
            <button 
              className="btn btn-secondary" 
              onClick={handleEmail}
              style={{ flex: 1 }}
            >
              <i className="fas fa-envelope"></i> Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberCard; 
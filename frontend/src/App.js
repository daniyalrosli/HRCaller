import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import LookupResult from './screens/LookupResult';
import ReportForm from './screens/ReportForm';
import './App.css';

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>HR Caller</h1>
          <p>Find HR contact information quickly</p>
        </header>
        
        <main className="App-main">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  setSearchResult={setSearchResult}
                  setSearchQuery={setSearchQuery}
                />
              } 
            />
            <Route 
              path="/result" 
              element={
                <LookupResult 
                  result={searchResult}
                  query={searchQuery}
                  setSearchResult={setSearchResult}
                  setSearchQuery={setSearchQuery}
                />
              } 
            />
            <Route 
              path="/report" 
              element={<ReportForm />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="App-footer">
          <p>&copy; 2024 HR Caller. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 
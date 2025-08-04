// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobList from './JobList';
import JobDetail from './JobDetail';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Job Queue Dashboard</h2>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
      </Routes>
    </div>
  );
}

export default App;

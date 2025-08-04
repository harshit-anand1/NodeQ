// src/JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter]= useState('');

  

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (status = '') => {
    try {
      const response = await axios.get(`http://localhost:4000/jobs${status ? `?status=${status}` : ''}`);
      setJobs(response.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  useEffect(()=> {
    fetchJobs(statusFilter);
  }, [statusFilter]);

  const handleFilterClick = (status) => {
    setStatusFilter(status);
  }

  const handleRowClick = (id) => {
    navigate(`/job/${id}`);
  };

  return (

    <div>
    {/* 🔹 Filter Buttons */}
    <div style={{ marginBottom: '1rem' }}>
        {['', 'queued', 'processing', 'completed', 'failed'].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterClick(status)}
            style={{
              marginRight: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: statusFilter === status ? '#007bff' : '#f0f0f0',
              color: statusFilter === status ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Type</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} onClick={() => handleRowClick(job.id)} style={{ cursor: 'pointer' }}>
            <td>{job.id}</td>
            <td>{job.status}</td>
            <td>{job.type}</td>
            <td>{new Date(parseInt(job.createdAt)).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default JobList;

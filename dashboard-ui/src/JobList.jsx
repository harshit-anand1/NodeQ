// src/JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/jobs');
      setJobs(response.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/job/${id}`);
  };

  return (
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
  );
}

export default JobList;

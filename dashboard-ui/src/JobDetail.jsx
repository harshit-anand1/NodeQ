// src/JobDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const handleRetry = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/job/${job.id}/retry`);
      alert('Retry submitted with new ID: ' + response.data.job.id);
    } catch (err) {
      console.error('Failed to retry job:', err);
      alert('Retry failed');
    }
  };
 


  const fetchJob = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/job/${jobId}`);
      setJob(response.data);
    } catch (err) {
      console.error('Failed to fetch job:', err);
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      <Link to="/">← Back to Dashboard</Link>
      <h3>🔍 Job Details</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <tbody>
          {Object.entries(job).map(([key, value]) => (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
            </tr>
          ))}
        </tbody>
      </table>

            
      {job.status === 'failed' && (
  <button onClick={handleRetry}>Retry Job</button>
    )}

    </div>
  );
}


export default JobDetail;

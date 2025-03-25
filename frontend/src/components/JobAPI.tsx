import { useEffect, useState } from "react";
import axios from "axios";


const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs`, {
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  };

const JobsAPI = () => {
    console.log("jobsAPI")
  const [jobs, setJobs] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await fetchJobDetails();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Job Listings</h2>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(jobs, null, 2)}</pre>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobsAPI;

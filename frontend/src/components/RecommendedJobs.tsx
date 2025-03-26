import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Job {
  jobId: string;
  score: number;
  title: string;
}

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatchedJobs = async () => {
      try {
        const email = localStorage.getItem("user"); // Get email from local storage
        if (!email) {
          toast.error("User Error", {
            description: "Upload your resume first or Try to login again",
          });
          return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/matchJobs`, { email });

        // Sort jobs by score (descending order)
        const sortedJobs = response.data.recommendedJobs.sort((a: Job, b: Job) => b.score - a.score);
        setJobs(sortedJobs);
      } catch (error) {
        toast.error("ML API Error", {
          description: "Sorry, Machine Learning API is not working. Try again later.",
        });
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 flex flex-col items-center py-10 px-4">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
        Recommended Jobs For You
      </h2>

      {/* Jobs Container */}
      <div className="w-full max-w-4xl bg-amber-100 shadow-lg rounded-xl p-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading... This may take some time due to server constraints.</p>
        ) : jobs.length > 0 ? (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.jobId}
                className="p-5 border border-gray-200 rounded-lg shadow-md bg-gray-50 hover:bg-yellow-100 transition duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-blue-800">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  Match Score: <span className="font-semibold text-yellow-600">{(job.score* 100).toFixed(2)}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No job recommendations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;

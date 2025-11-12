import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";


const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(`http://localhost:3000/allJobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!job) return <p>Job not found!</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <img src={job.coverImage} alt={job.title} className="w-full h-64 object-cover rounded"/>
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <p className="mb-4">{job.summary}</p>
      <p>Category: {job.category}</p>
      <p>Price: ${job.price}</p>
      <p>Rating: {job.rating}</p>
      <p>Level: {job.level}</p>
      <p>Posted By: {job.postedBy}</p>
      <Link to="/all-jobs" className="btn btn-secondary mt-4">Back to Jobs</Link>
    </div>
  );
};

export default JobDetails;

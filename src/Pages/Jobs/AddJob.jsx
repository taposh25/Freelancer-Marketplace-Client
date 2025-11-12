import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const AddJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: "", description: "" });

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job.title || !job.description) {
      toast.error("Fill all fields!");
      return;
    }
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const newJob = { ...job, id: Date.now(), user: JSON.parse(localStorage.getItem("user")).email };
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
    toast.success("Job added successfully!");
    navigate("/all-jobs");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Job</h2>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full mb-4"
      />
      <button type="submit" className="btn btn-primary w-full">Add Job</button>
    </form>
  );
};

export default AddJob;

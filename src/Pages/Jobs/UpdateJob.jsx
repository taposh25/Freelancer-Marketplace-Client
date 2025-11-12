import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    summary: "",
    category: "",
    coverImage: "",
    price: 0,
    rating: 0,
    level: "Beginner"
  });

  // 🔹 Fetch single job by ID
  useEffect(() => {
    fetch(`http://localhost:3000/allJobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(err => console.error("Failed to fetch job:", err));
  }, [id]);

  // 🔹 Handle input changes
  const handleChange = (e) =>
    setJob({ ...job, [e.target.name]: e.target.value });

  // 🔹 Handle update submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/updateJob/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Job updated successfully!");
        navigate("/myAddedJobs");
      })
      .catch((err) => {
        console.error("Error updating job:", err);
        toast.error("Failed to update job!");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Update Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <textarea
        name="summary"
        placeholder="Job Summary"
        value={job.summary}
        onChange={handleChange}
        className="textarea textarea-bordered w-full mb-4"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={job.category}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <input
        type="text"
        name="coverImage"
        placeholder="Cover Image URL"
        value={job.coverImage}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={job.price}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={job.rating}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <select
        name="level"
        value={job.level}
        onChange={handleChange}
        className="select select-bordered w-full mb-4"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>

      <button type="submit" className="btn btn-primary w-full">
        Update Job
      </button>
    </form>
  );
};

export default UpdateJob;

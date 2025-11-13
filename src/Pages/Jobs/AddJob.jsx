// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const AddJob = () => {
//   const navigate = useNavigate();
//   const [job, setJob] = useState({ title: "", description: "" });

//   const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!job.title || !job.description) {
//       toast.error("Fill all fields!");
//       return;
//     }
//     const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//     const newJob = { ...job, id: Date.now(), user: JSON.parse(localStorage.getItem("user")).
// userEmail };
//     localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
//     toast.success("Job added successfully!");
//     navigate("/all-jobs");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add Job</h2>
//       <input
//         type="text"
//         name="title"
//         placeholder="Job Title"
//         value={job.title}
//         onChange={handleChange}
//         className="input input-bordered w-full mb-4"
//       />
//       <textarea
//         name="description"
//         placeholder="Job Description"
//         value={job.summary}
//         onChange={handleChange}
//         className="textarea textarea-bordered w-full mb-4"
//       />
//       <button type="submit" className="btn btn-primary w-full">Add Job</button>
//     </form>
//   );
// };

// export default AddJob;









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    summary: "",
    category: "",
    coverImage: "",
    servicesFrom: "",
    rating: "",
    level: "",
    price: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.title || !job.summary) {
      toast.error("Please fill at least Title and Summary!");
      return;
    }

    try {
      const newJob = { ...job, userEmail: user?.userEmail || "" };

      const res = await fetch("http://localhost:3000/addJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Job added successfully!");
        navigate("/my-added-jobs"); 
      } else {
        toast.error("Failed to add job!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Add Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        required
      />

      <textarea
        name="summary"
        placeholder="Job Summary"
        value={job.summary}
        onChange={handleChange}
        className="textarea textarea-bordered w-full mb-4"
        required
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
        type="text"
        name="servicesFrom"
        placeholder="Services From"
        value={job.servicesFrom}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={job.rating}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        min="1"
        max="5"
      />

      <input
        type="text"
        name="level"
        placeholder="Level (Beginner / Intermediate / Expert)"
        value={job.level}
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

      <button type="submit" className="btn btn-primary w-full">
        Add Job
      </button>
    </form>
  );
};

export default AddJob;

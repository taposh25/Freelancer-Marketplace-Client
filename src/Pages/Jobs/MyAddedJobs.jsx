// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const MyAddedJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   // ✅ Fetch all jobs added by this user
//   const fetchJobs = () => {
//     fetch(`http://localhost:3000/myAddedJobs?email=${user?.userEmail}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         return res.json();
//       })
//       .then((data) => setJobs(data))
//       .catch((err) => console.error("Fetch error:", err));
//   };

//   useEffect(() => {
//     if (user?.userEmail) fetchJobs();
//   }, [user]);

//   // ✅ Delete a job by ID
//   const handleDelete = (_id) => {
//     if (!window.confirm("Are you sure you want to delete this job?")) return;

//     fetch(`http://localhost:3000/deleteJob/${_id}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to delete job");
//         return res.json();
//       })
//       .then((data) => {
//         if (data.deletedCount > 0) {
//           toast.success("✅ Job deleted successfully!");
//           fetchJobs(); // Refresh job list
//         } else {
//           toast.error(" Failed to delete job!");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error(" Something went wrong!");
//       });
//   };

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {jobs.length === 0 && <p>You have not added any jobs!</p>}

//       {jobs.map((job) => (
//         <div
//           key={job._id}
//           className="card bg-white p-4 shadow rounded border border-gray-200"
//         >
//           <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
//           <p className="text-gray-600 mt-2">{job.summary}</p>

//           <div className="flex justify-between mt-4">
//             <Link
//               to={`/updateJob/${job._id}`}
//               className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             >
//                Edit
//             </Link>
//             <button
//               onClick={() => handleDelete(job._id)}
//               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               🗑 Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyAddedJobs;










import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyAddedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all jobs added by this user
  const fetchJobs = async () => {
    if (!user?.userEmail) return;

    try {
      const res = await fetch(`http://localhost:3000/myAddedJobs?email=${user.userEmail}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch your jobs!");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user?.userEmail]);

  // Delete a job by ID
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:3000/deleteJob/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success(" Job deleted successfully!");
        fetchJobs(); // Refresh list
      } else {
        toast.error("Failed to delete job!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.length === 0 && (
        <p className="text-center text-gray-500">You have not added any jobs!</p>
      )}

      {jobs.map((job) => (
        <div
          key={job._id}
          className="card bg-white p-4 shadow rounded border border-gray-200 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
          <p className="text-gray-600 mt-2">{job.summary}</p>

          <div className="flex justify-between mt-4">
            <Link
              to={`/updateJob/${job._id}`}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(job._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddedJobs;

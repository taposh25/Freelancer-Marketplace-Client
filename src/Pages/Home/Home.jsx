// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch("http://localhost:3000/allJobs?limit=6")
//       .then(res => res.json())
//       .then(data => {
//         setJobs(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const handleAccept = (_id) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       toast.error("You must login first!");
//       return;
//     }

//     const updatedJobs = jobs.map(job => {
//       if (job._id === _id) {
//         if (job.acceptedBy) {
//           toast.error("Job already accepted!");
//           return job;
//         }
//         toast.success("Job accepted successfully!");
//         return { ...job, acceptedBy: user.email };
//       }
//       return job;
//     });

//     setJobs(updatedJobs);
//     localStorage.setItem("jobs", JSON.stringify(updatedJobs));
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
//       {jobs.length === 0 && <p className="text-center">No jobs available.</p>}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {jobs.map(job => (
//           <div
//             key={job._id}
//             className="card bg-white p-4 shadow-lg hover:cursor-pointer rounded-xl flex flex-col justify-between h-64"
//           >
//             {/* Title + Image */}
//             <div className="flex items-center mb-4">
//               {job.coverImage && (
//                 <img
//                   src={job.coverImage}
//                   alt={job.title}
//                   className="w-12 h-12 rounded-full mr-3 object-cover"
//                 />
//               )}
//               <h2 className="text-xl font-bold">{job.title}</h2>
//             </div>

//             <p className="mb-4 text-gray-700 flex-grow">{job.summary}</p>

//             <div className="flex justify-between mt-auto">
//               <Link to={`/job/${job._id}`} className="btn btn-sm btn-primary">
//                 Details
//               </Link>
//               <button
//                 onClick={() => handleAccept(job._id)}
//                 className={`btn btn-sm ${
//                   job.acceptedBy ? "btn-disabled" : "btn-success"
//                 }`}
//               >
//                 {job.acceptedBy ? "Accepted" : "Accept"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import MyAcceptedTasks from "../Jobs/MyAcceptedTasks";


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/allJobs?limit=6")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAccept = (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("You must login first!");
      return;
    }

    const updatedJobs = jobs.map(job => {
      if (job._id === _id) {
        if (job.acceptedBy) {
          toast.error("Job already accepted!");
          return job;
        }
        toast.success("Job accepted successfully!");
        return { ...job, acceptedBy: user.email };
      }
      return job;
    });

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6 ">Available Jobs</h1>
      
    <MyAcceptedTasks></MyAcceptedTasks>
      {jobs.length === 0 && <p className="text-center text-gray-500">No jobs available.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col h-[32rem]"
          >
            {/* Cover Image */}
            {job.coverImage && (
              <img
                src={job.coverImage}
                alt={job.title}
                className="w-full h-44 object-cover"
              />
            )}

            <div className="p-5 flex flex-col">
              
              <div className="flex items-center mb-3">
                <img
                  src={job.coverImage || "https://via.placeholder.com/40"}
                  alt={job.postedBy || "User"}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800 truncate">{job.postedBy}</p>
                  <p className="text-gray-500 truncate">{job.userEmail}</p>
                </div>
              </div>

              {/* Title , Category , Level */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{job.title}</h2>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {job.category || "General"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Level: {job.level || "Intermediate"}</p>

             
              <p className="text-gray-600 text-sm mb-4 ">{job.summary}</p>

             
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="font-bold text-gray-800">${job.price || 0}</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span>{"★".repeat(Math.floor(job.rating || 0))}</span>
                  <span>{"☆".repeat(5 - Math.floor(job.rating || 0))}</span>
                  <span className="text-gray-400 ml-1">({job.rating.toFixed(1)})</span>
                </div>
              </div>

              
              <div className="flex justify-between mt-auto">
                <Link
                  to={`/job/${job._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleAccept(job._id)}
                  className={`px-4 py-2 rounded-lg text-white text-sm ${
                    job.acceptedBy ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {job.acceptedBy ? "Accepted" : "Accept"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

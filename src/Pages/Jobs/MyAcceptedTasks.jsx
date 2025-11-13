// import React, { useEffect, useState } from "react";

// const MyAcceptedTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user?.email) return;

//     fetch(`http://localhost:3000/my-accepted-tasks?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => setTasks(data))
//       .catch((err) => console.error("Error fetching accepted tasks:", err));
//   }, [user]);

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {tasks.length === 0 && <p>No accepted tasks yet!</p>}
//       {tasks.map((task) => (
//         <div key={task._id} className="card bg-white p-4 shadow rounded">
//           <h2 className="text-xl font-bold">{task.title}</h2>
//           <p>{task.summary}</p>
//           <p className="text-sm text-gray-500">Category: {task.category}</p>
//           <p className="text-sm text-gray-500">Level: {task.level}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyAcceptedTasks;



import React, { useEffect, useState } from "react";


const MyAcceptedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAcceptedTasks = async () => {
      if (!user?.
userEmail) return;

      try {
        // Fetch accepted tasks by current user
        // React
      const res = await fetch(`http://localhost:3000/acceptedTasks?email=${user.
userEmail}`);

        const acceptedData = await res.json();

        // Fetch related job details for each accepted task
        const detailedTasks = await Promise.all(
          acceptedData.map(async (task) => {
            try {
              const jobRes = await fetch(`http://localhost:3000/allJobs/${task.jobId}`);
              const job = await jobRes.json();
              return { ...task, ...job }; 
            } catch (err) {
              console.error("Error fetching job:", err);
              return task; 
            }
          })
        );

        setTasks(detailedTasks);
      } catch (error) {
        console.error("Error fetching accepted tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedTasks();
  }, [user?.
userEmail]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading your accepted tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-600">No accepted tasks yet!</p>;
  }

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white shadow rounded-xl p-4 border border-gray-100 hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {task.title || "Untitled Job"}
          </h2>
          <p className="text-gray-600 mb-2">{task.summary || "No summary available."}</p>
          <p className="text-sm text-gray-500">Category: {task.category || "N/A"}</p>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
          {task.status === "Completed" && (
            <p className="text-sm text-green-600 font-medium mt-1">
               Completed on: {new Date(task.completionDate).toLocaleDateString()}
            </p>
          )}
          {task.feedback && (
            <p className="text-sm italic text-blue-600 mt-2">“{task.feedback}”</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyAcceptedTasks;

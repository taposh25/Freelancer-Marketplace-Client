import React, { useEffect, useState } from "react";

const MyAcceptedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-accepted-tasks?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching accepted tasks:", err));
  }, [user]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.length === 0 && <p>No accepted tasks yet!</p>}
      {tasks.map((task) => (
        <div key={task._id} className="card bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.summary}</p>
          <p className="text-sm text-gray-500">Category: {task.category}</p>
          <p className="text-sm text-gray-500">Level: {task.level}</p>
        </div>
      ))}
    </div>
  );
};

export default MyAcceptedTasks;

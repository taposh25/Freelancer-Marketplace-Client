import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">JobPortal</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/all-jobs">All Jobs</Link>
        {user && <Link to="/add-job">Add Job</Link>}
        {user && <Link to="/my-jobs">My Jobs</Link>}
        {user ? (
          <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-ghost">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


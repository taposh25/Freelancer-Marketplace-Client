import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AllJobs from "../Pages/Jobs/AllJobs";
import PrivateRoute from "../components/PrivateRoute";
import AddJob from "../Pages/Jobs/AddJob";
import UpdateJob from "../Pages/Jobs/UpdateJob";
import MyAddedJobs from "../Pages/Jobs/MyAddedJobs";
import MyAcceptedTasks from "../Pages/Jobs/MyAcceptedTasks";
import NotFound from "../Pages/Error/NotFound";
import JobDetails from "../Pages/Jobs/JobDetails";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";

// import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import AllJobs from "../pages/Jobs/AllJobs";
// import JobDetails from "../pages/Jobs/JobDetails";
// import AddJob from "../pages/Jobs/AddJob";
// import UpdateJob from "../pages/Jobs/UpdateJob";
// import MyAddedJobs from "../pages/Jobs/MyAddedJobs";
// import MyAcceptedTasks from "../pages/Jobs/MyAcceptedTasks";
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";
// import NotFound from "../pages/Error/NotFound";
// import PrivateRoute from "../components/PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all-jobs", element: <AllJobs /> },
      { path: "/job/:id", element: <JobDetails /> },
      { path: "/add-job", element: <PrivateRoute><AddJob /></PrivateRoute> },
      { path: "/update-job/:id", element: <PrivateRoute><UpdateJob /></PrivateRoute> },
      { path: "/my-jobs", element: <PrivateRoute><MyAddedJobs /></PrivateRoute> },
      { path: "/my-accepted-tasks", element: <PrivateRoute><MyAcceptedTasks /></PrivateRoute> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);



export default router;

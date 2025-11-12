import React from "react";
 import AppRouter from "./router/Router";
import { ToastContainer } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;

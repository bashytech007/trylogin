import React from "react";
import { Outlet } from "react-router-dom";


// import { Container } from "rsuite";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      
      <Outlet/>
    </div>
  );
}

export default App;

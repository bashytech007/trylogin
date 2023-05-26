import React from 'react'
import { Link } from 'react-router-dom'
// import logo from '../../assets/blue_logo.svg'
 const Navbar = () => {
  return (
    <div className="w-full bg-white h-20 px-12 py-2 shadow-md text-black flex justify-between items-center">
      <div>
        {/* <img src={logo} className='w-6 h-6' alt="logo"/> */}
        <span className="text-2xl font-bold">TrySpacely</span>
      </div>
      <div>
      
          <button className="bg-white px-2 py-2 mr-4 rounded-md text-black border-2 border-black text-sm">
           Login
          </button>
          <button className="bg-blue-500 px-2 py-2 rounded-md text-white text-sm">
            Signup
          </button>
       
      </div>
    </div>
  );
} 
export default Navbar

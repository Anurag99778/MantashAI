import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const { userId } = useParams();
  return (
    <div className={`bg-primary w-64 p-4 shadow-md border transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed h-full`}>
      <div className="space-y-4 mt-14">
        <NavLink 
          to={`/dashboard/${userId}`} 
          className={({ isActive }) =>
            `text-black flex items-center font-bold p-4 border border-gray-300 ${isActive ? 'bg-dash text-white' : 'hover:bg-dash hover:text-white'}`
          }
          style={{ textDecoration: 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="ml-2">Dashboard</span>
        </NavLink>
        <NavLink 
          to={`/vessel-details/${userId}`} 
          className={({ isActive }) =>
            `text-black flex items-center font-bold p-4 shadow-sm border border-black ${isActive ? 'bg-dash text-white' : 'hover:bg-dash hover:text-white'}`
          }
          style={{ textDecoration: 'none' }}
        >
          Vessel Details
        </NavLink>
        <NavLink 
          to={`/biofouling-record/${userId}`} 
          className={({ isActive }) =>
            `text-black flex items-center font-bold p-4 shadow-sm border border-gray ${isActive ? 'bg-dash text-white' : 'hover:bg-dash hover:text-white'}`
          }
          style={{ textDecoration: 'none' }}
        >
          Biofouling Record
        </NavLink>
        <NavLink 
          to={`/ship-profile/${userId}`} 
          className={({ isActive }) =>
            `text-black flex items-center font-bold p-4 shadow-sm border border-gray-300 ${isActive ? 'bg-dash text-white' : 'hover:bg-dash hover:text-white'}`
          }
          style={{ textDecoration: 'none' }}
        >
          Ship Profile
        </NavLink>
        <NavLink 
          to={`/integration-status/${userId}`} 
          className={({ isActive }) =>
            `text-black flex items-center font-bold p-4 shadow-sm border border-gray-300 ${isActive ? 'bg-dash text-white' : 'hover:bg-dash hover:text-white'}`
          }
          style={{ textDecoration: 'none' }}
        >
          Integration Status
        </NavLink>
        <NavLink 
          to={`/settings/${userId}`} 
          className={({ isActive }) =>
            `text-black flex items-center font-bold p-4 shadow-sm border-black border-gray-300 ${isActive ? 'bg-dash text-white' : 'hover:bg-dash hover:text-white'}`
          }
          style={{ textDecoration: 'none' }}
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
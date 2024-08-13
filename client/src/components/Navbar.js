import React, { useState } from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { FaUserCircle, FaSearch } from 'react-icons/fa'; // Import FontAwesome search icon

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    
    setSearchQuery(e.target.value);
    // Handle search functionality (e.g., filtering data) here.
  };

  return (
    <nav className={`bg-primary shadow-md p-4 flex justify-between items-center ${isSidebarOpen ? 'ml-9' : 'ml-0'} transition-all duration-300`}>
      <div className="flex items-center">
        <div onClick={toggleSidebar} className="cursor-pointer text-gray-700 hover:text-gray-900">
          <IoReorderThreeOutline size={30} />
        </div>
        <span className="ml-4">
          <span className="text-[#232C44] font-poppins font-extrabold text-xl">MANTASH</span>{' '}
          <span className="font-poppins font-extrabold text-xl text-[#2A73E8]">AI</span>
        </span>
      </div>
      <div className="flex items-center">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-2 py-1 rounded-lg bg-gray border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FaSearch size={14} />
          </div>
        </div>
        {/* User Profile Icon */}
        <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 ml-4">
          <FaUserCircle size={30} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

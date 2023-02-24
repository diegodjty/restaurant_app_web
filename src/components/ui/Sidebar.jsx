import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl text-center font-bold tracking-wide">
          Restaurant App
        </p>
        <p className="mt-3 text-gray-600">Manage Your Restaurant</p>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? 'text-yellow-500 ' : 'text-gray-400') +
              ' p-1 block hover:bg-yellow-500 hover:text-gray-900'
            }
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'text-yellow-500 ' : 'text-gray-400') +
              ' p-1 block hover:bg-yellow-500 hover:text-gray-900'
            }
            to="/menu"
          >
            Menu
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

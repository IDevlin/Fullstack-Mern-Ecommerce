import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_header">
        <span>Admin Panel</span>
      </div>
      <ul className="sidebar_list">
        <li>
          <Link to="/admin/dashboard">
            <i className="bx bxs-dashboard"></i> <span>Dasboard</span>
          </Link>
        </li>
        <li><Link to="/admin/dashboard">
        <i className='bx bxl-product-hunt' ></i> <span>Products</span>
          </Link></li>
        <li><Link to="/admin/dashboard">
        <i className='bx bxs-user-circle' ></i> <span>Users</span>
          </Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

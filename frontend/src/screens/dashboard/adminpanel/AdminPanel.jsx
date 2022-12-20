import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const AdminPanel = () => {
  return (
    <div className='admin_container'>
        <div>
         <Sidebar/>
        </div>
      <div id='outlet'>
      <Outlet/>
      </div>
    </div>
  );
};

export default AdminPanel;

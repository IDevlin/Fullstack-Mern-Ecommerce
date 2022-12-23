import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const AdminPanel = () => {
 

  window.location.pathname.includes('admin')? document.querySelector('html').style.overflow = 'hidden' : ''
  return (
    <div className='admin_container'>
        <div>
         <Sidebar/>
        </div>
      <div id='outlet' >
      <Outlet/>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import routes from '../views/routes';

const Sidebar = () => {
  const [route, setRoute] = useState('');
  const location = useLocation();

  useEffect(() => {
    setRoute(window.location.pathname);
  }, [location]);

  const activeRoute = (prop) => {
    console.log(prop)
    return route.indexOf(prop.path) !== -1? 'active' : '';
  };

  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_header">
        <span>Admin Panel</span>
      </div>
      <ul className="sidebar_list">    
        {routes.map((props, key) => {
          return (
            <li className={activeRoute(props)} key={key}>
              <Link to={props.path}>
                <i className={props.icon}></i> <span>{props.name}</span>
              </Link>        
            </li>
          );
        })}
       
      </ul>
    </div>
  );
};

export default Sidebar;

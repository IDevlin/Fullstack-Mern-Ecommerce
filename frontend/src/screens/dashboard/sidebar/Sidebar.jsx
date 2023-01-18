import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import routes from '../views/routes';

const Sidebar = () => {
  const [route, setRoute] = useState('');
  const location = useLocation();

  useEffect(() => {
    setRoute(window.location.pathname);
  }, [location]);

  const activeRoute = (path) => {
    console.log(path)
    return route.indexOf(path) !== -1? 'active' : '';
  };

  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_header">
        <span>Admin Panel</span>
      </div>
      <ul className="sidebar_list">    
        {routes.map(({path, key, icon, name}) => {
          return (
            <li className={activeRoute(path)} key={key}>
              <Link to={path}>
                <i className={icon}></i> <span>{name}</span>
              </Link>        
            </li>
          );
        })}
      </ul>
      </div>
  );
};

export default Sidebar;

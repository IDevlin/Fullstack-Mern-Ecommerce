import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import App from './App';
import './index.css';
import './normalize.css';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

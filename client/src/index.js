import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/App';
import './presentation/styles/navbar.css';
import './presentation/styles/mainpage.css';
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // react strict mode leads to an issue - rendering multiple times : the app component
  // <React.StrictMode>
    <App />
  //</React.StrictMode> 
);

reportWebVitals();
//http://localhost:3000/
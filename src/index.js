import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './statemanagement/storage/index'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </React.StrictMode>
  </Router>
);

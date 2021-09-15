import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


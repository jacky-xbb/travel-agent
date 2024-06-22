import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Plan from './pages/Plan';
import Suggestion from './pages/Suggestion';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Plan />} />
          <Route path="suggestion" element={<Suggestion />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

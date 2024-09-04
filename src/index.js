import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PDFPage from './PDFPage';
import Certificado from './Certificado';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Certificado />} />
        <Route path="/pdf" element={<PDFPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Article } from './pages/Article';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Article />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

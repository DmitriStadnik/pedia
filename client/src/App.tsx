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
          <Route path="article/:id" element={<Article />} />
          <Route path="admin" element={<Admin />}>
            <Route path="edit/article/:id" element={<Admin />} />
            <Route path="edit/category/:id" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

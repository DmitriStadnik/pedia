import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Article } from './pages/Article';
import { Admin } from './pages/Admin';
import { Provider } from 'react-redux';
import store from './utils/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;

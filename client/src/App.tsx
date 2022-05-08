import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticlePage } from './pages/Article';
import { Admin } from './pages/Admin';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './utils/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<ArticlePage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path="admin" element={<Admin />}>
              <Route path="edit/article/:id" element={<Admin />} />
              <Route path="edit/category/:id" element={<Admin />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer autoClose={1000} hideProgressBar pauseOnHover />
    </Provider>
  );
};

export default App;

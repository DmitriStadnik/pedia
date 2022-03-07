import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Article } from './pages/Article';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Article} exact />
          <Route path="/article/:id" component={Article} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

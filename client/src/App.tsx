import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Article } from './pages/Article';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Article} exact />
          <Route path="/article/:id" component={Article} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

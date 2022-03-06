import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import { Navbar } from './components/Navbar';
import { Article } from './pages/Article';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="container">
        <Switch>
          <Route path="/" component={Article} exact />
          <Route path="/article/:id" component={Article} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

import React, { Component } from 'react';

import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import NotFound from '../NotFound/NotFound';

import './App.sass';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    );
  }
}
export default App;

import React from 'react';
import { Route } from 'react-router-dom';
import Favorites from '../views/Favorites';
import Home from '../views/Home';

const Routes = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/favorites" component={Favorites} />
    </>
  );
};

export default Routes;

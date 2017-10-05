import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import APIHelpers from '../../helpers/API.js'
import Login from '../Login/Login'

const AuthRoute = ({component, ...props}) => {
  if (APIHelpers.isAuthenticated()) {
    return <Route { ...props } component={ component } />
  } else {
    if(props.location.pathname === "/Login"){
      return <Route exact path="/Login" component={ Login } />
    }
    return <Redirect to={ '/Login' } />
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default AuthRoute;
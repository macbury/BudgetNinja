import React from "react";
import ReactDom from "react-dom";

import BeforeFilter from './lib/before_filters.jsx';

import AuthPage from './components/pages/auth/auth_page.js';
import NotFound from './components/pages/not_found_page.js';
import Layout from './components/layout';
import { browserHistory, Router, Route, IndexRoute } from "react-router";

/**
* Where to insert application in DOM
**/
const appContainer = document.getElementById('app-container');

/**
* Prepare routes
*/
ReactDom.render((
  <Router history={browserHistory}>
    <Route path='/' component={Layout} onEnter={BeforeFilter.ensureUserIsLoggedIn}>
      
    </Route>
    <Route path='/auth' component={AuthPage} onEnter={BeforeFilter.ensureUserIsLoggedOut} />
    <Route path="*" component={NotFound} />
  </Router>
), appContainer);

import React from "react";
import ReactDom from "react-dom";

import BeforeFilter from './lib/before_filters.jsx';

import ApplicationLayout from './components/application_layout.jsx'
import AuthPage from './components/pages/auth/auth_page.js';
import NotFound from './components/pages/not_found_page.js';
import Layout from './components/layout';
import Session from './components/session.jsx';

import { browserHistory, Router, Route, IndexRoute } from "react-router";

/**
* Where to insert application in DOM
**/
const appContainer = document.getElementById('app-container');

/**
* Prepare routes
*/
ReactDom.render((
  <Session>
    <Router history={browserHistory} >
      <Route path='/auth' component={AuthPage} onEnter={BeforeFilter.ensureUserIsLoggedOut} />
      <Route path='/' component={ApplicationLayout} onEnter={BeforeFilter.ensureUserIsLoggedIn}>
        <IndexRoute component={Layout} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Session>
), appContainer);

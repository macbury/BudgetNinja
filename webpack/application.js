import React from "react";
import ReactDom from "react-dom";

import AuthPage from './components/pages/auth/auth_page.js';
import NotFound from './components/pages/not_found_page.js';
import Auth     from 'j-toker';
import Layout from './components/layout';
import { browserHistory, Router, Route, IndexRoute } from "react-router";

const appContainer = document.getElementById('app-container');

console.log(Auth);

/**
* Prepare routes
*/
ReactDom.render((
  <Router history={browserHistory}>
    <Route path='/' component={Layout} />
    <Route path='/auth' component={AuthPage} />
    <Route path="*" component={NotFound} />
  </Router>
), appContainer);

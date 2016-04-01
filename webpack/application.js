import ReactDom from "react-dom";
import React from 'react';
import BeforeFilter from './lib/before_filters.jsx';

import ApplicationLayout from './components/application_layout.jsx'
import LoginPage from './components/pages/auth/login_page.jsx';
import RegisterPage from './components/pages/auth/register_page.jsx';
import NotFound from './components/pages/not_found_page.js';
import Session from './components/session.jsx';
import FlashMessages from './components/ui/flash_messages.jsx';
import BudgetPage from './components/pages/budget.jsx';
import OperationsPage from './components/pages/operations/operations.jsx';

import { browserHistory, Router, Route, IndexRoute } from "react-router";


window.onload = function() {
  /**
  * Where to insert application in DOM
  **/
  const appContainer = document.getElementById('app-container');

  /**
  * Prepare routes
  */
  ReactDom.render((
    <div>
      <FlashMessages />
      <Session>
        <Router history={browserHistory} >
          <Route path='/login' component={LoginPage} onEnter={BeforeFilter.ensureUserIsLoggedOut} />
          <Route path='/register' component={RegisterPage} onEnter={BeforeFilter.ensureUserIsLoggedOut} />
          <Route path='/' component={ApplicationLayout} onEnter={BeforeFilter.ensureUserIsLoggedIn}>
            <IndexRoute component={OperationsPage} />
            <Route path="/budget" component={BudgetPage} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </Session>
    </div>
  ), appContainer);
}

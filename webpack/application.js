import React from "react";
import ReactDom from "react-dom";

import BeforeFilter from './lib/before_filters.jsx';

import ApplicationLayout from './components/application_layout.jsx'
import LoginPage from './components/pages/auth/login_page.jsx';
import RegisterPage from './components/pages/auth/register_page.jsx';
import NotFound from './components/pages/not_found_page.js';
import Session from './components/session.jsx';
import ProfileSelect from './components/profile_select.jsx';
import FlashMessages from './components/ui/flash_messages.jsx';
import Budget from './components/pages/budget.jsx';

import { browserHistory, Router, Route, IndexRoute } from "react-router";

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
      <ProfileSelect>
        <Router history={browserHistory} >
          <Route path='/login' component={LoginPage} onEnter={BeforeFilter.ensureUserIsLoggedOut} />
          <Route path='/register' component={RegisterPage} onEnter={BeforeFilter.ensureUserIsLoggedOut} />
          <Route path='/' component={ApplicationLayout} onEnter={BeforeFilter.ensureUserIsLoggedIn}>
            <IndexRoute component={Budget} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </ProfileSelect>
    </Session>
  </div>
), appContainer);

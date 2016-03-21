import React from "react";
import ReactDom from "react-dom";
import Layout from './components/layout';
import Hello from './components/hello';
import { Router, Route, IndexRoute, browserHistory } from "react-router";

const appContainer = document.getElementById('app-container');

ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
       <Route path='test' component={Hello} />
    </Route>
  </Router>
), appContainer);

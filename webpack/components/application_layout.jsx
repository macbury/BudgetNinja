import React from 'react';
import SessionStore from '../stores/session_store.jsx';

/**
* This component contains whole ui
**/
export default class ApplicationLayout extends React.Component {

  constructor() {
    super();
  }

  render() {
    return <div>
      <h1>App</h1>
      {this.props.children}
    </div>
  }
}

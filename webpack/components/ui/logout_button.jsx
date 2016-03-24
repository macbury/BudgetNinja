import React from 'react';
import SessionStore from '../../stores/session_store.jsx';
import SessionActions from '../../actions/session_actions';

/**
* This logout user and redirect to /auth page
**/
export default class LogoutButton extends React.Component {

  constructor() {
    super();
  }

  onLogoutClick(e) {
    e.preventDefault();
    SessionActions.destroy();
    this.context.router.replace('/');
  }

  render() {
    return <button onClick={this.onLogoutClick.bind(this)}>Logout</button>;
  }
}

LogoutButton.contextTypes = {
  router: React.PropTypes.object.isRequired
};

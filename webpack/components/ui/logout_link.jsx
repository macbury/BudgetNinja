import React from 'react';
import SessionStore from '../../stores/session_store.jsx';
import SessionActions from '../../actions/session_actions';
import SessionConstants from '../../constants/session_constants';
import Dispatcher from '../../lib/dispatcher';

/**
* This logout user and redirect to /auth page
**/
export default class LogoutLink extends React.Component {

  constructor() {
    super();
    this.state = { loading: false };
  }

  componentWillMount() {
    this.registerToken = Dispatcher.register(this.onEvents.bind(this));
  }

  componentWillUnmount() {
    Dispatcher.unregister(this.registerToken);
  }

  onEvents(action) {
    switch(action.actionType) {
      case SessionConstants.SESSION_DESTROY:
        this.setState({ loading: true });
        this.context.router.replace('/login');
      break;

      case SessionConstants.SESSION_DESTROY_SUCCESS:
        this.context.router.replace('/login');
      break;
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    SessionActions.destroy();
  }

  render() {
    return <a href="#" onClick={this.onLogoutClick.bind(this)} disabled={this.state.loading}>Logout</a>;
  }
}

LogoutLink.contextTypes = {
  router: React.PropTypes.object.isRequired
};

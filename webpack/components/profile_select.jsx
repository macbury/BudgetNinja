import React from 'react';
import cookie from 'react-cookie';
import SessionStore from '../stores/session_store.jsx';
import LogoutButton from './ui/logout_button.jsx';

const COOKIE_SELECTED_PROFILE_ID = 'COOKIE_SELECTED_PROFILE_ID';
/**
* Show profile select after user logs in if user did not  select any profile yet
*/
export default class ProfileSelect extends React.Component {

  constructor() {
    super();
    this.state = this.getStateForCurrentUser();
  }

  getStateForCurrentUser() {
    return {
      loggedIn: SessionStore.isLoggedIn(),
      selectedProfileId: cookie.load(COOKIE_SELECTED_PROFILE_ID)
    };
  }

  componentWillMount() {
    SessionStore.on('change', this.onSessionChange.bind(this));
  }

  onSessionChange() {
    this.setState(this.getStateForCurrentUser());
  }

  componentWillUnmount() {
    SessionStore.remove('change', this.onSessionChange);
  }

  render() {
    if (this.state.selectedProfileId == null && this.state.loggedIn) {
      return <div>
        Select profiel
      </div>;
    } else {
      return <div>{this.props.children}</div>;
    }
  }
}

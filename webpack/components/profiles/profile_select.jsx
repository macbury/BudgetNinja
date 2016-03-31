import React from 'react';
import SessionStore from '../../stores/session_store.jsx';
import ProfileStore from '../../stores/profiles_store';
import ProfileActions from '../../actions/profile_actions';
import ProfileConstants from '../../constants/profiles_constants';

import ProfileOption from './profile_option.jsx';

import styles from './profiles.scss';
/**
* Show profile select after user logs in if user did not  select any profile yet
*/
export default class ProfileSelect extends React.Component {

  constructor() {
    super();
    this.state = this.getStateForCurrentUser();
    this._onSessionChange = this.onSessionChange.bind(this);
  }

  getStateForCurrentUser() {
    return {
      loggedIn: SessionStore.isLoggedIn(),
      selectedProfileId: ProfileStore.getCurrentProfileId(),
      profiles: ProfileStore.getAll()
    };
  }

  componentDidMount() {
    ProfileStore.addChangeListener(this._onSessionChange);
    ProfileActions.fetchInNextTick();
  }

  onSessionChange() {
    this.setState(this.getStateForCurrentUser());
  }

  componentWillUnmount() {
    ProfileStore.removeChangeListener(this._onSessionChange);
  }

  getListOfProfileOptions() {
    return this.state.profiles.map((profile) => {
      return <ProfileOption key={profile.id} {...profile} />;
    });
  }

  render() {
    if (this.state.selectedProfileId == null && this.state.loggedIn) {
      if (this.state.profiles != null) {
        return <div className={ styles.profile_container }>
          <div className={ styles.col_profiles_select }>
            <h2>Select your profile</h2>
            <div className={ styles.profiles_select_group }>
              { this.getListOfProfileOptions() }
            </div>
          </div>
        </div>
      } else {
        return <div>Loading profiles...</div>
      }
    } else {
      return <div>{this.props.children}</div>;
    }
  }
}

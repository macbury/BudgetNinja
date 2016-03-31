import React from 'react';
import ProfileActions from '../../actions/profile_actions';

import styles from './profiles.scss';
/**
* Shows simple link avatar for profile
*/
export default class ProfileOption extends React.Component {

  onProfileClick(e) {
    e.preventDefault();
    ProfileActions.setCurrent(this.props);
  }

  render() {
    return <a href="#" className={ styles.profile_option } onClick={this.onProfileClick.bind(this)}>{this.props.name}</a>;
  }
}

import React from 'react';
import ProfileActions from '../../actions/profile_actions';

/**
* Shows simple link avatar for profile
*/
export default class ProfileOption extends React.Component {

  onProfileClick(e) {
    e.preventDefault();
    ProfileActions.setCurrent(this.props);
  }

  render() {
    return <a href="#" onClick={this.onProfileClick.bind(this)}>{this.props.name}</a>;
  }
}

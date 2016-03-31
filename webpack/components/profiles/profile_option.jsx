import React from 'react';
import ProfileActions from '../../actions/profile_actions';

/**
* Shows simple link avatar for profile
*/
export default class ProfileOption extends React.Component {
  render() {
    return <a href="#">{this.props.name}</a>;
  }
}

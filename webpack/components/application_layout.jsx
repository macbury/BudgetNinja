import React from 'react';
import LogoutButton from './ui/logout_button.jsx';
import NavigationBar from './ui/navbar.jsx';
/**
* This component contains whole ui
**/
export default class ApplicationLayout extends React.Component {

  constructor() {
    super();
  }

  render() {
    return <div>
      <NavigationBar />
      <LogoutButton />
      {this.props.children}
    </div>
  }
}

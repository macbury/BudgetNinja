import React from 'react';
import LogoutButton from './ui/logout_button.jsx';
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
      <LogoutButton />
      {this.props.children}
    </div>
  }
}

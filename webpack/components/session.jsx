import React from 'react';
import SessionStore from '../stores/session_store.jsx';

/**
* This component will render its children after {@link SessionStore} validates token, otherwise show information about it
*/
export default class Session extends React.Component {

  constructor() {
    super();
    this.state = { bootComplete: false };
  }

  onSessionBoot() {
    this.setState({ bootComplete: true });
  }

  componentWillMount() {
    SessionStore.on('boot', this.onSessionBoot.bind(this));
  }

  componentWillUnmount() {
    SessionStore.remove('boot', this.onSessionBoot);
  }

  render() {
    if (this.state.bootComplete) {
      return this.props.children;
    } else {
      return <div>Checking session...</div>
    }
  }
}

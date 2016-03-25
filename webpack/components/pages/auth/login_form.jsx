import React from 'react';
import TextField from '../../ui/text_field.jsx';
import SessionStore from '../../../stores/session_store.jsx';
import SessionActions from '../../../actions/session_actions';
import Dispatcher from '../../../lib/dispatcher';
import SessionContstants from '../../../constants/session_constants';
/**
* Show form that allows user to log in
**/
export default class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  componentWillMount() {
    this.registerToken = Dispatcher.register(this.onEvents.bind(this));
  }

  componentWillUnmount() {
    Dispatcher.unregister(this.registerToken);
  }

  onEvents(action) {
    switch(action.actionType) {
      case SessionContstants.SESSION_CREATE:
        this.setState({ loading: true, error: null });
      break;

      case SessionContstants.SESSION_CREATE_SUCCESS:
        this.redirectBackToPageOrToRoot();
      break;

      case SessionContstants.SESSION_CREATE_FAILURE:
        this.setState({ loading: false, error: action.error });
      break;
    }
  }

  redirectBackToPageOrToRoot() {
    const { location } = this.props

    if (location != null && location.state != null && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname);
    } else {
      this.context.router.replace('/');
    }
  }

  signIn(e) {
    e.preventDefault();
    SessionActions.create(this.state.email, this.state.password);
  }

  onEmailFieldChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordFieldChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return <form onSubmit={this.signIn.bind(this)} disabled={this.state.loading}>
      <TextField label="E-mail:" name='email' value={this.state.email} type="email" onChange={this.onEmailFieldChange.bind(this)} disabled={this.state.loading} />
      <TextField label="Password:" name='password' value={this.state.password} type="password" onChange={this.onPasswordFieldChange.bind(this)} disabled={this.state.loading} />
      <button disabled={this.state.loading}>Sign in</button>
      <p>{ this.state.error }</p>
    </form>;
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

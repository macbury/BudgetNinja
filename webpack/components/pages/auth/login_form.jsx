import React from 'react';
import TextField from '../../ui/text_field.jsx';
import SessionStore from '../../../stores/session_store.jsx';

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

  /**
  * Redirect to last path or to root path
  */
  onSignInSuccess(result) {
    const { location } = this.props
    this.setState({ loading: true, error: null });
    if (location != null && location.state != null && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/')
    }
  }

  onSignInFailure(result) {
    console.log("error", result);
    this.setState({ loading: false, error: result.reason });
  }

  signIn(e) {
    e.preventDefault();
    var form = this.state;
    this.setState({ loading: true, error: null });
    SessionStore.login(form.email, form.password).then(this.onSignInSuccess.bind(this)).fail(this.onSignInFailure.bind(this));
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

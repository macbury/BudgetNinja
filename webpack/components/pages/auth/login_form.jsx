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
    };
  }

  onSignInSuccess(result) {
    console.log("success", result);
    this.setState({ loading: false });
  }

  onSignInFailure(result) {
    console.log("error", result);
    this.setState({ loading: false });
  }

  signIn(e) {
    e.preventDefault();
    var form = this.state;
    this.setState({ loading: true });
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
    </form>;
  }

}

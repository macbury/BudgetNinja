import React from 'react';
import TextField from '../../ui/text_field.jsx';
/**
* Show form that allows user to log in
**/
export default class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  signIn(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return <form onSubmit={this.signIn.bind(this)}>
      <TextField label="E-mail:" name='email' value={this.state.email} type="email" />
      <TextField label="Password:" name='password' value={this.state.password} type="password" />
      <button>Sign in</button>
    </form>;
  }

}

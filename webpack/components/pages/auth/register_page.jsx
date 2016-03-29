import TextField from '../../ui/text_field.jsx';
import React from 'react';
import { Link } from 'react-router';
import styles from './login_page.scss';
import RegistrationActions from '../../../actions/registration_actions';
import Dispatcher from '../../../lib/dispatcher';
import RegistrationConstants from '../../../constants/registration_constants';

export default class RegisterPage extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    RegistrationActions.create(this.state.email, this.state.password, this.state.password_confirmation);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onPasswordConfirmationChange(event) {
    this.setState({ password_confirmation: event.target.value });
  }

  componentWillMount() {
    this.registerToken = Dispatcher.register(this.onEvents.bind(this));
  }

  onEvents(action) {
    switch(action.actionType) {
      case RegistrationConstants.REGISTRATION_CREATE:
        this.setState({ loading: true, error: null });
      break;

      case RegistrationConstants.REGISTRATION_CREATE_SUCCESS:
        this.redirectBackToPageOrToRoot();
      break;

      case RegistrationConstants.REGISTRATION_CREATE_FAILURE:
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

  componentWillUnmount() {
    Dispatcher.unregister(this.registerToken);
  }

  render() {
    return <div className={styles.auth_container}>
      <div className={styles.row}>
        <div className={styles.col_sign_up}>
          <form disabled={this.state.loading} onSubmit={this.handleFormSubmit.bind(this)}>
            <TextField label="E-mail:" name='email' value={this.state.email} type="email" disabled={this.state.loading} onChange={this.onEmailChange.bind(this)} />
            <TextField label="Password:" name='password' value={this.state.password} type="password" disabled={this.state.loading} onChange={this.onPasswordChange.bind(this)} />
            <TextField label="Confirm password:" name='password_confirmation' value={this.state.password_confirmation} type="password" disabled={this.state.loading}  onChange={this.onPasswordConfirmationChange.bind(this)} />
            <button disabled={this.state.loading} className={ styles.register_button }>Register</button>
            <p>
              <Link to="/login" className={ styles.login_link }>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>;
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

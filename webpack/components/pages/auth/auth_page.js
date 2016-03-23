import React from 'react';
import styles from './auth_page.scss';
import LoginForm from './login_form.jsx';
/**
* This pages show Login and Registration form for user
*/
export default class AuthPage extends React.Component {
  render() {
    return <div className={styles.auth_container}>
      <div className={styles.row}>
        <div className={styles.col_sign_in}>
          <LoginForm />
        </div>
        <div className={styles.col_sign_up}>B</div>
      </div>
    </div>;
  }
}
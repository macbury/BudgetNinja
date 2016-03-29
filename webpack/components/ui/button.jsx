import React from 'react';

import styles from './button.scss';

/**
* This logout user and redirect to /auth page
**/
export default class Button extends React.Component {

  constructor() {
    super();
  }

  onLogoutClick(e) {
    e.preventDefault();
    SessionActions.destroy();
  }

  render() {
    return <button className={styles.normal} {...this.props}>{this.props.value}</button>;
  }
}

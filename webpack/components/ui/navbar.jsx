import React from 'react';
import styles from './navbar.scss';
export default class NavigationBar extends React.Component {
  render() {
    return <div className={ styles.toolbar }>
      <div className={ styles.toolbar_inner }>
        <div className={ styles['navbar-header'] }>
          <a className={ styles['navbar-brand'] } href="#">Project name</a>
        </div>
      </div>
    </div>;
  }
}

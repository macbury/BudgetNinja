import React from 'react';
import styles from './fab.scss';

export default class Fab extends React.Component {
  render() {
    return <div className={ styles.button_container }>
      <button className={ styles.button }>+</button>
    </div>;
  }
}

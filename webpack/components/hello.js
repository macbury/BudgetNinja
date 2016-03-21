import React from 'react';
import styles from './hello.scss';

export default class Hello extends React.Component {
  render() {
    return (
      <span className={styles.normal}>Hello there friend!!!</span>
    );
  }
}

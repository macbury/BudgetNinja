import React from 'react';
import styles from './hello.scss';
import { Link } from 'react-router';

export default class Hello extends React.Component {
  render() {
    return (
      <span className={styles.normal}>
        Hello there friend!!!
        <Link to="/">Home</Link>
      </span>
    );
  }
}

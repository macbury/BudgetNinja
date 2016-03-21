import React from "react";
import Hello from './hello';
import styles from './theme.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <h1>
        Works:
        <Hello />
        <Hello />
        <Hello />
      </h1>
    );
  }
}

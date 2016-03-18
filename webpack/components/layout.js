import React from "react";
import Hello from './hello';

export default class Layout extends React.Component {
  render() {
    return (
      <h1>
        Works! <Hello />
      </h1>
    );
  }
}

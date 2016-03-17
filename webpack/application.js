import React from "react";
import ReactDom from "react-dom";
import Hello from './components/hello';

class Layout extends React.Component {
  render() {
    return (
      <h1>Works! <Hello /> </h1>
    );
  }
}

const app = document.getElementById('app');
ReactDom.render(<Layout/>, app);

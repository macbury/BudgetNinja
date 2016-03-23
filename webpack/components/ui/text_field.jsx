import React from 'react';
import styles from './text_field.scss';
/**
* Render bootstrap 3 styled input
**/
export default class TextField extends React.Component {

  constructor() {
    super();

    this.props = {
      name: 'example-text-field',
      label: 'Example label',
      type: 'text',
      value: '',
      error: null,
    };
  }

  render() {
    return <div className="form-group">
      <label for={this.props.name}>{ this.props.label }</label>
      <input type={this.props.type} className="form-control" name={this.props.name} value={this.props.value} />
      <span>{ this.props.error }</span>
    </div>;
  }
}

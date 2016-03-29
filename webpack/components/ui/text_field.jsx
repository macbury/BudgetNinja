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
      onChange: null,
      disabled: null
    };
  }

  render() {
    var errorSpan = this.props.error !== null ? <span>{ this.props.error }</span> : null;

    return <div className={ styles['form-group'] }>
      <label for={this.props.name}>{ this.props.label }</label>
      <input type={this.props.type} className={ styles['form-control'] } id={this.props.name} name={this.props.name} value={this.props.value} onChange={this.props.onChange} disabled={this.props.disabled} />
      { errorSpan }
    </div>;
  }
}

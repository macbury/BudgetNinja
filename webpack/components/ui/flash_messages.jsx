import React from 'react';
import FlashMessagesStore from '../../stores/flash_messages_store';

//TODO style like this http://bootsnipp.com/snippets/AVX7K

class FlashMessage extends React.Component {
  render() {
    return <p>{ this.props.message }</p>;
  }
}

/**
* Render list of flash messages, that can be dismissed
*/
export default class FlashMessages extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    FlashMessagesStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    FlashMessagesStore.remove('change', this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      messages: FlashMessagesStore.getFlashes()
    });
  }

  render() {
    const FlashComponents = this.state.messages.map((flash_message) => {
      return <FlashMessage key={flash_message.id} {...flash_message} />
    });
    return <div>{ FlashComponents }</div>;
  }
}

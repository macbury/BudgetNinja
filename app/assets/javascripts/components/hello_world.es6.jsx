class HelloWorld extends React.Component {
  render () {
    return (
      <div>
        <b>Msg: {this.props.msg}</b>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  msg: React.PropTypes.string
};

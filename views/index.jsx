var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}

module.exports = HelloMessage;
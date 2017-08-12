let React = require('react');

class Header extends React.Component {
	constructor(props) {
		super(props);
		let divStyle = {
			display: `table`,
			position: `relative`,
			minHeight: `500px`,
			width: `100%`,
			backgroundColor: `#ff0000`,
			margin: `0`,
			backgroundSize: `cover`
		};

		this.style ={
			div: divStyle
		}
	}

  render() {

    return (
			<div style={this.style.div}>
				<h1>Hello {this.props.username}</h1>
			</div>
		)
  };
}

module.exports = Header;
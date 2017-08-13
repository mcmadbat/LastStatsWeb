import React from 'react'

class Header extends React.Component {
	constructor(props) {
		super(props);

		let divStyle = {
			display: `flex`,
			position: `relative`,
			minHeight: `45vh`,
			width: `100%`,
			backgroundColor: `#ff0000`,
			margin: `0`,
			color: `white`
		}

		let h1Style = {
			textAlign : `center`,
			verticalAlign: `middle`,
			color: `white`
		}

		let imgStyle = {
			height: `200px`,
			borderRadius: `50%`,
			margin: `auto`,
			display: `block`
		}

		let centerDiv = {
			margin: `auto 5px`,
			width: `100%`
		}

		this.style ={
			div: divStyle,
			h1 : h1Style,
			centerDiv: centerDiv,
			img : imgStyle
		}
	}

  render() {
  	let user = this.props.user;
  	let name = user.realname ? user.realname : user.name;

    return (
			<div style={this.style.div}>

				<div style={this.style.centerDiv}>

					<h1 style={this.style.h1}>Hello {name}</h1>
					<img style={this.style.img} src={user.imgUrl}/>
					<h3 style={{textAlign: `center`}}>
						Plays: {user.playcount}
					</h3>

				</div>
			
			</div>
		)
  };
}

module.exports = Header;
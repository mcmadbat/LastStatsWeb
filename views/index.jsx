let React = require('react');
let Header = require('./layouts/header')

class Index extends React.Component {
  render() {
    return (
    	<body style = {{margin:`0`}}>
    		<Header username={this.props.username}/>
    	</body>
  	)
  };
};


module.exports = Index;
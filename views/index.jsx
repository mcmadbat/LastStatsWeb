import React from 'react'
import App from './app'
import axios from 'axios'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    let user = 'mcmadbat3'

    axios
      .get(`http://localhost:3000/api/user/getinfo?user=${user}`)
      .then(res => {
        this.setState({user: res.data})
      })
  }

  render () {
    return (
      <body style={{margin: `0`}}>
        <App user={this.state.user} />
      </body>
    )
  };
};

module.exports = Index

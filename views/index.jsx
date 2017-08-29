import React from 'react'
import App from './app'
import axios from 'axios'
import UsernameInput from './layouts/usernameInput'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleUsernameChange = (username) => {
    this.setState({username})
    this.loadUserInfo(username)
  }

  loadUserInfo(username) {
    axios
      .get(`http://localhost:3000/api/user/getinfo?user=${username}`)
      .then(res => {
        this.setState({user: res.data})
      })
  }

  render () {
    if (!this.state.username) {
      return <UsernameInput handleUsernameChange={this.handleUsernameChange}/>
    }
    return <App user={this.state.user} />
  };
};

module.exports = Index

import React from 'react'
import App from './app'
import axios from 'axios'
import UsernameInput from './layouts/usernameInput'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
  }

  handleUsernameChange (username) {
    this.setState({username})
    this.loadUserInfo(username)
  }

  loadUserInfo (username) {
    axios
      .get(`http://localhost:3000/api/user/getinfo?user=${username}`)
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(() => {
        this.setState({showError: true, username: ''})
      })
  }

  render () {
    if (!this.state.username) {
      return <UsernameInput showError={this.state.showError} handleUsernameChange={this.handleUsernameChange} />
    }
    return <App user={this.state.user} />
  };
};

module.exports = Index

import React from 'react'
import Overview from './sections/overview'
import Header from './layouts/header'
import Artists from './sections/artists'
import Albums from './sections/albums'
import Tracks from './sections/tracks'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.initScrobbles = this.initScrobbles.bind(this)

    this.state = {loading: true}
  }

  initScrobbles (username) {
    return axios
            .get(`http://localhost:3000/api/user/getscrobbles?user=${username}&receiveData=false`, {'timeout': 600000})
  }

  componentDidMount () {
    if (this.props.user) {
      // shouldn't happen but do it just in case
      this.initScrobbles(this.props.user.name)
          .then(data => {
            this.setState({loading: false})
          })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.user) {
      // shouldn't happen but do it just in case
      this.initScrobbles(newProps.user.name)
          .then(data => {
            this.setState({loading: false})
          })
    }
  }

  render () {
    if (!this.props.user) {
      return <h1>loading</h1>
    }

    return (
      <div style={{margin: `0`}}>
        <Header user={this.props.user} loading={this.state.loading} />
        <Overview user={this.props.user} loading={this.state.loading} />
        <Artists user={this.props.user} loading={this.state.loading} />
        <Albums user={this.props.user} loading={this.state.loading} />
        <Tracks user={this.props.user} loading={this.state.loading} />
      </div>
    )
  };
};

module.exports = App

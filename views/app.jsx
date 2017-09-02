import React from 'react'
import Overview from './sections/overview'
import Header from './layouts/header'
import Artists from './sections/artists'
import Albums from './sections/albums'
import Tracks from './sections/tracks'

class App extends React.Component {
  render () {
    if (!this.props.user) {
      return <h1>loading</h1>
    }

    return (
      <div style={{margin: `0`}}>
        <Header user={this.props.user} />
        <Overview user={this.props.user} />
        <Artists user={this.props.user} />
        <Albums user={this.props.user} />
        <Tracks user={this.props.user} />
      </div>
    )
  };
};

module.exports = App

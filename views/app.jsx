import React from 'react'
import Overview from './sections/overview'
import Header from './layouts/header'

class App extends React.Component {
  render () {
    if (!this.props.user) {
      return <h1>loading</h1>
    }

    return (
      <body style={{margin: `0`}}>
        <Header user={this.props.user} />
        <Overview user={this.props.user} />
      </body>
    )
  };
};

module.exports = App

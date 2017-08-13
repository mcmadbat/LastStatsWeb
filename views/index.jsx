import React from 'react'
import Header from './layouts/header'

class Index extends React.Component {
  render () {
    return (
      <body style={{margin: `0`}}>
        <Header user={this.props.user} />
      </body>
    )
  };
};

module.exports = Index

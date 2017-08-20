import React from 'react'
import Artists from './sections/artists'
import Header from './layouts/header'

class Index extends React.Component {
  render () {
    return (
      <html>
        <head>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' />
        </head>
        
        <body style={{margin: `0`}}>
          <Header user={this.props.user} />
          <Artists user={this.props.user}/>
        </body>
      </html>
    )
  };
};

module.exports = Index

import React from 'react'
import {Container, Input, UncontrolledAlert, Button} from 'reactstrap'

class UsernameInput extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      color: `red`,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      minWidth: '400px',
      maxWidth: '800px'
    }

    let backgroundStyle = {
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,0,0,0.5))'
    }

    let h1Style = {
      textAlign: `center`,
      fontSize: '3em'
    }

    let inputStyle = {
      width: '100%',
      height: '50px',
      fontSize: '20px',
      textAlign: 'center',
      border: '1px solid black',
      margin: '30px',
      color: 'red'
    }

    this.style = {
      div: divStyle,
      h1: h1Style,
      input: inputStyle,
      backgroundStyle
    }

    this.state = {username: ''}
  }

  onclick () {
    this.props.handleUsernameChange(this.state.username)
  }

  handleChange (e) {
    this.setState({ username: e.target.value })
  }

  render () {
    if (this.props.showError) {
      return (
        <div style={this.style.backgroundStyle}>
          <Container style={this.style.div}>
            <UncontrolledAlert color='danger'>
              <strong>Oh snap!</strong> The user you searched for doesn't exist!
            </UncontrolledAlert>
            <h1 style={this.style.h1}>Please enter your last.fm username</h1>
            <Input name='username' type='text' size='lg' id='inputUser' placeholder='mcmadbat3' style={this.style.input} onChange={this.handleChange.bind(this)} />
            <Button color='primary' onClick={() => this.onclick()}>Submit</Button>
          </Container>
        </div>
      )
    }
    return (
      <div style={this.style.backgroundStyle}>
        <Container style={this.style.div}>
          <h1 style={this.style.h1}>Please enter your last.fm username</h1>
          <Input name='username' type='text' size='lg' id='inputUser' placeholder='mcmadbat3' style={this.style.input} onChange={this.handleChange.bind(this)} />
          <Button color='primary' onClick={() => this.onclick()}>Submit</Button>
        </Container>
      </div>
    )
  }
}

module.exports = UsernameInput

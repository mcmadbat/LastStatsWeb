import React from 'react'
import {Container, Input, FormGroup, Label, Button} from 'reactstrap'

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

    let h1Style = {
      textAlign: `center`,
      fontSize: '3em'
    }

    let centerDiv = {
      display: 'block',
      width: '100%',
      margin: '0 auto'
    }

    let inputStyle = {
      width: '100%',
      height: '50px',
      fontSize: '20px',
      textAlign: 'center',
      border: '1px solid black',
      margin: '30px'
    }

    this.style = {
      div: divStyle,
      h1: h1Style,
      centerDiv: centerDiv,
      input: inputStyle
    }

    this.state = { username: ''}
  }

  onclick () {
    this.props.handleUsernameChange(this.state.username)
  }

  handleChange (e) {
    this.setState({ username: e.target.value })
  }

  render () {
    return (
      <Container style={this.style.div}>
        <h1 style={this.style.h1}>Please enter your last.fm username</h1>
        <Input name='username' type='text' size='lg' id='inputUser' placeholder='mcmadbat3' style={this.style.input} onChange={this.handleChange.bind(this)} />
        <Button color='primary' onClick={() => this.onclick()}>Submit</Button>
      </Container>
    )
  }
}

module.exports = UsernameInput

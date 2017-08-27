import React from 'react'
import {Container, Row, Col} from 'reactstrap'

class Header extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      backgroundColor: `#ff0000`,
      padding: `50px`,
      color: `white`
    }

    let h1Style = {
      textAlign: `center`
    }

    let imgStyle = {
      height: `280px`,
      borderRadius: `50%`,
      margin: `auto`,
      display: 'block',
      padding: '15px'
    }

    let centerDiv = {
      margin: `auto 50px`
    }

    this.style = {
      div: divStyle,
      h1: h1Style,
      centerDiv: centerDiv,
      img: imgStyle
    }
  }

  render () {
    let user = this.props.user
    let name = user.realname ? user.realname : user.name

    return (
      <Container fluid style={this.style.div}>
        <Row className='justify-content-sm-center'>
          <Col sm='6'>
            <div style={this.style.centerDiv}>
              <h1 style={this.style.h1}>Hello {name}</h1>
              <img style={this.style.img} src={user.imgUrl} />
              <h3 style={{textAlign: `center`}}>
                Plays: {user.playcount}
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
    )
  };
}

module.exports = Header

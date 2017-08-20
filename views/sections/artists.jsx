import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import ChartCard from './../layouts/chartCard'

class Artists extends React.Component {
  constructor(props) {
    super(props)

    let divStyle = {
      margin: 'auto 50px'
    }

    let h1Style = {
      textAlign: `center`,
      margin: '10px'
    }

    this.style = {
      div: divStyle,
      h1: h1Style
    }
  }

  render () {
    return (
      <Container fluid='true' style={this.style.divStyle}>
        <Row className='justify-content-sm-center'>
          <Col sm='6'>
            <h1 style={this.style.h1}>Artists</h1>
          </Col>
        </Row>

        <Row>
          <Col sm='12' lg='4'>
            <ChartCard/>
          </Col>
          <Col sm='12' lg='4'>
            <ChartCard/>
          </Col>
          <Col sm='12' lg='4'>
            <ChartCard/>
          </Col>
          <Col sm='12' lg='4'>
            <ChartCard/>
          </Col>
          <Col sm='12' lg='4'>
            <ChartCard/>
          </Col>
          <Col sm='12' lg='4'>
            <ChartCard/>
          </Col>
        </Row>
      </Container>
    )
  }
}

module.exports = Artists
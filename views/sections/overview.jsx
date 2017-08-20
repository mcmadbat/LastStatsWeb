import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import BarGraphCard from './../layouts/barGraphCard'
import TableCard from './../layouts/tableCard'
import axios from 'axios'

class Artists extends React.Component {
  constructor (props) {
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

    this.state = {}
  }

  componentDidMount () {
    let username = this.props.user.name
    axios
      .get(`http://localhost:3000/api/user/scrobblecount?user=${username}`)
      .then(res => {
        let data = Object
          .keys(res.data).map(x => {
            return {
              year: parseInt(x),
              plays: res.data[x]
            }
          })

        this.setState({playsByYear: data})
      })

    axios
      .get(`http://localhost:3000/api/user/topartists?user=${username}`)
      .then(res => {
        let data = Object
          .keys(res.data).map(x => {
            return {
              artist: x,
              plays: res.data[x]
            }
          })

        let columns = [{
          id: 'artist',
          title: 'Artist',
          isKey: true
        }, {
          id: 'plays',
          title: 'Plays',
          isKey: false
        }]

        this.setState({topartists: data, topArtistColumns: columns})
      })
  }

  render () {
    return (
      <Container fluid style={this.style.divStyle}>
        <Row className='justify-content-sm-center'>
          <Col sm='6'>
            <h1 style={this.style.h1}>Overview</h1>
          </Col>
        </Row>

        <Row>
          <Col sm='12' lg='4'>
            <BarGraphCard title='Plays by Year' data={this.state.playsByYear} x='year' y='plays' />
          </Col>
          <Col sm='12' lg='4'>
            <TableCard title='Top Artists' data={this.state.topartists} columns={this.state.topArtistColumns} />
          </Col>
        </Row>
      </Container>
    )
  }
}

module.exports = Artists

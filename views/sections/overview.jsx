import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import BarGraphCard from './../layouts/barGraphCard'
import TableCard from './../layouts/tableCard'
import axios from 'axios'

class Overview extends React.Component {
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
        this.setState({playsByYear: res.data})
      })

    axios
      .get(`http://localhost:3000/api/user/scrobblecount?user=${username}&range=lastyear`)
      .then(res => {
        this.setState({lastYear: res.data})
      })

    axios
      .get(`http://localhost:3000/api/user/topartists?user=${username}&limit=10`)
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

        this.setState({topArtists: data, topArtistColumns: columns})
      })

    axios
      .get(`http://localhost:3000/api/user/topalbums?user=${username}&limit=10`)
      .then(res => {
        let data = Object
          .keys(res.data).map(x => {
            return {
              album: x,
              plays: res.data[x]
            }
          })

        let columns = [{
          id: 'album',
          title: 'Album',
          isKey: true
        }, {
          id: 'plays',
          title: 'Plays',
          isKey: false
        }]

        this.setState({topAlbums: data, topAlbumColumns: columns})
      })

    axios
      .get(`http://localhost:3000/api/user/toptracks?user=${username}&limit=10`)
      .then(res => {
        let data = Object
          .keys(res.data).map(x => {
            return {
              title: x,
              plays: res.data[x]
            }
          })

        let columns = [{
          id: 'title',
          title: 'title',
          isKey: true
        }, {
          id: 'plays',
          title: 'Plays',
          isKey: false
        }]

        this.setState({topTracks: data, topTracksColumns: columns})
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
          <Col sm='12' lg='6'>
            <BarGraphCard title='Plays by Year' data={this.state.playsByYear} />
          </Col>
          <Col sm='12' lg='6'>
            <BarGraphCard title='Last 12 Months' data={this.state.lastYear} />
          </Col>
          <Col sm='12' lg='4'>
            <TableCard title='Top Artists' data={this.state.topArtists} columns={this.state.topArtistColumns} />
          </Col>
          <Col sm='12' lg='4'>
            <TableCard title='Top Albums' data={this.state.topAlbums} columns={this.state.topAlbumColumns} />
          </Col>
          <Col sm='12' lg='4'>
            <TableCard title='Top Tracks' data={this.state.topTracks} columns={this.state.topTracksColumns} />
          </Col>
        </Row>
      </Container>
    )
  }
}

module.exports = Overview

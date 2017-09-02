import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import LineGraphCard from './../layouts/lineGraphCard'
import axios from 'axios'
import Loading from 'react-loading-animation'

class OverviewSection extends React.Component {
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

    this.state = {loading: true}
  }

  getPlaysByYear () {
    let username = this.props.user.name

    return axios
      .get(`http://localhost:3000/api/user/scrobblecount?user=${username}`, {'timeout': 600000})
      .then(res => {
        this.setState({playsByYear: res.data})
      })
  }

  getPlaysLastYear () {
    let username = this.props.user.name

    return axios
      .get(`http://localhost:3000/api/user/scrobblecount?user=${username}&range=lastyear`, {'timeout': 600000})
      .then(res => {
        this.setState({lastYear: res.data})
      })
  }

  getTopArtists () {
    let username = this.props.user.name

    return axios
      .get(`http://localhost:3000/api/user/topartists?user=${username}&limit=10`, {'timeout': 600000})
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
  }

  getTopAlbums () {
    let username = this.props.user.name

    return axios
      .get(`http://localhost:3000/api/user/topalbums?user=${username}&limit=10`, {'timeout': 600000})
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
  }

  getTopTracks () {
    let username = this.props.user.name

    return axios
      .get(`http://localhost:3000/api/user/toptracks?user=${username}&limit=10`, {'timeout': 600000})
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
          title: 'Title',
          isKey: true
        }, {
          id: 'plays',
          title: 'Plays',
          isKey: false
        }]

        this.setState({topTracks: data, topTracksColumns: columns})
      })
  }

  componentDidMount () {
    let username = this.props.user.name
    axios
      .get(`http://localhost:3000/api/user/getscrobbles?user=${username}&receiveData=false`, {'timeout': 600000})
      .then(data => {
        return axios
                .all([this.getPlaysByYear(), this.getPlaysLastYear(), this.getTopTracks()])
      })
      .then(() => {
        this.setState({loading: false})
      })
  }

  render () {
    if (this.state.loading) {
      return (
        <Container fluid style={this.style.divStyle}>
          <Row className='justify-content-sm-center'>
            <Col sm='6'>
              <h1 style={this.style.h1}>Loading (this may take a while...) </h1>
              <Loading />
            </Col>
          </Row>
        </Container>

      )
    }
    return (
      <Container fluid style={this.style.divStyle}>
        <Row className='justify-content-sm-center'>
          <Col sm='6'>
            <h1 style={this.style.h1}>Overview</h1>
          </Col>
        </Row>

        <Row>
          <Col sm='12' lg='6'>
            <LineGraphCard title='Plays by Year' data={this.state.playsByYear} />
          </Col>
          <Col sm='12' lg='6'>
            <LineGraphCard title='Last 12 Months' data={this.state.lastYear} />
          </Col>
        </Row>
      </Container>
    )
  }
}

module.exports = OverviewSection

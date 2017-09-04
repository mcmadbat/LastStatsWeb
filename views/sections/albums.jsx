import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from 'axios'
import Loading from 'react-loading-animation'
import AlbumCard from './../layouts/albumCard'
import RangeSelector from './../layouts/rangeSelector'

class AlbumsSection extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      margin: 'auto 50px'
    }

    let h1Style = {
      textAlign: `center`,
      margin: '10px',
      paddingTop: '50px'
    }

    this.style = {
      div: divStyle,
      h1: h1Style

    }

    this.state = {
      loading: true,
      activePill: '0'
    }

    this.gatherData = this.gatherData.bind(this)
    this.updateRange = this.updateRange.bind(this)
  }

  gatherData (username) {
    axios
      .all([this.getTopAlbums(null), this.getTopAlbums('year'), this.getTopAlbums('month')])
      .then(data => {
        // initially show global
        this.setState({loading: false, topAlbums: data[0], data})
      })
  }

  updateRange (pill) {
    this.setState({activePill: pill, topAlbums: this.state.data[pill]})
  }

  getTopAlbums (range) {
    let username = this.props.user.name
    let url = `http://localhost:3000/api/user/topalbums?user=${username}&limit=10`

    if (range) {
      url += `&range=${range}`
    }

    return axios
      .get(url, {'timeout': 600000})
      .then(res => {
        let data = Object
          .keys(res.data).map(x => {
            return {
              album: x,
              artist: res.data[x].artist,
              plays: res.data[x].plays
            }
          })
        return data
      })
  }

  componentDidMount () {
    if (this.props.loading) {
      this.setState({loading: true})
    } else {
      this.gatherData(this.props.user.name)
    }
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.loading && newProps.user) {
      this.gatherData(newProps.user.name)
    }
  }

  render () {
    if (this.state.loading) {
      return (
        <Container fluid style={this.style.divStyle}>
          <Row className='justify-content-sm-center'>
            <Col sm='6'>
              <h1 style={this.style.h1}>Top Albums</h1>
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
            <h1 style={this.style.h1}>Top Albums</h1>
          </Col>
        </Row>

        <RangeSelector activePill={this.state.activePill} updateRange={this.updateRange} />

        <Row>
          <Col lg='2' sm='12'>
            <AlbumCard data={this.state.topAlbums[0]} rank={1} />
          </Col>
          <Col lg='2' sm='12'>
            <AlbumCard data={this.state.topAlbums[1]} rank={2} />
          </Col>
          <Col lg='2' sm='12'>
            <AlbumCard data={this.state.topAlbums[2]} rank={3} />
          </Col>
          <Col lg='2' sm='12'>
            <AlbumCard data={this.state.topAlbums[3]} rank={4} />
          </Col>
          <Col lg='2' sm='12'>
            <AlbumCard data={this.state.topAlbums[4]} rank={5} />
          </Col>
          <Col lg='2' sm='12'>
            <AlbumCard data={this.state.topAlbums[5]} rank={6} />
          </Col>
        </Row>
      </Container>
    )
  }
}

module.exports = AlbumsSection

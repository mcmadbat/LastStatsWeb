import React from 'react'
import axios from 'axios'
import {Container, Row, Col} from 'reactstrap'
import TableCard from './../layouts/tableCard'
import Loading from 'react-loading-animation'

class TracksSection extends React.Component {
  constructor (props) {
    super(props)

    this.state = {loading: true}

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

    this.gatherData = this.gatherData.bind(this)
    this.getTopTracks = this.getTopTracks.bind(this)
  }

  gatherData (username) {
    axios
      .all([this.getTopTracks(username, null), this.getTopTracks(username, 'year'), this.getTopTracks(username, 'month')])
      .then(data => {
        this.setState({loading: false, topTracks: data})
      })
  }

  getTopTracks (username, range) {
    let url = `http://localhost:3000/api/user/toptracks?user=${username}&limit=10`
    if (range) {
      url += `&range=${range}`
    }

    return axios
            .get(url, {'timeout': 600000})
            .then(res => {
              let rank = 1
              let data = Object
                          .keys(res.data)
                          .map(x => {
                            let title = <div>{x} <small>by {res.data[x].artist}</small></div>
                            return {
                              rank: rank++,
                              title,
                              plays: res.data[x].plays
                            }
                          })
              return data
            })
  }

  componentDidMount () {
    let columns = [{
      id: 'rank',
      title: 'Rank',
      isKey: true
    }, {
      id: 'title',
      title: 'Title',
      isKey: false
    }, {
      id: 'plays',
      title: 'Plays',
      isKey: false
    }]

    this.setState({columns})

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
      return (<Container fluid style={this.style.divStyle}>
        <Row className='justify-content-sm-center'>
          <Col sm='12'>
            <h1 style={this.style.h1}>Top Tracks</h1>
          </Col>
        </Row>
        <Row className='justify-content-sm-center'>
          <Col sm='6'>
            <Loading />
          </Col>
        </Row>
      </Container>
      )
    }

    return (
      <Container fluid style={this.style.divStyle}>
        <Row className='justify-content-sm-center'>
          <Col sm='12'>
            <h1 style={this.style.h1}>Top Tracks</h1>
          </Col>
        </Row>
        <Row>
          <Col sm='12' lg='4'>
            <TableCard title='All Time' data={this.state.topTracks[0]} columns={this.state.columns} />
          </Col>
          <Col sm='12' lg='4'>
            <TableCard title='Last Year' data={this.state.topTracks[1]} columns={this.state.columns} />
          </Col>
          <Col sm='12' lg='4'>
            <TableCard title='Last Month' data={this.state.topTracks[2]} columns={this.state.columns} />
          </Col>
        </Row>

      </Container>
    )
  }
}

module.exports = TracksSection

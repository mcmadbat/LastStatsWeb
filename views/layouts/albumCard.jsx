import React from 'react'
import { Card, CardImg, CardTitle,
 CardSubtitle, CardBlock, Container, Row, Col } from 'reactstrap'

import Loading from 'react-loading-animation'
import axios from 'axios'

class AlbumCard extends React.Component {
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

    this.state = {loading: true, imgUrl: '', hasData: true}
  }

  componentDidMount () {
    if (!this.props.data) {
      this.setState({hasData: false})
      this.setState({loading: false})
      this.setState({imgUrl: 'https://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/latest?cb=20061003200043'})
      return
    }

    axios
      .get(`http://localhost:3000/api/user/getAlbumInfo?album=${this.props.data.album}&artist=${this.props.data.artist}`, {'timeout': 600000})
      .then(data => {
        let imgUrl = data.data.album.image[4]['#text']

        if (!imgUrl) {
          imgUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/500px-Disque_Vinyl.svg.png`
        }
        this.setState({loading: false})
        this.setState({imgUrl})
      })
      .catch(() => {
        this.setState({loading: false})
        this.setState({imgUrl: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/500px-Disque_Vinyl.svg.png`})
      })
  }

  render () {
    if (!this.state.hasData) {
      return (
        <Card>
          <CardImg width='75%' src={this.state.imgUrl} />
        </Card>
      )
    }
    if (this.state.loading) {
      return (
        <Container fluid style={this.style.divStyle}>
          <Row className='justify-content-sm-center'>
            <Col sm='6'>
              <Loading />
            </Col>
          </Row>
        </Container>
      )
    }

    return (
      <Card>
        <CardImg width='75%' src={this.state.imgUrl} />
        <CardBlock>
          <CardTitle>{this.props.rank}. {this.props.data.album} <br /><small>{this.props.data.artist}</small></CardTitle>
          <CardSubtitle>{parseInt(this.props.data.plays).toLocaleString()} plays</CardSubtitle>
        </CardBlock>
      </Card>
    )
  }
}

module.exports = AlbumCard

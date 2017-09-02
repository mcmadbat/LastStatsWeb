import React from 'react'
import { Card, CardImg, CardTitle,
 CardSubtitle, CardBlock } from 'reactstrap'

import Loading from 'react-loading-animation'
import axios from 'axios'

const VINYL_IMG_URL = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/500px-Disque_Vinyl.svg.png`
const WHITE_SQUARE_URL = 'https://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/latest?cb=20061003200043'

class ArtistCard extends React.Component {
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

    this.getCardImage = this.getCardImage.bind(this)

    this.state = {loading: true, imgUrl: '', hasData: true}
  }

  getCardImage (props) {
    this.setState({loading: true, hasData: true, imgUrl: WHITE_SQUARE_URL})

    if (!props.data) {
      this.setState({hasData: false})
      this.setState({loading: false})
      return
    }

    axios
      .get(`http://localhost:3000/api/user/getArtistInfo?artist=${props.data.artist}`, {'timeout': 600000})
      .then(data => {
        let imgUrl = data.data.artist.image[4]['#text']

        if (!imgUrl) {
          imgUrl = VINYL_IMG_URL
        }

        this.setState({loading: false})
        this.setState({imgUrl})
      })
      .catch(() => {
        this.setState({loading: false})
        this.setState({imgUrl: VINYL_IMG_URL})
      })
  }

  componentDidMount () {
    this.getCardImage(this.props)
  }

  componentWillReceiveProps (newProps) {
    this.getCardImage(newProps)
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
        <Card>
          <CardImg width='75%' src={this.state.imgUrl} />
          <CardBlock>
            <Loading />
          </CardBlock>
        </Card>
      )
    }

    return (
      <Card>
        <CardImg width='75%' src={this.state.imgUrl} />
        <CardBlock>
          <CardTitle>{this.props.rank}. {this.props.data.artist}</CardTitle>
          <CardSubtitle>{parseInt(this.props.data.plays).toLocaleString()} plays</CardSubtitle>
        </CardBlock>
      </Card>
    )
  }
}

module.exports = ArtistCard

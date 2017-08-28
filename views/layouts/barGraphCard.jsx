import React from 'react'
import {Line, defaults} from 'react-chartjs-2'

function createDataSet (dataArray) {
  return [{
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'red',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 5.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'red',
    pointBackgroundColor: 'red',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'white',
    pointHoverBorderColor: 'red',
    pointHoverBorderWidth: 2,
    pointRadius: 5,
    pointHitRadius: 10,
    data: dataArray
  }]
}

class BarGraphCard extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      margin: 'auto 0px',
      height: '100%',
      width: '100%',
      maxHeight: '500px',
      padding: '20px'
    }

    let barStyle = {
      data: { fill: '#c43a31' }
    }

    let h2Style = {
      textAlign: `center`,
      margin: '10px',
      color: 'red'
    }

    this.style = {
      barStyle,
      divStyle,
      h2Style
    }
    this.state = {}
  }

  render () {
    if (!this.props.data) {
      return (
        <div style={this.style.divStyle}>
          <h2 style={this.style.h2Style}>{this.props.title}</h2>
          <h2 style={this.style.h2Style}>Loading...</h2>
        </div>
      )
    }

    // prepare data by merging
    let data = {
      labels: Object.keys(this.props.data),
      datasets: createDataSet(Object.values(this.props.data))
    }

    data = Object.assign(data, defaults)

    // removes the legend
    data.global.legend.display = false

    // default color
    data.global.defaultFontColor = 'red'

    // force y axis to start at zero
    data.scale.ticks.beginAtZero = true

    return (
      <div style={this.style.divStyle}>
        <h2 style={this.style.h2Style}>{this.props.title}</h2>
        <Line
          data={data}
        />
      </div>
    )
  }
}

module.exports = BarGraphCard

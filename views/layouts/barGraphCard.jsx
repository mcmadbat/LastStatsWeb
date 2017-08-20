import React from 'react'
import { VictoryTheme, VictoryBar, VictoryChart, VictoryAxis } from 'victory'

class BarGraphCard extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      margin: 'auto 0px',
      height: '100%',
      width: '100%',
      maxHeight: '500px'

    }

    let barStyle = {
      data: { fill: '#c43a31' }
    }

    let h2Style = {
      textAlign: `center`,
      margin: '10px'
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
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div style={this.style.divStyle}>
        <h2 style={this.style.h2Style}>{this.props.title}</h2>
        <VictoryChart animate={{duration: 500}} domainPadding={20}>
          <VictoryAxis
            tickFormat={x => {
              if (!isNaN(x)) {
                return parseInt(x)
              } else {
                return x
              }
            }}
          />

          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => x}
          />

          <VictoryBar style={{ data: { fill: 'red' } }}
            data={this.props.data}
            x={this.props.x}
            y={this.props.y}
            theme={VictoryTheme.material} />
        </VictoryChart>

      </div>
    )
  }
}

module.exports = BarGraphCard

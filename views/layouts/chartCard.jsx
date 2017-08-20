import React from 'react'
import { VictoryTheme, VictoryBar, VictoryChart } from 'victory'

class ChartCard extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      margin: 'auto 0px',
      height: '100%',
      width: '100%'
    }

    let barStyle = {
      data: { fill: '#c43a31' }
    }

    this.style = {
      barStyle,
      divStyle
    }
  }

  render () {
    const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
    ]
    return (
      <div style={this.style.divStyle}>
        <h1>Chart Title</h1>
        <VictoryChart domainPadding={20}>
          <VictoryBar style={{ data: { fill: 'red' } }}
            data={data}
            x='quarter'
            y='earnings'
            theme={VictoryTheme.material} />
        </VictoryChart>

      </div>
    )
  }
}

module.exports = ChartCard

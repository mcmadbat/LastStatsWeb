import React from 'react'

class TableCard extends React.Component {
  constructor (props) {
    super(props)

    let divStyle = {
      margin: 'auto 0px',
      height: '100%',
      width: '100%',
      padding: '20px'
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
    if (!this.props.data || !this.props.columns) {
      return (
        <div style={this.style.divStyle}>
          <h2 style={this.style.h2Style}>{this.props.title}</h2>
          <h2>Loading...</h2>
        </div>
      )
    }

    let columns = []
    let rowData = []

    this.props.columns.forEach(column => {
      columns.push(<th key={column.id}>{column.title}</th>)
    })

    let index = 0
    let innerIndex = 0
    this.props.data.forEach(entry => {
      let tds = Object.values(entry).map(x => <td key={innerIndex++}>{x}</td>)
      rowData.push(<tr key={`row${index++}`}>{tds}</tr>)
    })

    return (
      <div style={this.style.divStyle}>
        <h2 style={this.style.h2Style}>{this.props.title}</h2>
        <table className='table'>
          <thead>
            <tr>
              {columns}
            </tr>
          </thead>
          <tbody>
            {rowData}
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = TableCard

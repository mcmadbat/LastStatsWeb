import React from 'react'
import Overview from './sections/overview'
import Header from './layouts/header'
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import classnames from 'classnames'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.navItemStyle = {
      // make sure this is right percentage!
      width: '50%'
    }

    this.state = {
      activeTab: '1'
    }
  }

  toggle (tab) {
    this.setState({activeTab: tab})
  }

  render () {
    if (!this.props.user) {
      return <h1>loading</h1>
    }

    return (
      <div style={{margin: `0`}}>
        <Header user={this.props.user} />
        <Nav tabs className={'mx-auto'} style={{textAlign: 'center', width: '500px'}}>
          <NavItem style={this.navItemStyle}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1') }}
              href='#'
              >
              Overview
            </NavLink>
          </NavItem>
          <NavItem style={this.navItemStyle}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2') }}
              href='#'
              >
              Artists
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <Overview user={this.props.user} />
          </TabPane>
          <TabPane tabId='2' />
        </TabContent>
      </div>
    )
  };
};

module.exports = App

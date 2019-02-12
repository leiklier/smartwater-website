import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'
const { Content } = Layout

import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'

class Main extends Component {
  render() {
    return(
      <Content style={{ padding: '0 50px'}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Content>
    );
  }
}

export default Main

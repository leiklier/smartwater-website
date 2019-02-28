import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'
const { Content } = Layout

import Home from '../../routes/Home'
import About from '../../routes/About'
import Dashboard from '../../routes/Dashboard'

class Main extends Component {
	render() {
		return (
			<Content style={{ padding: 0, height: '100%' }}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/dashboard" component={Dashboard} />
				</Switch>
			</Content>
		)
	}
}

export default Main

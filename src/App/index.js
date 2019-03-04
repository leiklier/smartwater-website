import React, { Component } from 'react'
import './style.less'

import { Layout } from 'antd'

import Navigationbar from './Navigationbar'
import Main from './Main'

import { connect } from 'react-redux'
import { fetchAndConfigureStore } from '../redux/actions'

@connect(
	null,
	(dispatch, ownProps) => {
		return {
			configureStore: () => dispatch(fetchAndConfigureStore())
		}
	}
)
class App extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.configureStore()
	}

	render() {
		return (
			<div className="App" style={{ height: '100%' }}>
				<Layout style={{ height: '100%' }}>
					<Navigationbar />
					<Main />
				</Layout>
			</div>
		)
	}
}

export default App

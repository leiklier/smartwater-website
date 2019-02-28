import React, { Component } from 'react'
import './style.css'

import { Layout } from 'antd'

import Navigationbar from './Navigationbar'
import Main from './Main'

class App extends Component {
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

import React, { Component } from 'react'
import './App.css'

import { Layout } from 'antd'

import Navigationbar from './components/Navigationbar'
import Main from './Main.js'

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

import React, { Component } from 'react'
import './App.css'

import { Layout } from 'antd'

import Navigationbar from './components/Navigationbar'
import Main from './Main.js'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Layout>
					<Navigationbar />
					<Main />
				</Layout>
			</div>
		)
	}
}

export default App

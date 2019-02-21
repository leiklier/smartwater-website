import React, { Component } from 'react'
import { Modal } from 'antd'

import queryString from 'query-string'

import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, type, site } = ownProps
		return {
			handleClose: () =>
				dispatch(
					goBack({
						search: queryString.stringify({
							nodeId,
							type,
							site
						})
					})
				)
		}
	}
)
class Graphview extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { nodeId, type, site, node, measurement, handleClose } = this.props
		return (
			<Modal
				visible={true}
				title={`${node.name} - ${type}`}
				footer={null}
				onCancel={handleClose}
			>
				hello world
			</Modal>
		)
	}
}

export default Graphview

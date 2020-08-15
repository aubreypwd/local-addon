import React, { Component } from 'react';

const mysql = require('mysql');

export default class CurrentActiveTheme extends Component {
	constructor (props) {
		super(props);

		this.state = {
			theme: 'Unknown',
		};
	}

	getActiveTheme () {
		if (typeof this.props.site.multisite !== 'undefined') {
			return;
		}

		const connection = mysql.createConnection({
			host: '127.0.0.1',
			user: this.props.site.mysql.user,
			password: this.props.site.mysql.password,
			database: 'local',
			socketPath: `/${this.props.context.environment.userHome}/Library/Application Support/Local/run/${this.props.site.id}/mysql/mysqld.sock`,
		});

		connection.connect();

		connection.query("SELECT option_value FROM wp_options WHERE option_name = 'stylesheet'", (error, results, fields) => {
			this.setState(function (state, props) {
				return {
					theme: results[0].option_value ?? this.state.theme,
				};
			});
		});

		connection.end();
	}

	componentDidMount () {
		this.getActiveTheme();
	}

	componentWillUnmount () {
		// We don't need to do anything when the component is not showing.
	}

	render () {
		return (
			<li class="TableListRow_VfExz_v14-0-1 TableListRow">
				<strong>Active Theme</strong>
				<div>{this.state.theme}</div>
			</li>
		);
	}

}

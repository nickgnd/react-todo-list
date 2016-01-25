import React from 'react';
import Rebase from 're-base';

const rootUrl = 'https://luminous-inferno-4335.firebaseio.com/';
const base = Rebase.createClass(rootUrl + 'todo-list/');

export default class ListItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			text: this.props.item.text,
			done: this.props.item.done
		}

		this.handleDoneChange=this.handleDoneChange.bind(this);
		this.handleDeleteClick=this.handleDeleteClick.bind(this);
	}

	// componentDidMount(){
	// 	this.ref = base.syncState(`todo-list/todos/${this.props.item.key}`, {
	// 		context: this,
	// 		state: 'item',
	// 		asArray: false
	// 	});
	// }

	handleDoneChange(event) {
		var update = {
			done: event.target.checked,
			text: this.state.text
		}
		// set locally
		this.setState(update);
		// send to DB
		base.post(`todos/${this.props.item.key}`, {
			data: update
		});
	}

	handleDeleteClick(event) {
		base.post(`todos/${this.props.item.key}`, {
			data: null
		});
	}

	render() {
		return <div className="input-group">
			<span className="input-group-addon">
				<input
					type="checkbox"
					checked={this.state.done}
					onChange={this.handleDoneChange}
					/>
			</span>
			<input type="text"
				className="form-control"
				value={this.state.text} />
			<span className="input-group-btn">
				<button
					className="btn btn-default"
					onClick={this.handleDeleteClick}
					>
					Delete
				</button>
			</span>
		</div>
	}
}

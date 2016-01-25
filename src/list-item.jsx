import React from 'react';
import Rebase from 're-base';

const rootUrl = 'https://luminous-inferno-4335.firebaseio.com/';
const base = Rebase.createClass(rootUrl + 'todo-list/');

export default class ListItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			text: this.props.item.text,
			done: this.props.item.done,
			textChanged: false
		}

		this.handleDoneChange=this.handleDoneChange.bind(this);
		this.handleDeleteClick=this.handleDeleteClick.bind(this);
		this.handleTextChange=this.handleTextChange.bind(this);
		this.handleUndoClick=this.handleUndoClick.bind(this);
		this.handleSaveClick=this.handleSaveClick.bind(this);
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

	handleTextChange(event) {
		var update = {
			text: event.target.value,
			textChanged: true
		}
		// set locally
		this.setState(update);

	}

	// helper function
	changesButton() {
		if(!this.state.textChanged) {
			return null;
		} else {
			return [
				<button
					onClick={this.handleSaveClick}
					className="btn btn-default"
					>
					Save
				</button>,
				<button
					onClick={this.handleUndoClick}
					className="btn btn-default"
					>
					Undo
				</button>
			]
		}
	}

	handleSaveClick() {
		var update = {
			done: this.state.done,
			text: this.state.text
		}
		// update state
		this.setState({textChanged: false});
		// send to DB
		base.post(`todos/${this.props.item.key}`, {
			data: update
		});
	}

	handleUndoClick() {
		this.setState({
			text: this.props.item.text,
			textChanged: false
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
				disabled={this.state.done}
				className="form-control"
				value={this.state.text}
				onChange={this.handleTextChange}
				/>
			<span className="input-group-btn">
			{ this.changesButton() }
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

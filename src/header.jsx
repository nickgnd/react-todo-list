import React from 'react';
// import ReactDOM from 'react-dom';

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		// Operations usually carried out in componentWillMount go here
		// https://www.firebase.com/docs/web/libraries/react/api.html
		// ...
		this.state = {
			text: ''
		}

		// bind method
		this.handleClick = this.handleClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	render() {
		return <div className="input-group">
			<input
				value={this.state.text}
				onChange={this.handleInputChange}
				type="text"
				className="form-control" />
			<span className="input-group-btn">
				<button
					onClick={this.handleClick}
					className="btn btn-default"
					type="button">
					Add
				</button>
			</span>
		</div>
	}

	handleClick() {
		// send value to firebase
		var obj = {
			text: this.state.text,
			done: false
		}

		this.props.add(obj);

		// reset
		this.state = {
			text: ''
		}
	}

	handleInputChange(event) {
		this.setState({ text: event.target.value });
	}

}

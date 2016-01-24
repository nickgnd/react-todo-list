import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		// Operations usually carried out in componentWillMount go here
		// https://www.firebase.com/docs/web/libraries/react/api.html
		// ...
	}

	render() {
		return <div className="input-group">
			<input type="text" className="form-control" />
			<span className="input-group-btn">
				<button className="btn btn-default">
					Add
				</button>
			</span>
		</div>
	}

}

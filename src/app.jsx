import './style.scss'

import React from 'react';
import ReactDOM from 'react-dom';
// import ReactFire from 'reactfire';
// import Firebase from 'firebase';
// instead of ReactFire Use Rebase to avoid mixins (depracated in ES6)
import Rebase from 're-base';
import Header from './header.jsx';

const rootUrl = 'https://luminous-inferno-4335.firebaseio.com/';
var base = Rebase.createClass(rootUrl + 'items/'); // singleton fo db

export default class App extends React.Component {

	constructor(props) {
		super(props);
		// Operations usually carried out in componentWillMount go here
		// https://www.firebase.com/docs/web/libraries/react/api.html
		// ...
	}

	componentDidMount(){
			base.syncState(`todos`, {
				context: this,
				state: 'items',
				asArray: true
			});
		}

	render() {
		console.log(this.state);
		return <div className="row panel panel-default">
			<div className="col-md-8 col-md-offset2">
				<h2 className="text-center">
					To-Do-List
				</h2>
				<Header />
			</div>
		</div>
	}
};

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));

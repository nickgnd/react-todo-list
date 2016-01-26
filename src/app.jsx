import './style.scss'

import React from 'react';
import ReactDOM from 'react-dom';
// import ReactFire from 'reactfire';
// import Firebase from 'firebase';
// instead of ReactFire Use Rebase to avoid mixins (depracated in ES6)
import Rebase from 're-base';
import List from './list.jsx';
import Header from './header.jsx';

import _ from 'underscore';

const rootUrl = 'https://luminous-inferno-4335.firebaseio.com/';
const base = Rebase.createClass(rootUrl + 'todo-list/');

export default class App extends React.Component {

	constructor(props) {
		super(props);
		// Operations usually carried out in componentWillMount go here
		// https://www.firebase.com/docs/web/libraries/react/api.html
		// ...
		this.state = {
			list: [],
			loaded: false
		}

		this.handleAddItem = this.handleAddItem.bind(this);
		this.deleteButton = this.deleteButton.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	componentDidMount(){
			this.ref = base.syncState('todos', {
				context: this,
				state: 'list',
				asArray: true,
				then(){
					this.setState({loaded: true})
				}
			});
		}

	handleAddItem(newItem){
		this.setState({
		  list: this.state.list.concat([newItem])
		});
	}

	deleteButton() {
		if(!this.state.loaded) {
			return null;
		} else {
			return <div className="text-center clear-complete">
				<hr />
				<button
					type="button"
					onClick={this.onDeleteClick}
					className="btn btn-default" >
					Clear Complete
				</button>
			</div>
		}
	}

	// DOESN'T WORK WELL
	// delete update key value of array and lost sync with Firebase
	// key value is added automatically by `asArray: true` in .syncState method
	// https://github.com/tylermcginnis/re-base/issues/72
	onDeleteClick() {
		var newList = _.reject(this.state.list, function(item) {
			return item.done === true;
		});
		this.setState({
			list: newList
		});
	}

	render() {
		console.log(this.state.loaded);
		return <div className="row panel panel-default">
			<div className="col-md-8 col-md-offset2">
				<h2 className="text-center">
					To-Do-List
				</h2>
				<hr />
				<Header add={this.handleAddItem} list={this.state.list}/>
				<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
					<List items={this.state.list}/>
					{this.deleteButton()}
				</div>
			</div>
		</div>
	}
};

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));

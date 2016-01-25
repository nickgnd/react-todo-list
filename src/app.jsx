import './style.scss'

import React from 'react';
import ReactDOM from 'react-dom';
// import ReactFire from 'reactfire';
// import Firebase from 'firebase';
// instead of ReactFire Use Rebase to avoid mixins (depracated in ES6)
import Rebase from 're-base';
import List from './list.jsx';
import Header from './header.jsx';

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

	render() {
		console.log(this.state.loaded);
		return <div className="row panel panel-default">
			<div className="col-md-8 col-md-offset2">
				<h2 className="text-center">
					To-Do-List
				</h2>
				<hr />
				<Header add={this.handleAddItem}/>
				<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
					<List items={this.state.list}/>
				</div>
			</div>
		</div>
	}
};

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));

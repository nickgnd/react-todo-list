import React from 'react';
import ListItem from './list-item.jsx';

export default class List extends React.Component {
	constructor(props) {
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	render() {

		return <div>
			{this.renderList()}
			</div>
	}

	renderList() {
		if(this.props.items && Object.keys(this.props.items).length === 0) {
			return <h4>
				Add a TODO to get started
			</h4>
		} else {
			var itemList = [];

			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = key; // to keep key props
				itemList.push(
					<ListItem
						item={item}
						key={key}
					>
					</ListItem>
				)
			}
			return itemList;
		}
	}
}


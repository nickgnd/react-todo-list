import React from 'react';

export default class List extends React.Component {
	constructor(props) {
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	render() {

		return <ul>
			{this.renderList()}
			</ul>
	}

	renderList() {
		if(this.props.items && Object.keys(this.props.items).length === 0) {
			return <h4>
				Add a TODO to get started
			</h4>
		} else {
			var itemList = [];

			this.props.items.map( (item) => {
				itemList.push(
					<li>
						{item.text}
					</li>
				)
			});
			return itemList;
		}
	}
}

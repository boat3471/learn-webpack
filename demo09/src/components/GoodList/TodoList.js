import React,{Component} from 'react';
import Todo from './Todo';
import {ListView} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class TodoList extends Component{
	constructor(props){
		super(props);
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});
	}

	componentDidMount() {
		this.manuallyRefresh = true;
	}

	render(){
		let {list} = this.props;
		let dataSource = this.dataSource.cloneWithRows(list);
		const row = (rowData, sectionID, rowID)=>{
			return(
				<Todo
					{...this.props}
					key={rowData.listId}
					index={Number(rowID)}
				    data={rowData}
				/>
			)
		}
		return(
			<div className="good-warp">
				<ListView
					dataSource={dataSource}
					renderRow={row}
					initialListSize={20}
					pageSize={10}
					onEndReachedThreshold = {100}
					onEndReached={this.onEndReached}
					style={{height: '100%'}}
				/>
			</div>
		)
	}
}
TodoList.propTypes = {
	AAS : PropTypes.func.isRequired,
	inputChange : PropTypes.func.isRequired,
	list : PropTypes.array.isRequired
}
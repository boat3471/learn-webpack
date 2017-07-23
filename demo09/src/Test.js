import React,{Component} from 'react';


export default class Test extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return <div dangerouslySetInnerHTML={{__html : 'sadas'}}></div>
	}
}


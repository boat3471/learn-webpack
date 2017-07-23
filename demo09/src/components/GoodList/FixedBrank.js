import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Brank from './Brank';
export default class FixedBrank extends Component{
	componentDidMount() {
		this.$dom.parentNode.style.position = 'absolute';
		this.$dom.parentNode.style.top = '50px';
		this.$dom.parentNode.style.width = '100%';
	}
	render(){
		let {downFn,list,NavId,changeNavIdFn} = this.props;
		return(
			<div className="fixed-brank" ref={dom=>this.$dom = dom}>
				<Brank downFn={downFn}>
					<p className="text">请选择品牌</p>
				</Brank>
				<div className="brank-container">
					<div className="brank-title">
						<span className="line"></span>
						<span className="flex-1">品牌</span>
						<span className="line"></span>
					</div>
					<div className="brank-box">
						{list.map(({id,label},index)=><span onTouchTap={e=>{changeNavIdFn(e,id,'up')}} key={id} className={`${NavId === id ? 'active' : ''}`}>{label}</span>)}
					</div>
				</div>
			</div>
		)
	}
}
FixedBrank.propTypes = {
	downFn : PropTypes.func.isRequired,
	changeNavIdFn : PropTypes.func.isRequired,
	list : PropTypes.array.isRequired,
	NavId : PropTypes.string.isRequired,
}
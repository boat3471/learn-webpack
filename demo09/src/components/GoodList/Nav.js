import React,{Component} from 'react';
import Brank from './Brank';
import PropTypes from 'prop-types';
export default class Nav extends Component{
	render(){
		let {navList,NavId,changeNavIdFn,downFn} = this.props;
		let w = navList.length * 60
		return(
			<Brank downFn={downFn}>
				<ul className="brand-list" style={{width : w + 'px'}}>
					{navList.map(({id,label})=>{
						let idCurrnet = id === NavId;
						return (
							<li onTouchTap={e=>{changeNavIdFn(e,id)}}
							    className={`${idCurrnet ? 'active' : ''}`}
							    key={id}>
								{label}
							</li>
						)
					})}
				</ul>
			</Brank>
		)
	}
}
//严格来说 这些外部传入的属性都是要被校验的
Nav.propTypes = {
	NavId : PropTypes.string.isRequired,
	navList : PropTypes.array.isRequired,
	downFn : PropTypes.func.isRequired
}
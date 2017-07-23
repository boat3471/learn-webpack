import React,{Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import currentTime from '@public/SystemTime';
import moment from 'moment';

let fillZero = n => (n > 10 ?  String(n) : '0' + n);

export default class Notice extends Component{
	constructor(props){
		super(props);
		this.state = {
			d : [],
			h : [],
			m : [],
			s : []
		}
		this.timer = null;
		this.startTime = 0;
	}
	runTime(){
		let curTime = currentTime();
		let {startTime} = this;
		let timeDiff = (startTime - curTime)/1000;
		if(timeDiff<0){
			clearInterval(this.timer);
			return;
		}
		let d  = fillZero(Math.floor(timeDiff/24/60/60)).split('');
		
		let h  = fillZero(parseInt(timeDiff/60/60%24)).split('')
		let m = fillZero(parseInt(timeDiff/60%60)).split('')
		let s = fillZero(parseInt(timeDiff%60)).split('')
		this.setState({d,h,m,s})
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	componentWillReceiveProps(nextProps) {
		if(!this.timer){
			let {activityDTO} = nextProps;
			if(_.isEmpty(activityDTO))return;
			let nowTime = currentTime();
			let {purchaseStartTime} = activityDTO;
			this.startTime = purchaseStartTime.time;
			log('moment(startTime).format',moment(this.startTime).format('YYYYMMDD'))
			if(this.startTime > nowTime){
				this.timer = setInterval(()=>{
					this.runTime();
				},1000)
			}
		}
	}
	render(){
		let {activityDTO} = this.props;
		if(_.isEmpty(activityDTO))return false;
		let {d,h,m,s} = this.state;
		return(
			<div className="yr-box-notice">
				<div className="notice-box">
					<p className="p1">距离订货会开始还剩</p>
					<div className="time-box">
						<span className="rect-num">{d[0] || 0}</span>
						<span className="rect-num">{d[1] || 0}</span>
						<span className="text">天</span>
						<span className="rect-num">{h[0] || 0}</span>
						<span className="rect-num">{h[1] || 0}</span>
						<span className="text">时</span>
						<span className="rect-num">{m[0] || 0}</span>
						<span className="rect-num">{m[1] || 0}</span>
						<span className="text">分</span>
					</div>
				</div>
				<div className="rect">
					<p className="text" dangerouslySetInnerHTML={{__html : activityDTO.memo}}></p>
					<div className="open-more-box">
						<div className="open-more">展开更多 <span className="triangle"></span></div>
					</div>
				</div>
			</div>
		)
	}
}


Notice.propTypes = {
	activityDTO : PropTypes.object.isRequired
}
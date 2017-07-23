import jsonp from '@/jsonp';
let _timeDifference = 0;
const url = `//pub.ule.com/clock/datetime`;
const curtime = ()=> ((new Date()).getTime());

jsonp({
	url,
	data : {type : '2'},
	jsonpCallback : 'callback'
}).then(res=>{
	log('这是服务器返回的时间：',res)
	let {time} = res;
	_timeDifference = time - curtime();
})

export default function currentTime(data) {
	return (data && data instanceof Date) ? data.getTime() : _timeDifference + curtime();
}
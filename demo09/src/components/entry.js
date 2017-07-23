import jsonp from '../jsonp';
import {ENTRY_URL} from '@url';
jsonp({
	url : ENTRY_URL,
	data : {zoneId : zoneId}
}).then(res=>{
	log('这是刚进入页面返回的参数：',res);
	let {returnCode,data} = res;
	if(returnCode === '0000'){
		if(__TEST__)return;
		let {jump} = data;
		location.replace(`#/${jump == 0 ? 'home' :'goodlist'}`);
	}
})


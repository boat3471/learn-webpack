import fetchJsonp from 'fetch-jsonp';
import {Toast} from 'antd-mobile';
import SetGet from '@public/SetGet';
let loadingTimer=null;
let clearTimer=null;
const clearLoading = ()=>{
	clearTimeout(loadingTimer);
	Toast.hide();
}
const clearClearLoading = ()=>{clearTimeout(clearTimer);}
const createParame = (obj = {})=>{
	let arr = [];
	for( let i in obj ){
		let [key,value] = [i,obj[i]];
		arr.push(`${key}=${value}`);
	}
	return arr.length ? `?${arr.join('&')}` : '';
}
export default function jsonp({url,data = {},timeout = 1000*60,jsonpCallback='jsoncallback'}) {
	let {isLoad} = SetGet;
	clearLoading();
	clearClearLoading();
	loadingTimer = setTimeout(()=>{
		if(isLoad)Toast.loading('加载中...', 0)
	},500)
	clearTimer = setTimeout(()=>{
		clearLoading();
	},4000)
	return fetchJsonp(`${url}${createParame(data)}`, {
		jsonpCallback : jsonpCallback,
		timeout,
	}).then(response=> {
		clearLoading();
		clearClearLoading();
		return response.json()
	}).catch(res=>{
		log(res);
		clearLoading();
		clearClearLoading();
		return res;
	})
}
import {getCookie} from './cookie';

if (typeof Object.assign != 'function') {
	Object.assign = function(target) {
		'use strict';
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}
let log;
if(__DEV__){
	log =(...agus)=>{
		console.log(...agus);
	}
}else{
	log =()=>{}
}
let zoneId = getCookie('zoneId');
setTimeout(()=>{
	log('zoneId',zoneId)
},4000)
let uleServer = __PRD__ ? 'ule.com' : 'beta.ule.com';
Object.assign(window,{
	log,
	uleServer,
	zoneId : zoneId || 934,
	cartType : 20
})

Object.assign(String.prototype,{
	substitute(a){
		return a&&"object"==typeof a?this.replace(/\{([^{}]+)\}/g,function(b,c){var d=a[c];return void 0!==d?""+d:""}):this.toString()
	},
	addDot(){
		return this.replace(/(?=(?:\d{3})+(?!\d))/g,',').replace(/^,/,'')
	}
})
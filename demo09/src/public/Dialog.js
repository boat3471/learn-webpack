import React,{Component} from 'react';
import { Popup,Toast} from 'antd-mobile';
import {isIPhone} from '@/core/ShellApi';
let maskProps;
if (isIPhone) {
	// Note: the popup content will not scroll.
	maskProps = {
		onTouchStart: e => e.preventDefault(),
	};
}

const _hide = ()=>{Popup.hide()}
const _customPop = opt =>{
	let animationType = opt.animationType || 'slide-up';
	Popup.show(opt.html,{animationType, maskProps,maskClosable : maskProps ? true : false});
}

export const Info = mag =>{Toast.info(mag)}
export const customPop = _customPop;


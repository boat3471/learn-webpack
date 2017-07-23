import {combineReducers} from 'redux';
import {SET_BRAND_ID,CONCAT_GOODS,CLEAR_GOODS,REPLACE_GOODS,CHANGE_COUNT_GOODS,RECOVERED_GOODS} from '@types';
//品牌ID
const navId = (state = '',action)=>{
	switch(action.type){
		case SET_BRAND_ID :
			return action.payload.ID;
		default:
			return state;
	}
}
//商品列表
const list = (state = [],action)=>{
	switch(action.type){
		case CONCAT_GOODS :
			return [state,...action.payload.list]
		case CLEAR_GOODS :
			return []
		case REPLACE_GOODS :
			return [...action.payload.list]
		case CHANGE_COUNT_GOODS :
			return state.map((item,index)=>{
				let {suoyin,byCartCount} = action.payload;
				return suoyin === index ? {...item,byCartCount} : item;
			})
		default:
			return state;
	}
}

const reCombineReducers = (reducers) => {
	let fn = combineReducers(reducers);
	return (state,action) => {
		switch(action.type){
			case RECOVERED_GOODS :
				return action.payload.list
			default :
				return fn(state,action)
		}
	}
}

export const goods = reCombineReducers({navId,list})

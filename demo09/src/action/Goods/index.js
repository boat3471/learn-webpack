import {CONCAT_GOODS,SET_BRAND_ID,REPLACE_GOODS,CHANGE_COUNT_GOODS,RECOVERED_GOODS} from '@types';
import goodsCache from '@view/GoodList/goodsCache';
import jsonp from '@/jsonp';
import {GOODSPAGE_SHOP_LIST_URL} from '@url';
let {getBrandMap} = goodsCache;
//品牌导航ID
export const SetNavId = (ID)=>{
	return {
		type : SET_BRAND_ID,
		payload : {ID}
	}
}

//添加商品
export const AddGoods = (list)=>{
	return {
		type : CONCAT_GOODS,
		payload : {list}
	}
}

//替换商品
export const ReplaceGoods = (list)=>{
	return {
		type : REPLACE_GOODS,
		payload : {list}
	}
}
//恢复搜索之间的记录
export const RecoveredGoods = (list)=>{
	return {
		type : RECOVERED_GOODS,
		payload : {list}
	}
}
export const ChangeItemCount = (suoyin,byCartCount)=>{
	return {
		type : CHANGE_COUNT_GOODS,
		payload : {
			suoyin,
			byCartCount
		}
	}
}

//添加商品 异步
export const AddGoodList = ({url = GOODSPAGE_SHOP_LIST_URL,data = {},callback} = {}) => {
	return (dispatch,getState,agu3)=>{
		let state = getState();
		let brandId = state.goods.navId;
		let list = getBrandMap(brandId);
		if(list && !callback){
			dispatch(ReplaceGoods(list))
		}else{
			return jsonp({url,
				data : {...{keywords : '',brandId,zoneId : zoneId},...data}
			}).then(res=>{
				log('这是商品列表返回的数据:',res)
				let {returnCode,returnMessage,data} = res;
				if(returnCode === '0000'){
					callback && callback(data);
					dispatch(ReplaceGoods(data))
					if(callback)return;
					let {addBrandMap} = goodsCache;
					addBrandMap(brandId,data);
				}else{
				
				}
			});
		}
	}
}

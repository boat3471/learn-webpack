/*
* 储存购物车购买数量记录 和商品品牌对应的商品缓存
* */


let _bycartMap = {};//购物车
let _brandMap = {};//品牌对应商品的
let _moreGgMap = {};//多规格商品

let customAllBrandId = '_uleDhuZdyId_';
const getByCartList = id =>_bycartMap[id];
const addByCar = (count,listId,itemId,data)=>{
	let {packageprice,snapPrice} = data;
	packageprice = packageprice || snapPrice;
	_bycartMap[listId] = {
		ToTalCount : count,
		packagePrice : parseFloat(packageprice),
		counts : {
			[itemId] : count
		},
		listId,
		items : {
			[itemId] : {...data,byCartCount : count}
		}
	};
}
const getSingleListTotalCount = (id)=>{
	return getByCartList(id).ToTalCount;
}

const geiUnit = ({boxSell,sellUnitSingle,sellUnit})=>{
	let isPackage = boxSell === 1;
	return {
		unit : isPackage ? `${sellUnitSingle}/${sellUnit}` : sellUnitSingle,
		slignUnit : isPackage ? sellUnit : sellUnitSingle
	}
}
const clearByCartMap = ()=>{
	for(let i in _bycartMap){
		let obj = _bycartMap[i];
		let {counts,items} = obj;
		let total = 0;
		for( let j in counts){
			let count = parseFloat(counts[j]);
			if(count == 0){
				delete counts[j];
				delete items[j];
			}
			total += count;
		}
		if(total === 0){
			delete _bycartMap[i];
		}
	}
}

export default {
	get bycartMap(){
		return _bycartMap;
	},
	get brandMap(){
		return _brandMap
	},
	geiUnit,
	addBrandMap(id,list){
		id = id || customAllBrandId;
		_brandMap[id] = list;
	},
	getBrandMap(id){
		id = id || customAllBrandId;
		return _brandMap[id];
	},
	//清楚购物车为0的数据
	clearByCartMap,
	//添加购物车
	addByCar,
	//获取商品 返回是一个list商品 不是规格商品
	getByCartList,
	//改变购物车数量
	changeByCarCount(count,listId,itemId,data){
		var list = getByCartList(listId);
		if(list){
			let {counts,items} = list;
			counts[itemId] = count;
			items[itemId] = {...data,...items[itemId],byCartCount : count};
			let Total = 0;
			for( let i in counts){
				Total += parseFloat(counts[i]) || 0;
			}
			list.ToTalCount = Total;
		}else{
			addByCar.apply(null,arguments);
		}
	},
	filterGoodList(list){
		return list.map(item=>{
			let {listId} = item;
			let list = getByCartList(listId);
			let byCartCount = list ? list.ToTalCount : 0;
			return {...item,byCartCount}
		})
	},
	getParames(){
		clearByCartMap();
		let arr = [];
		for( let i in _bycartMap ){
			let item = _bycartMap[i];
			let {counts} = item;
			for( let j in counts ){
				arr.push(`${i}|${j}|${counts[j]}`);
			}
		}
		return arr.length ? arr.join(',') : '';
	},
	//获取对应商品的规格
	getSlignGg(id){
		return _moreGgMap[id];
	},
	//添加商品对应的规格
	setMoreGg(id,data){
		_moreGgMap[id] = data;
	},
	//过滤购物车
	filTerCartList(){
		let list = [];
		for(var i in _bycartMap){
			let item = _bycartMap[i];
			let {items} = item;
			for(var j in items){
				list.push(items[j])
			}
		}
		return list;
	},
	getTotalCountAndMoney(){
		let totalCount=0,totalMoney = 0;
		for(var i in _bycartMap){
			let {packagePrice,ToTalCount} = _bycartMap[i];
			totalCount += parseFloat(ToTalCount);
			totalMoney += parseFloat(ToTalCount) * parseFloat(packagePrice)
		}
		return {totalCount,totalMoney}
	}
}
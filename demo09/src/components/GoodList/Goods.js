import React,{Component} from 'react';
import Head from '@view/Head/Head';
import Footer from './Footer';
import TodoList from './TodoList';
import Nav from './Nav';
import FixedBrank from './FixedBrank';
import ShippingOrder from './ShippingOrder';
import FixedGg from './FixedGg';
import SearchStatusBox from './SearchStatusBox';
import jsonp from '@/jsonp';
import {Popup} from 'antd-mobile';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GoodActions from '@goodsAction';
import './scss/goods.scss';
import {GOODSPAGE_SHOP_LIST_URL,GOODSPAGE_BRAND_URL,
	GOODSPAGE_UPDATA_CARD_URL,GOODSPAGE_SEARCH_CARD_URL,
	GOODSPAGE_MORE_GG_URL
} from '@url';
import {customPop,Info} from '@public/Dialog';
import goodsCache from './goodsCache';
import PropTypes from 'prop-types';
import {writeStroage,getStroage} from '@public/localStorage';
import {goHome} from '@/core/ShellApi';
import _ from 'lodash';
let {addByCar,changeByCarCount,filterGoodList,getByCartList,clearByCartMap,
	getSlignGg,setMoreGg,filTerCartList,getParames,getTotalCountAndMoney} = goodsCache;
let _activityId;
let SEARCHHISTORYSGORAGENAME = '_SEARCHHISTORYSGORAGENAME';
let SEARCHHISTORYRECORD = '_SEARCHHISTORYRECORD';

const orderSureWebUrl = `//www.${window.uleServer}/app/yzg/pxjh/order-sure.html?`

//修饰符 连接用的 连接到当前文件默认到处去的组件   connect(....)(Goods)


class Goods extends Component{
	constructor(props){
		super(props);
		this.state = {
			cartList : [],//购物车列表
			isShowSerch : false,//是否显示搜索
			navList : [],//导航数据
			keyword : '',
		}
		this.isSeachStatus = false;//是否是在搜索的状态上
		this.HistoricalRecord = true;//搜索状态  默认显示历史记录    false 显示收不到商品状态
		this.searchBeforeData = null;//搜索之前的状态(商品列表，品牌ID) 记录一个快照
		this.timer = null;
		this.boforeSearchKeyword = '';
	}
	//导航点击事件
	changeNavIdFn(e,id,flag){
		if(flag === 'up')Popup.hide();
		let {SetNavId,AddGoodList,NavId} = this.props;
		if(NavId === id)return;
		SetNavId(id);
		let {isSeachStatus} = this;
		AddGoodList({
			data : {keywords : isSeachStatus ? this.state.keyword : ''},
			callback : isSeachStatus ? this.searchCallbackFn.bind(this) : null
		})
	}
	//左上角返回图标点击事件
	backFn(){
		let {isSeachStatus,searchBeforeData} = this;
		let {RecoveredGoods} = this.props;
		if(isSeachStatus){//如果是搜索状态的话
			searchBeforeData && RecoveredGoods(searchBeforeData)
			this.isSeachStatus = false;
			this.setState({isShowSerch : false})
			//恢复刚搜索之前的状态
			this.searchBeforeData = null;
		}else{
			//要么返回上一个页面  要么就是返回首页
			goHome();
		}
	}
	//导航输入框聚焦事件
	seachIptFocus(){
		this.isSeachStatus = true;
		this.HistoricalRecord = true;
		this.setState({isShowSerch : true});
		//每次获焦的时候  记录一个快照 记录获焦之前的品牌ID和商品列表数据
		let {store} = this.context;
		let {goods} = store.getState();
		!this.searchBeforeData && (this.searchBeforeData = {...goods});
	}
	//搜索商品结果回来之后的回调
	searchCallbackFn(data){
		log('这是查询商品返回的数据',data)
		let {isShowSerch} = this.state;
		data = data || [];
		//这是搜索结果   当搜索出来东西的时候  显示显示搜索出来的东西 记录搜索状态之前的那个状态 因为返回的时候是需要返回到之前的那个状态的
		if(data.length){
			isShowSerch && this.setState({isShowSerch : false});
		}else{
			//当没有找到的时候 显示没有找到任何商品的状态
			this.HistoricalRecord = false;
			!isShowSerch && this.setState({isShowSerch : true})
		}
	}
	//搜索商品
	searchGoodList(keyword,agu = false){
		let {ReplaceGoods,NavId,AddGoodList} = this.props;
		let {store} = this.context;
		if(!keyword.replace(/\s/g,'') || (this.boforeSearchKeyword === keyword && agu))return;
		if(!agu)this.setState({keyword})
		this.boforeSearchKeyword = keyword;
		let searchHistoryList = JSON.parse(getStroage(SEARCHHISTORYSGORAGENAME) || "[]");
		searchHistoryList.unshift(keyword);
		while (searchHistoryList.length > 10)searchHistoryList.pop();
		writeStroage(SEARCHHISTORYSGORAGENAME,JSON.stringify(_.uniq(searchHistoryList)))
		AddGoodList({
			data : {keywords : keyword},
			callback : this.searchCallbackFn.bind(this)
		})
	}
	//导航输入框输入事件
	searchIptChange(e){
		let keyword = e.target.value;
		this.setState({keyword})
	}
	//查找多规格商品
	searchMoreGg(listId,list){
		let data = getSlignGg(listId);
		if(data){
			this.showMoreGg(data,list)
		}else{
			jsonp({
				url : GOODSPAGE_MORE_GG_URL,
				data : {zoneId : zoneId,listId}
			}).then(res=>{
				log('这个多规格接口查询返回的结果：',res);
				let {returnCode,returnMessage,data} = res;
				if(returnCode === '0000'){
					setMoreGg(listId,data);
					this.showMoreGg(data,list)
				}
			})
		}
		
	}
	upDataGoodList(){
		let {goodsList,ReplaceGoods} = this.props;
		ReplaceGoods(filterGoodList(goodsList))
	}
	//显示多规格商品
	showMoreGg(data,list){
		customPop({
			html : <FixedGg
				data={data}
				list={list}
				upDataGoodList ={this.upDataGoodList.bind(this)}
				upDateCartCount={this.upDateCartCount.bind(this)}
			/>
		})
	}
	//购物车加减
	AddAndSubtract(e,index,count){
		if(~e.target.className.indexOf('disable'))return;
		let data = this.getDate(index);
		let {limitNum,multisku,listId} = data;
		let list = getByCartList(listId);
		if(multisku === 1){
			this.searchMoreGg(listId,data);
			return;
		}
		let byCartCount = list ? parseFloat(list.ToTalCount) : 0;
		log('byCartCount',list,byCartCount)
		let isGtLimitNum = byCartCount < limitNum;
		if(isGtLimitNum && count > 0 ){
			count = limitNum - byCartCount;
		}else{
			count += byCartCount;
		}
		this.upDateCountCart(count,data);
	}
	//同步购物车数据
	upDateCountCart(count,data){
		let {defItemId,listId} = data;
		this.changeCount(count,listId,defItemId,data)
		this.upDateCartCount(data,count);
	}
	//商品input输入
	inputChange(e,index){
		var count = e.target.value.replace(/\D/g,'');
		let data = this.getDate(index);
		let {storage} = data;
		count > storage && (count = storage);
		count = parseFloat(count) || 0;
		this.upDateCountCart(count,data)
	}
	changeCount(...agu){
		let {ReplaceGoods,goodsList} = this.props;
		changeByCarCount(...agu);
		ReplaceGoods(filterGoodList(goodsList))
	}
	//请求购物车数据
	requireByCartData(){
		return jsonp({
			url : GOODSPAGE_SEARCH_CARD_URL,
			data : {zoneId : zoneId,cartType : cartType,activityId : _activityId}
		}).then(res=>{
			log('这是请求购物车返回的数据:',res);
			return res;
		})
	}
	//更新购物车
	upDateCartCount(data,itemCount){
		let {listId,itemId,defItemId,listingId} = data;
		itemId = itemId || defItemId;
		listId = listId || listingId;
		let timerName = 'timer' + itemId;
		clearTimeout(this[timerName]);
		this[timerName] = setTimeout(()=>{
			jsonp({
				url : GOODSPAGE_UPDATA_CARD_URL,
				data : {listingId : listId,itemId,itemCount,activityId : _activityId,zoneId:zoneId,cartType:cartType}
			}).then(res=>{
				log('这是添加购物车接口返回的信息:',res);
			})
		},1000)
	}
	//获取当前点击的对象
	getDate(index){
		let {goodsList} = this.props;
		return goodsList[index];
	}
	//清除购物车数据
	clearCartListFn(){
		this.setState({cartList : []})
	}
	
	//购物车输入框输入事件
	CartListInputChange(e,index){
		let val = e.target.value.replace(/\D/g,'');
		this.changeCartListCount(index,val)
	}
	//购物车加减
	CartListAss(count,index){
		let item = this.state.cartList[index];
		let {byCartCount} = item;
		let tolcount = parseInt(byCartCount) + parseInt(count);
		tolcount < 0 && (tolcount = 0);
		this.changeCartListCount(index,tolcount)
	}
	//改变购物车数量 notNeedUpdate//是否不需要跟新购物车
	changeCartListCount(index,count,NeedUpdate=true){
		let item = this.state.cartList[index];
		let {limitNum,listingId,listId,byCartCount,storage,itemId} = item;
		if(count > storage)count = storage;
		if(count == byCartCount)return;
		count = parseInt(count) || 0;
		item.byCartCount = count;
		this.setState({cartList : [...this.state.cartList]},()=>{
			NeedUpdate && this.upDateCartCount(item,count);
		})
		changeByCarCount(count,listId || listingId,itemId,item)
	}
	//input失焦事件
	CartListBlur(e,index){
		let item = this.state.cartList[index];
		let {listingId,listId,byCartCount,itemId} = item;
		changeByCarCount(byCartCount,listId || listingId,itemId,item)
	}
	//显示购物车
	showCartBoxFn(){
		if(this.state.cartList.length)return;
		clearByCartMap();
		let cartList = filTerCartList()
		this.setState({cartList})
	}
	//品牌下拉
	navDownFn(){
		let {navList} = this.state;
		let {SetNavId,NavId} = this.props;
		customPop({
			html : <FixedBrank
				downFn={this.BrandUpFn.bind(this)}
			    list={navList}
				NavId={NavId}
				changeNavIdFn = {this.changeNavIdFn.bind(this)}
			/>,
			animationType : 'slide-down'
		})
	}
	//品牌收起
	BrandUpFn(){
		Popup.hide();
	}
	//请求品牌数据
	requireBrandData(){
		let {SetNavId,AddGoodList} = this.props;
		let {store} = this.context;
		jsonp({
			url : GOODSPAGE_BRAND_URL,
			data : {zoneId : zoneId}
		}).then(res=>{
			log('这是品牌返回的数据:',res);
			let {returnCode,activityId,returnMessage,data} = res;
			if(returnCode === '0000'){
				_activityId = activityId;
				let navList = [{id : '',label : '全部'}];
				for(let i in data){
					navList.push({id : String(i),label : data[i]})
				}
				this.setState({navList})
				SetNavId(navList[0].id);
				AddGoodList().then(res=>{
					return this.requireByCartData()
				}).then(res=>{
					let {data,returnCode,returnMessage} = res;
					if(returnCode === '0000'){
						data = data || [];
						if(data.length){
							data.forEach(item=>{
								let {itemCount,listingId,itemId} = item;
								changeByCarCount(itemCount,listingId,itemId,item)
							})
							let {ReplaceGoods,goodsList} = this.props;
							ReplaceGoods(filterGoodList(goodsList))
						}
					}
				});
			}else{
			
			}
			
		})
	}
	//商品搜索输入框旁边的按钮点击搜索事件函数
	searchBtnClick(){
		let {keyword} = this.state;
		this.searchGoodList(keyword,true)
	}
	
	//下单
	placeAnOrder(count){
		if(count === 0)return;
		let parames = getParames();
		if(parames){
			window.open(`${orderSureWebUrl}data=${parames}&activityId=${_activityId}`,'_self')
		}else{
			Info('请选择商品进行下单');
		}
	}
	componentWillMount() {
		this.requireBrandData();
	}
	render(){
		const {cartList,navList,isShowSerch,keyword} = this.state;
		let {NavId,goodsList} = this.props;
		goodsList = filterGoodList(goodsList);
		const {HistoricalRecord} = this;
		const GoodsList = ()=>(
			<div className="container-good">
				<Nav
					{...{NavId,navList,changeNavIdFn : this.changeNavIdFn.bind(this),downFn:this.navDownFn.bind(this)}}
				/>
				<TodoList
					AAS={this.AddAndSubtract.bind(this)}
					inputChange = {this.inputChange.bind(this)}
					list={goodsList}/>
			</div>
		);
		let {totalCount,totalMoney} =  getTotalCountAndMoney();
		return(
			<div className="goods-page pt-50">
				<Head backClick={this.backFn.bind(this)}>
					<div className="search-box">
						<input
							value={keyword}
							onFocus={this.seachIptFocus.bind(this)}
							type="text"
							placeholder="输入商品名称/ID"
							onChange={this.searchIptChange.bind(this)}
						/>
						<div className="sea-btn" onTouchTap={this.searchBtnClick.bind(this)}>
							<i className="s-search-icon"></i>
						</div>
					</div>
				</Head>
				{/*/这里是搜索的地方的地方/*/}
				{!isShowSerch ? GoodsList() : <SearchStatusBox
					isHistory={HistoricalRecord}
					storageName = {SEARCHHISTORYSGORAGENAME}
					searchFn={this.searchGoodList.bind(this)}
				/>}
				<Footer {...{totalCount,totalMoney,showCartBoxFn : ()=>{
					totalCount && this.showCartBoxFn()
				},placeAnOrder : ()=>{this.placeAnOrder(totalCount)}}}/>
				{cartList.length > 0 && <ShippingOrder
					cartList={cartList}
					clearCartList = {this.clearCartListFn.bind(this)}
					inputChange={this.CartListInputChange.bind(this)}
					ASS = {this.CartListAss.bind(this)}
				/>}
			</div>
		)
	}
}



export default connect(
	(state) => ({goodsList : state.goods.list,NavId : state.goods.navId,}),
	dispatch => bindActionCreators({...GoodActions,dispatch},dispatch)
)(Goods)
Goods.contextTypes = {
	store: PropTypes.object
}

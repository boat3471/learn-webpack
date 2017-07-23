/*
* 订货会判断要进入哪一个页面
* */
export const ENTRY_URL = `//vps.${window.uleServer}/yzgApiWAR/orderMeeting/getIsOpenOrderMeeting.do`;

/**
 * 预热页
 * */

export const YRPAGE_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityPurchsMeet.do`;

/*
* 订货会商品列表页
* */

//商品列表接口  参数 ：zoneId=7&keyword=红牛&branId=6602品牌　　专区ID  关键字  品牌
export const GOODSPAGE_SHOP_LIST_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityList.do`;

//品牌  参数 ： zoneId=7 专区ID
export const GOODSPAGE_BRAND_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityBrand.do`;

//添加购物车 参数 cartType=21&listingId=599541&itemdetail=59954101|10&activityId=11122&zoneId=7
export const GOODSPAGE_ADD_CARD_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityAddCart.do`;

//查询购物车 参数 zoneId=7&cartType=21&activityId=11122
export const GOODSPAGE_SEARCH_CARD_URL = `//wholesale.${window.uleServer}/fxYzgApi/activitySelCart.do`;

//更新购物车 参数 cartType=21&listingId=599541&itemId=59954101&activityId=11122&zoneId=7&itemCount=8
export const GOODSPAGE_UPDATA_CARD_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityUpdateCart.do`;

//删除购物车 参数 cartType=21&activityId=11122&zoneId=7&data=59954101:599541
export const GOODSPAGE_DELETE_CARD_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityDelCart.do`;
//查询规格 	?zoneId=940&listId=638358
export const GOODSPAGE_MORE_GG_URL = `//wholesale.${window.uleServer}/fxYzgApi/activityViewItem.do`;
let _isLoad = false;//页面是否加载完成

export default {
	get isLoad(){
		return _isLoad;
	},
	set isLoad(newval){
		_isLoad = newval;
	}
}
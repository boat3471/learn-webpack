const _isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
const HomeUrl = 'ULEMOBILE://ulePopView';



const toUrl = url=>{
	window.location.href = url;
}




export const isIPhone = _isIPhone;
export const goHome = ()=>toUrl(HomeUrl);
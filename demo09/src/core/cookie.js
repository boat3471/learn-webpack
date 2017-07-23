
function load() {
	let tC = document.cookie.split('; ');
	let tO = {};
	let a = null;
	for (let i = 0; i < tC.length; i++) {
		a = tC[i].split('=');
		tO[a[0]] = a[1];
	}
	return tO;
}

export const getCookie = (a)=>{
	let b=load()[a];
	if(!b)return!1;
	try{
		return decodeURI(b)
	}catch(c){
		return unescape(b)
	}
}
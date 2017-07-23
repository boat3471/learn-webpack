export const writeStroage = (attr,val)=>{
	window.localStorage[attr] = val;
}
export const deleteStroage = (attr,val)=>{
	delete window.localStorage[attr];
}
export const getStroage = (attr)=>{
	return window.localStorage[attr];
}

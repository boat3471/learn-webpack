import hello from './hello';

var h = new hello();

let el = document.createElement('div');
el.innerHTML = '<div>hello webpack</div>' + h.a + h.b;
document.body.appendChild(el);
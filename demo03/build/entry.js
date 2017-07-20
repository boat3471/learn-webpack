import hello from './hello';

let h = new hello();

let el = document.createElement('div');
el.innerHTML = '<div>hello webpack</div>' + h.a + h.b;
document.body.appendChild(el);
import hello from './hello';

let el = document.createElement('div');
el.innerHTML = '<div>hello webpack</div>' + hello.a + hello.b;
document.body.appendChild(el);
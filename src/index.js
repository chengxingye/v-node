import createElement from './createElement'
import render from './render'

let div = createElement('div',{id:'name'},[
    createElement('p',{key:'a'},'标签1'),
    createElement('p',{key:'b'},'标签2'),
    createElement('p',{key:'c'},'标签3'),
])
render(div,document.getElementById('app'))

let div1 = createElement('div',{id:'name'},[
    createElement('p',{key:'b',style:{color:'red'}},'标签3'),
    createElement('p',{key:'a'},'标签4'),
    createElement('p',{key:'c'},'标签3'),
])
render(div1,document.getElementById('app'))

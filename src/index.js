import createElement from './createElement'
import render from './render'

let div = createElement('div',{id:'name'},[
    createElement('span',{style:{color:'red'},class:'bigSize'},'v-node'),
    createElement('p',{},'标签1'),
    createElement('p',{},'标签2'),
    createElement('p',{},'标签3'),
])
console.log(div)
render(div,document.getElementById('app'))
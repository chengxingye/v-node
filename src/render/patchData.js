export default function patchData(el, key, pre, next) {
    switch (key) {
        case 'style':
                for (let item in next) {
                    //防止原型数据
                    if (next.hasOwnProperty(item)) {
                        el.style[item] = next[item]
                    }
                }
                for (let item in pre) {
                    //防止原型数据
                    if (pre[item] && !next.hasOwnProperty(item)) {
                        el.style[item] = ''
                    }
                }
            break;
        case 'class':
            console.log('111',next)
            el.className = next
            break;
            default:
                
            if(key.includes('on')){
                if(pre){
                    el.removeEventListener(key.slice(2),pre)
                }
                if(next){
                    el.addEventListener(key.slice(2),next)
                }
            }else{
                el && el.setAttribute(key,next)
            }
    }
}
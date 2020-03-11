export default function patchData(el, key, pre, next) {
    switch (key) {
        case 'style':
                for (let item in next) {
                    //防止原型数据
                    if (next.hasOwnProperty(item)) {
                        el.style[item] = next[item]
                    }
                }
            break;
        case 'class':
            el.className = next
            break;
            default:
                
            if(key.includes('on')){
                el.addEventListener(key.slice(2),next)
            }else{
                el.setAttribute(key,next)
            }
    }
}
import mount from './mount'
import patch from './patch'
export default function render(vnode, container) {
    if(container.vnode){
        patch(container.vnode,vnode,container)
    }else{
        mount(vnode, container)
    }
    container.vnode = vnode
}
import patchData from './patchData'
import { vnodeType,childrenFlagType } from '../type'

function mount(vnode, container,flagNode) {
    if (vnode.flag === vnodeType.HTML) {
        mountElement(vnode, container,flagNode)
    } else if (vnode.flag === vnodeType.TEXT) {
        mountText(vnode, container)
    }
}

function mountElement(vnode, container,flagNode) {
    let dom = document.createElement(vnode.tag)
    vnode.el = dom
    let {
        data,
        children,
        childrenFlag
    } = vnode
    //data数据渲染
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            patchData(dom, key, null, data[key])
        }
    }
    if (childrenFlag !== childrenFlagType.EMPTY) { // 不 === 空
        if (childrenFlag === childrenFlagType.SINGLE) { //一个元素时
            mount(children, dom)
        } else if (childrenFlag === childrenFlagType.MULTIPLE) {
            for (let i = 0; i < children.length; i++) {
                mount(children[i], dom)
            }
        }
    }
    flagNode?container.insertBefore(dom,flagNode):container.appendChild(dom)
}

function mountText(vnode, container) {
    let text = document.createTextNode(vnode.children)
    vnode.el = text
    container.appendChild(text)
}

export default mount
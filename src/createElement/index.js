import { vnodeType,childrenFlagType } from '../type'
//新建虚拟dom
export default function createElement(tag, data, children) {
    let flag;
    if (typeof tag === 'string') {
        flag = vnodeType.HTML
    } else if (typeof tag === 'function') {
        flag = vnodeType.COMPONENT
    } else {
        flag = vnodeType.TEXT
    }

    let childrenFlag;
    if (children == null) {
        childrenFlag = childrenFlag.EMPTY
    } else if (Array.isArray(children)) {
        let length = children.length
        if (length === 0) {
            childrenFlag = childrenFlagType.EMPTY
        } else {
            childrenFlag = childrenFlagType.MULTIPLE
        }
    } else {
        childrenFlag = childrenFlagType.SINGLE //txet
        children = createTextVnode(children + '')
    }
    //返回vnode,
    return {
        flag, //vnode类型
        tag, //标签
        data,
        children,
        childrenFlag,
        el: null
    }
}

//创建文本节点
function createTextVnode(text) {
    return {
        flag: vnodeType.TEXT, //vnode类型
        tag: null, //标签
        data: null,
        el: null,
        children: text,
        childrenFlag: childrenFlagType.EMPTY
    }
}
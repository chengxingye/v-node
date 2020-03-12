import mount from './mount'
import {
    vnodeType,
    childrenFlagType as flagType
} from '../type'
import patchData from './patchData'
export default function patch(pre, next, container) {
    let preFlag = pre.flag
    let nextFlag = next.flag
    //flag 为类型不同直接替换操作
    if (preFlag !== nextFlag) {
        replaceVnode(pre, next, container)
    } else if (nextFlag === vnodeType.HTML) {
        pathcElement(pre, next, container)
    } else if (nextFlag === vnodeType.TEXT) {
        pathText(pre, next)
    }
}
//节点类型不同进行操作
function replaceVnode(pre, next, container) {
    container.removeChild(pre.el)
    mount(next, container)
}

function pathcElement(pre, next, container) {
    if (pre.tag !== next.tag) {
        replaceVnode(pre, next, container)
        return
    }
    //更新data 
    //把pre上的el节点信息赋给next
    const el = (next.el = pre.el)
    let preData = pre.data
    let nextData = next.data
    if (nextData) {
        for (let item in nextData) {
            if (nextData.hasOwnProperty(item)) {
                let preValue = preData[item]
                let nextValue = nextData[item]
                patchData(el, item, preValue, nextValue)
            }
        }
    }
    if (preData) {
        for (let item in preData) {
                let preValue = preData[item]
                if (preValue && !nextData.hasOwnProperty(item)) {
                    patchData(container, item, preValue, null)
                }
            
        }
    }
    //更新data end

    //childrenFlag需要比较
    //childrennode需要比较
    patchChildren(
        pre.childrenFlag,
        next.childrenFlag,
        pre.children,
        next.children,
        el
    )
}

function patchChildren(
    preChildFlag,
    nextChildFlag,
    preChildren,
    nextChildren,
    container
) {
    //更新子元素需要考虑childrenFlag 
    // 1.preChildFlag 为 单独
    //   preChildFlag 为 多个
    //   preChildFlag 为 空

    // 2.nextChildFlag 为 单独
    //   nextChildFlag 为 多个
    //   nextChildFlag 为 空
    switch (preChildFlag) {
        case flagType.EMPTY:
            switch (nextChildFlag) {
                case flagType.EMPTY:
                    break;
                case flagType.SINGLE:
                    mount(nextChildren,container)
                    break;
                case flagType.MULTIPLE:
                        for(let item in nextChildren){
                            if(nextChildren.hasOwnProperty(item)){
                                mount(nextChildren,container)
                            }
                        }
                    break;
            }
            break;
        case flagType.SINGLE:
                switch (nextChildFlag) {
                    case flagType.EMPTY:
                        container.removeChild(preChildren.el)
                        break;
                    case flagType.SINGLE:
                        patch(preChildren,nextChildren,container)
                        break;
                    case flagType.MULTIPLE:
                        container.removeChild(preChildren.el)
                            for(let item in nextChildren){
                                if(nextChildren.hasOwnProperty(item)){
                                    mount(nextChildren[item],container)
                                }
                            }
                        break;
                }
            break;
        case flagType.MULTIPLE:
                switch (nextChildFlag) {
                    case flagType.EMPTY:
                            for(let item in preChildFlag){
                                if(preChildFlag.hasOwnProperty(item)){
                                    container.removeChild(preChildFlag[item].el)
                                }
                            }
                        break;
                    case flagType.SINGLE:
                            for(let item in preChildFlag){
                                if(preChildFlag.hasOwnProperty(item)){
                                    container.removeChild(preChildFlag[item].el)
                                }
                            }
                            mount(nextChildren,container)
                        break;
                    case flagType.MULTIPLE:
                      
                        //pre为数组，next也为数组
                        //首先查看位置移动
                        //[abc]
                        //[abc] 012顺序递增 所以不用移动
                        //[abc]
                        //[acb]下标为021部署顺序递增所以需要变化
                        let lastindex = 0
                        for(let i = 0;i<nextChildren.length;i++){
                            let nextNode = nextChildren[i]
                            let j = 0,find=false
                            //拿next的值和每一个值进行比较
                            for(j;j<preChildren.length;j++){
                                let preNode = preChildren[j]
                                if(preNode.key === nextNode.key){
                                    find = true
                                    patch(preNode,nextNode,container)
                                    //key相同为同一个值
                                    if(j<lastindex){
                                        let flagNode = nextChildren[i-1].el.nextSibling
                                        container.insertBefore(preNode.el,flagNode)
                                        break
                                    }else{
                                        lastindex = j
                                    }
                                }
                                
                            }
                            if(!find){
                                //没有找到相同key的话进行新增
                                let flagNode = i===0?preChildren[i].el:nextChildren[i-1].nextSibling
                                mount(nextNode,container,flagNode)
                            }
                        }
                        for(let i =0;i<preChildren.length;i++){
                            const preNode = preChildren[i]
                            let has = nextChildren.find(next=>next.key===preNode.key)
                            if(!has){
                                container.removeChild(preNode.el)
                            }
                        }
                        break;
                }
            break;
    }
}
//更新text节点
function pathText(prevVNode, nextVNode) {
  // 拿到文本节点 el，同时让 nextVNode.el 指向该文本节点
  const el = (nextVNode.el = prevVNode.el)
  // 只有当新旧文本内容不一致时才有必要更新
  if (nextVNode.children !== prevVNode.children) {
    el.nodeValue = nextVNode.children
  }
}
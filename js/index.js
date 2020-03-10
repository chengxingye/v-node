const vnodeType = {
    HTML:'HTML',
    TEXT:'TEXT',

    COMPONENT:'COMPONENT',
    CLASS_COMPONENT:'CLASS_COMPONENT'
}

const childrenFlagType = {
    EMPTY:'EMPTY', //空
    SINGLE:'SINGLE', // 一个子元素
    MULTIPLE:'MULTIPLE' //多个子元素
}

{/* <div id="app">
<span>v-node</span>
</div> */}
//createElement('div',{id:'name'},[createElement('span',{},['v-node'])])


//新建虚拟dom
function createElement(tag,data,children){
    let flag;
    if(typeof tag === 'string'){
        flag = vnodeType.HTML
    }else if(typeof tag === 'function'){
        flag = vnodeType.COMPONENT
    }else{
        flag = vnodeType.TEXT
    }

    let childrenFlag;
    if(children == null){
        childrenFlag = childrenFlag.EMPTY
    }else if(Array.isArray(children)){
        let length = children.length
        if(length === 0){
            childrenFlag = childrenFlagType.EMPTY
        }else{
            childrenFlag = childrenFlagType.MULTIPLE
        }
    }else{
        childrenFlag = childrenFlagType.SINGLE //txet
        children = createTextVnode(children+'')
    }
    //返回vnode,
    return {
        flag,//vnode类型
        tag, //标签
        data,
        children,
        childrenFlag,
        el:null
    }
}
//创建文本节点
function createTextVnode(text){
    return {
        flag:vnodeType.TEXT,//vnode类型
        tag:null, //标签
        data:null,
        el:null,
        children:text,
        childrenFlag:childrenFlagType.EMPTY
    }
}
function render(vnode,container){
    console.log('111',container)
        mount(vnode,container)
}

function mount(vnode,container){
    if(vnode.flag === vnodeType.HTML){
        mountElement(vnode,container)
    }else if(vnode.flag === vnodeType.TEXT){
        mountText(vnode,container)
    }
}

function mountElement(vnode,container){
    let dom = document.createElement(vnode.tag)
    vnode.el = dom
    let { data,children,childrenFlag } = vnode
    if(childrenFlag !== childrenFlagType.EMPTY){ // 不 === 空
        if(childrenFlag === childrenFlagType.SINGLE){ //一个元素时
            mount(children,dom)
        }else if(childrenFlag === childrenFlagType.MULTIPLE){
            for(let i=0;i<children.length;i++){
                mount(children[i],dom)
            }
        }
    }
    container.appendChild(dom)
}

function mountText(vnode,container){
        console.log('111',container,vnode)
        let text = document.createTextNode(vnode.children)
        container.appendChild(text)
}
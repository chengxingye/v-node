var index_17b42f3e7d8550607c7d =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var vnodeType = {\n  HTML: 'HTML',\n  TEXT: 'TEXT',\n  COMPONENT: 'COMPONENT',\n  CLASS_COMPONENT: 'CLASS_COMPONENT'\n};\nvar childrenFlagType = {\n  EMPTY: 'EMPTY',\n  //空\n  SINGLE: 'SINGLE',\n  // 一个子元素\n  MULTIPLE: 'MULTIPLE' //多个子元素\n\n};\n{}\n/* <div id=\"app\">\n<span>v-node</span>\n</div> */\n//createElement('div',{id:'name'},[createElement('span',{},['v-node'])])\n//新建虚拟dom\n\nfunction createElement(tag, data, children) {\n  var flag;\n\n  if (typeof tag === 'string') {\n    flag = vnodeType.HTML;\n  } else if (typeof tag === 'function') {\n    flag = vnodeType.COMPONENT;\n  } else {\n    flag = vnodeType.TEXT;\n  }\n\n  var childrenFlag;\n\n  if (children == null) {\n    childrenFlag = childrenFlag.EMPTY;\n  } else if (Array.isArray(children)) {\n    var length = children.length;\n\n    if (length === 0) {\n      childrenFlag = childrenFlagType.EMPTY;\n    } else {\n      childrenFlag = childrenFlagType.MULTIPLE;\n    }\n  } else {\n    childrenFlag = childrenFlagType.SINGLE; //txet\n\n    children = createTextVnode(children + '');\n  } //返回vnode,\n\n\n  return {\n    flag: flag,\n    //vnode类型\n    tag: tag,\n    //标签\n    data: data,\n    children: children,\n    childrenFlag: childrenFlag,\n    el: null\n  };\n} //创建文本节点\n\n\nfunction createTextVnode(text) {\n  return {\n    flag: vnodeType.TEXT,\n    //vnode类型\n    tag: null,\n    //标签\n    data: null,\n    el: null,\n    children: text,\n    childrenFlag: childrenFlagType.EMPTY\n  };\n}\n\nfunction render(vnode, container) {\n  mount(vnode, container);\n}\n\nfunction mount(vnode, container) {\n  if (vnode.flag === vnodeType.HTML) {\n    mountElement(vnode, container);\n  } else if (vnode.flag === vnodeType.TEXT) {\n    mountText(vnode, container);\n  }\n}\n\nfunction mountElement(vnode, container) {\n  var dom = document.createElement(vnode.tag);\n  vnode.el = dom;\n  var data = vnode.data,\n      children = vnode.children,\n      childrenFlag = vnode.childrenFlag; //data数据渲染\n\n  for (var key in data) {\n    if (data.hasOwnProperty(key)) {\n      patchData(dom, key, null, data[key]);\n    }\n  }\n\n  if (childrenFlag !== childrenFlagType.EMPTY) {\n    // 不 === 空\n    if (childrenFlag === childrenFlagType.SINGLE) {\n      //一个元素时\n      mount(children, dom);\n    } else if (childrenFlag === childrenFlagType.MULTIPLE) {\n      for (var i = 0; i < children.length; i++) {\n        mount(children[i], dom);\n      }\n    }\n  }\n\n  container.appendChild(dom);\n}\n\nfunction patchData(el, key, pre, next) {\n  switch (key) {\n    case 'style':\n      for (var item in next) {\n        //防止原型数据\n        if (next.hasOwnProperty(item)) {\n          el.style[item] = next[item];\n        }\n      }\n\n      break;\n\n    case 'class':\n      el.className = next;\n      break;\n\n    default:\n      if (key.includes('on')) {\n        el.addEventListener(key.slice(2), next);\n      } else {\n        el.setAttribute(key, next);\n      }\n\n  }\n} //渲染style\n// function renderStyle(el, data) {\n//     return el\n// }\n\n\nfunction mountText(vnode, container) {\n  var text = document.createTextNode(vnode.children);\n  container.appendChild(text);\n}\n\n//# sourceURL=webpack://%5Bname%5D_%5Bchunkhash%5D/./src/index.js?");

/***/ })

/******/ });
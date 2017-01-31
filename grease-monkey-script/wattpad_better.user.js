// ==UserScript==
// @name         Better WattPad
// @namespace    http://cestdoncvrai.fr/
// @version      2.6
// @author       Alinoee
// @match        https://www.wattpad.com/*
// @include       *
// @grant        none
// ==/UserScript==

/*
  START CONFIGURATION
  */


  var ff_wp_better_config = {
  wattpad_enable_justify:true, // true -> justifie text on fiction // false -> default comportment
  wattpad_enable_select:true, // true -> enable selection on fiction // false -> default comportment
  wattpad_enable_big_comment:true, // true -> auto-resize comment and other text fields // false -> default comportment (use scroll bar)
  wattpad_enable_links:true, // true -> make all links on fiction clikable // false -> default comportment
  wattpad_enable_alinea:0, // 0 : no indentation (default comportement) // 1 : 1em indentation // 2 : 2em indentation ...etc.
  wattpad_enable_auto_broadcast:true, // true -> check "notify my user" // false -> default comportment
  wattpad_enable_local_storage_gestion:true,  // true display button to update notifications // false -> no button... no notifications !
  wattpad_enable_additional_links:true,  // true display some additionals links to navigate on fiction
  wattpad_enable_paragraphe_comments:true
};
  /* Libs */
  /*! Autosize 3.0.16 */
  !function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);v=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),p="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(p)&&(p=0),s()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,v=t,f&&(e.style.overflowY=t),r()}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){var t=e.style.height,n=o(e),r=document.documentElement&&document.documentElement.scrollTop;e.style.height="auto";var i=e.scrollHeight+p;return 0===e.scrollHeight?void(e.style.height=t):(e.style.height=i+"px",h=e.clientWidth,n.forEach(function(e){e.node.scrollTop=e.scrollTop}),void(r&&(document.documentElement.scrollTop=r)))}function s(){var t=e.style.height;r();var o=window.getComputedStyle(e,null);if(o.height!==e.style.height?"visible"!==v&&n("visible"):"hidden"!==v&&n("hidden"),t!==e.style.height){var i=d("autosize:resized");e.dispatchEvent(i)}}var l=void 0===arguments[1]?{}:arguments[1],a=l.setOverflowX,u=void 0===a?!0:a,c=l.setOverflowY,f=void 0===c?!0:c;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var p=null,v=null,h=e.clientWidth,y=function(){e.clientWidth!==h&&s()},m=function(t){window.removeEventListener("resize",y,!1),e.removeEventListener("input",s,!1),e.removeEventListener("keyup",s,!1),e.removeEventListener("autosize:destroy",m,!1),e.removeEventListener("autosize:update",s,!1),i["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",m,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",s,!1),window.addEventListener("resize",y,!1),e.addEventListener("input",s,!1),e.addEventListener("autosize:update",s,!1),i.add(e),u&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function o(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=d("autosize:destroy");e.dispatchEvent(t)}}function r(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=d("autosize:update");e.dispatchEvent(t)}}var i="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),d=function(e){return new Event(e)};try{new Event("test")}catch(s){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(l=function(e){return e},l.destroy=function(e){return e},l.update=function(e){return e}):(l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},l.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=l});
  /*! jQuery observe */
  !function(a){a.Observe={}}(jQuery),function(a,b){var c=function(b,c){c||(c=b,b=window.document);var d=[];return a(c).each(function(){for(var c=[],e=a(this),f=e.parent();f.length&&!e.is(b);f=f.parent()){var g=e.get(0).tagName.toLowerCase();c.push(g+":eq("+f.children(g).index(e)+")"),e=f}(f.length||e.is(b))&&d.push("> "+c.reverse().join(" > "))}),d.join(", ")};b.path={get:c,capture:function(b,d){d||(d=b,b=window.document);var e=[];return a(d).each(function(){var d=-1,f=this;if(this instanceof Text)for(var f=this.parentNode,g=f.childNodes,h=0;h<g.length;h++)if(g[h]===this){d=h;break}var i=c(b,f),j=a(b).is(f);e.push(function(b){return b=j?b:a(b).find(i),-1===d?b:b.contents()[d]})}),function(b){return b=b||window.document,e.reduce(function(a,c){return a.add(c(b))},a([]))}}}}(jQuery,jQuery.Observe),function(a,b){var c=function(b){this.original=a(b),this.root=this.original.clone(!1,!0)};c.prototype.find=function(a){return b.path.capture(this.original,a)(this.root)},b.Branch=c}(jQuery,jQuery.Observe),function(a,b){var c=function(a,b){var c={};return a.forEach(function(a){(a=b(a))&&(c[a[0]]=a[1])}),c},d=c("childList attributes characterData subtree attributeOldValue characterDataOldValue attributeFilter".split(" "),function(a){return[a.toLowerCase(),a]}),e=c(Object.keys(d),function(a){if("attributefilter"!==a)return[d[a],!0]}),f=c(["added","removed"],function(a){return[a.toLowerCase(),a]}),g=a([]),h=function(a){if("object"==typeof a)return a;a=a.split(/\s+/);var b={};return a.forEach(function(a){if(a=a.toLowerCase(),!d[a]&&!f[a])throw Error("Unknown option "+a);b[d[a]||f[a]]=!0}),b},i=function(a){return"["+Object.keys(a).sort().reduce(function(b,c){var d=a[c]&&"object"==typeof a[c]?i(a[c]):a[c];return b+"["+JSON.stringify(c)+":"+d+"]"},"")+"]"},j=window.MutationObserver||window.WebKitMutationObserver,k=function(b,c,d,e){this._originalOptions=a.extend({},c),c=a.extend({},c),this.attributeFilter=c.attributeFilter,delete c.attributeFilter,d&&(c.subtree=!0),c.childList&&(c.added=!0,c.removed=!0),(c.added||c.removed)&&(c.childList=!0),this.target=a(b),this.options=c,this.selector=d,this.handler=e};k.prototype.is=function(a,b,c){return i(this._originalOptions)===i(a)&&this.selector===b&&this.handler===c},k.prototype.match=function(b){var c=this.options,d=b.type;if(!this.options[d])return g;if(this.selector)switch(d){case"attributes":if(!this._matchAttributeFilter(b))break;case"characterData":return this._matchAttributesAndCharacterData(b);case"childList":if(b.addedNodes&&b.addedNodes.length&&c.added&&(d=this._matchAddedNodes(b),d.length))return d;if(b.removedNodes&&b.removedNodes.length&&c.removed)return this._matchRemovedNodes(b)}else{var e=b.target instanceof Text?a(b.target).parent():a(b.target);if(!c.subtree&&e.get(0)!==this.target.get(0))return g;switch(d){case"attributes":if(!this._matchAttributeFilter(b))break;case"characterData":return this.target;case"childList":if(b.addedNodes&&b.addedNodes.length&&c.added||b.removedNodes&&b.removedNodes.length&&c.removed)return this.target}}return g},k.prototype._matchAttributesAndCharacterData=function(a){return this._matchSelector(this.target,[a.target])},k.prototype._matchAddedNodes=function(a){return this._matchSelector(this.target,a.addedNodes)},k.prototype._matchRemovedNodes=function(c){var d=new b.Branch(this.target),e=Array.prototype.slice.call(c.removedNodes).map(function(a){return a.cloneNode(!0)});return c.previousSibling?d.find(c.previousSibling).after(e):c.nextSibling?d.find(c.nextSibling).before(e):(this.target===c.target?d.root:d.find(c.target)).empty().append(e),this._matchSelector(d.root,e).length?a(c.target):g},k.prototype._matchSelector=function(b,c){var d=b.find(this.selector);return c=Array.prototype.slice.call(c),d=d.filter(function(){var b=this;return c.some(function(c){return c instanceof Text?c.parentNode===b:c===b||a(c).has(b).length})})},k.prototype._matchAttributeFilter=function(a){return!this.attributeFilter||!this.attributeFilter.length||0<=this.attributeFilter.indexOf(a.attributeName)};var l=function(a){this.patterns=[],this._target=a,this._observer=null};l.prototype.observe=function(a,b,c){var d=this;this._observer?this._observer.disconnect():this._observer=new j(function(a){a.forEach(function(a){d.patterns.forEach(function(b){var c=b.match(a);c.length&&c.each(function(){b.handler.call(this,a)})})})}),this.patterns.push(new k(this._target,a,b,c)),this._observer.observe(this._target,this._collapseOptions())},l.prototype.disconnect=function(a,b,c){var d=this;this._observer&&(this.patterns.filter(function(d){return d.is(a,b,c)}).forEach(function(a){a=d.patterns.indexOf(a),d.patterns.splice(a,1)}),this.patterns.length||this._observer.disconnect())},l.prototype.disconnectAll=function(){this._observer&&(this.patterns=[],this._observer.disconnect())},l.prototype.pause=function(){this._observer&&this._observer.disconnect()},l.prototype.resume=function(){this._observer&&this._observer.observe(this._target,this._collapseOptions())},l.prototype._collapseOptions=function(){var b={};return this.patterns.forEach(function(c){var d=b.attributes&&b.attributeFilter;if(!d&&b.attributes||!c.attributeFilter)d&&c.options.attributes&&!c.attributeFilter&&delete b.attributeFilter;else{var e={},f=[];(b.attributeFilter||[]).concat(c.attributeFilter).forEach(function(a){e[a]||(f.push(a),e[a]=1)}),b.attributeFilter=f}a.extend(b,c.options)}),Object.keys(f).forEach(function(a){delete b[f[a]]}),b};var m=function(a){this.patterns=[],this._paused=!1,this._target=a,this._events={},this._handler=this._handler.bind(this)};m.prototype.NS=".jQueryObserve",m.prototype.observe=function(b,c,d){b=new k(this._target,b,c,d),a(this._target),b.options.childList&&(this._addEvent("DOMNodeInserted"),this._addEvent("DOMNodeRemoved")),b.options.attributes&&this._addEvent("DOMAttrModified"),b.options.characterData&&this._addEvent("DOMCharacerDataModified"),this.patterns.push(b)},m.prototype.disconnect=function(b,c,d){var e=a(this._target),f=this;this.patterns.filter(function(a){return a.is(b,c,d)}).forEach(function(a){a=f.patterns.indexOf(a),f.patterns.splice(a,1)});var g=this.patterns.reduce(function(a,b){return b.options.childList&&(a.DOMNodeInserted=!0,a.DOMNodeRemoved=!0),b.options.attributes&&(a.DOMAttrModified=!0),b.options.characterData&&(a.DOMCharacerDataModified=!0),a},{});Object.keys(this._events).forEach(function(a){g[a]||(delete f._events[a],e.off(a+f.NS,f._handler))})},m.prototype.disconnectAll=function(){var c,b=a(this._target);for(c in this._events)b.off(c+this.NS,this._handler);this._events={},this.patterns=[]},m.prototype.pause=function(){this._paused=!0},m.prototype.resume=function(){this._paused=!1},m.prototype._handler=function(b){if(!this._paused){var c={type:null,target:null,addedNodes:null,removedNodes:null,previousSibling:null,nextSibling:null,attributeName:null,attributeNamespace:null,oldValue:null};switch(b.type){case"DOMAttrModified":c.type="attributes",c.target=b.target,c.attributeName=b.attrName,c.oldValue=b.prevValue;break;case"DOMCharacerDataModified":c.type="characterData",c.target=a(b.target).parent().get(0),c.attributeName=b.attrName,c.oldValue=b.prevValue;break;case"DOMNodeInserted":c.type="childList",c.target=b.relatedNode,c.addedNodes=[b.target],c.removedNodes=[];break;case"DOMNodeRemoved":c.type="childList",c.target=b.relatedNode,c.addedNodes=[],c.removedNodes=[b.target]}for(b=0;b<this.patterns.length;b++){var d=this.patterns[b],e=d.match(c);e.length&&e.each(function(){d.handler.call(this,c)})}}},m.prototype._addEvent=function(b){this._events[b]||(a(this._target).on(b+this.NS,this._handler),this._events[b]=!0)},b.Pattern=k,b.MutationObserver=l,b.DOMEventObserver=m,a.fn.observe=function(b,c,d){return c?d||(d=c,c=null):(d=b,b=e),this.each(function(){var e=a(this),f=e.data("observer");f||(f=j?new l(this):new m(this),e.data("observer",f)),b=h(b),f.observe(b,c,d)})},a.fn.disconnect=function(b,c,d){return b&&(c?d||(d=c,c=null):(d=b,b=e)),this.each(function(){var e=a(this),f=e.data("observer");f&&(b?(b=h(b),f.disconnect(b,c,d)):(f.disconnectAll(),e.removeData("observer")))})}}(jQuery,jQuery.Observe);
//     Underscore.js 1.8.3
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
var $ = unsafeWindow.jQuery;

var wpb_translations = {
  "en": {
    "contentRemoveNotificationStorage": {"message": "Load new notifications"},
    "contentRemoveCommentsStorage": {"message": "Load new comments"},
    "contentPrevChapter" : {"message":"Back to previous chapter"}
  },
  "fr": {
    "contentRemoveNotificationsStorage": {"message": "Charger les nouvelles notifications"},
    "contentRemoveCommentsStorage": {"message": "Charger les nouveaux commentaires"},
    "contentPrevChapter" : {"message":"Relire le chapitre précédent"}
  }
}
var wp_better_config = {
  configKeys : [
    'wattpad_enable_select',
    'wattpad_enable_justify',
    'wattpad_enable_big_comment',
    'wattpad_enable_alinea',
    'wattpad_enable_auto_broadcast',
    'wattpad_enable_local_storage_gestion',
    'wattpad_enable_additional_links',
    'wattpad_enable_links'
    ],
  getConfiguration: function() {
    if(navigator.sayswho.indexOf('Chrome') > -1) {
      chrome.storage.sync.get(this.configKeys, function(result) {
        wp_better_config = result;
      });
    } else if (navigator.sayswho.indexOf('Firefox') > -1) {
          wp_better_config = ff_wp_better_config;
      }
  }
};
$(document).ready(function(){
  if(wp_better_config.wattpad_enable_select) {
    wp_better.selection_enabled();
  }
  wp_better.initApp();
  $("#app-container").observe('childlist', function(record){
    wp_better.initApp();
  });
  if(navigator.sayswho.indexOf('Firefox') > -1) {
    wp_better.greaseMonkeyInitiation();
  }
});

var wp_better = {
  initApp : function() {
    wp_better.launch_complentary_observers();
    /*
    * Comportement on story reading page
    */
    if($('body').hasClass('route-storyReading')) {
      if(wp_better_config.wattpad_enable_select) {
        wp_better.selection_enabled();
        $("#parts-container-new").observe('childlist subtree', 'pre', function(record) {
          wp_better.selection_enabled();
          $("#parts-container-new").disconnect();
        });
      }
      if(wp_better_config.wattpad_enable_big_comment) {
        wp_better.autoresize('#comments textarea');
      }
      if(wp_better_config.wattpad_enable_local_storage_gestion) {
        wp_better.add_reload_comment_button();
      }
      if(wp_better_config.wattpad_enable_justify && _.isUndefined($(".wem_justify")[0])){
        wp_better.addStyleOnHead('wem_justify', '#story-reading .page p {text-align:justify}');
      }
      if(wp_better_config.wattpad_enable_alinea > 0 && _.isUndefined($(".wem_wattpad_enable_alinea")[0])){
        wp_better.addStyleOnHead('wem_wattpad_enable_alinea', '#story-reading .page p {text-indent:' + wp_better_config.wattpad_enable_alinea + 'em!important;}');
      }
      if(wp_better_config.wattpad_enable_links) {
        wp_better.autolink($('.panel-reading p'));
      }
      if(wp_better_config.wattpad_enable_additional_links) {
        wp_better.buttons_generation();
      }
    }
    /*
    Comportement on user profile page
    */
    if($('body').hasClass('route-userProfile') || window.location.href.indexOf("/user/cestdoncvrai/activity") > -1) {
      wp_better.add_profil_interraction();
      $("#content").observe('childlist', function(record){
        $("#profile-messages").observe('childlist subtree', function(record){
          wp_better.add_profil_interraction();
          ////console.log("#profile-messages");
          $("#profile-messages").disconnect();

        });
      });
    }
    /*
    * Comportement pour les notifications
    */
    if($('body').hasClass('route-notifications')) {
      if(wp_better_config.wattpad_enable_local_storage_gestion) {
        wp_better.cleanLocalStorage('notifications');
      }
    }
    /*
    * Comportement pour la page "messages"
    */
    if(window.location.href.indexOf("www.wattpad.com/user_inbox") > -1 ){
      wp_better.autoresize('textarea#comment');
    }
  },
  launch_complentary_observers: function() {
    $("#comments").observe('childlist subtree', '.message', function(record) {
      if(wp_better_config.wattpad_enable_big_comment) {
        wp_better.autoresize('#comments textarea');
      }
      if(wp_better_config.wattpad_enable_local_storage_gestion) {
        wp_better.add_reload_comment_button();
      }
      //console.log("#comments");
    });
    $("#inline-comments-modal").observe('childlist subtree', '.message', function(record) {
      if(wp_better_config.wattpad_enable_big_comment) {
        wp_better.autoresize('textarea');
      }
      if(wp_better_config.wattpad_enable_select) {
        wp_better.selection_enabled();
      }
      //console.log("#inline-comments-modal");
    });
  },
  add_profil_interraction: function(url) {
    if(wp_better_config.wattpad_enable_big_comment)
    {
      wp_better.autoresize('.message textarea');
      $('#profile-messages .collection').observe('childlist', function(record){
        wp_better.autoresize('.message textarea');
        //console.log("#profile-messages .collection");
      });
    }
    if(wp_better_config.wattpad_enable_auto_broadcast)
    {
      var broadcast = $('.broadcast-checkbox');
      if(broadcast.length > 0)
      {
        broadcast[0].setAttribute('checked', true);
      }
    }
  },
  add_reload_comment_button:function() {
    if(_.isUndefined($('#wb_reload_button')[0])) {
      $('#comments').prepend('<button id="wb_reload_button" class="btn">'+wp_better.translate("__MSG_contentRemoveCommentsStorage_")+'</button>');
      $('#wb_reload_button').on('click', function(){
        wp_better.cleanLocalStorage('comments');
        window.location.reload();
      });
    }
  },
  add_interline_comments_button: function(url) {
    $.ajax({
      url: url,
      dataType:'json'
    }).done(function(data) {
      if(!_.isUndefined(data.comments)) {
        for(c in data.comments){
          if(data.comments[c].paragraphId != null)
          {
            if(_.isUndefined($('#load_underline_comments')[0])){
              $('#comments').prepend('<button id="load_underline_comments" class="btn right">Placer les commentaires d\'interligne</button>');
            }
            $('#load_underline_comments').on('click', function(){
              if(!$(this).attr('isLoad')) {
                var partid = $($('#parts-container-new article.story-part')[0]).attr('data-part-id');
                wp_better.add_interline_comments("https://api.wattpad.com/v4/parts/"+partid+"/comments");
                $(this).attr('isLoad', true);
                $(this).hide();
              }
            })
            return true;
          }
        }
      }
      if(!_.isUndefined(data.nextUrl)){
        wp_better.add_interline_comments_button(data.nextUrl);
      }
    });
  },
  add_interline_comments: function(url) {
    $.ajax({
      url: url,
      dataType:'json'
    }).done(function(data) {
      if(!_.isUndefined(data.comments)) {
        for(c in data.comments){
          if(data.comments[c].paragraphId != null)
          {
            var com = data.comments[c];
            var p = $('p[data-p-id='+com.paragraphId+']').html();
            var open = '<span class="bw_overline">';
            var point = '<span style="font-size:10px;" aria-hidden="true" class="fa fa-circle-filled fa-wp-grey bw_comment_marker"></span><span class="bw_comment_contenair">';
            var comtxt = '<span class="bw_comment_on_text"><strong>'+com.author.name.strip_html()+' : </strong>'+com.body.strip_html()+'</span>';
            var close = '</span></span>';
            if(!_.isUndefined(p)) {
              if(p.indexOf('<span class="bw_overline">') > - 1) {
                var spanposition = p.indexOf('<span class="bw_comment_contenair">')+'<span class="bw_comment_contenair">'.length;
                p = p.insertAt(spanposition, comtxt);
              }
              else if(p.indexOf("data-media-type") > -1) {
                p.prepend(open+point+comtxt+close);
              }
              else if(p.indexOf("<b>") > -1 || p.indexOf("<br") > -1 || p.indexOf("<img") > -1) {
                p = open+p+point+comtxt+close;
              } else {
                p = p.insertAt(com.startPosition, open);
                p = p.insertAt(com.endPosition, point+comtxt+close);
              }
              $('p[data-p-id='+com.paragraphId.strip_html()+']').html(p);
            }
          }
        }
        $('span.bw_comment_marker').off('click').on('click', function(e){
          e.preventDefault();
          $(this).parent().find('span.bw_comment_contenair').toggle();
          $(this).parent().toggleClass('bw_overline_hover');
        });
      }
      if(!_.isUndefined(data.nextUrl)){
        wp_better.add_interline_comments(data.nextUrl);
      }
    });
  },
  buttons_generation: function() {
    var prevLink = $('#funbar-story li.active').prev().children('a:first').attr('href');
    var prevName = $('#funbar-story li.active').prev().children('a:first').html();
    var nextLink = $('#funbar-story li.active').next().children('a:first').attr('href');
    var nextName = $('#funbar-story li.active').next().children('a:first').html();

    var topFictionNavigation  = "<div id='topFictionNavigation' class='navigationOnFiction'>";

    if(!_.isUndefined(prevName)) {
      topFictionNavigation  = topFictionNavigation +
      "<a href='"+prevLink+"' class='on-navigate prevlink'>"+
      "<span style='font-size:16px;' aria-hidden='true' class='fa fa-left fa-wp-darkgrey next-up-icon pull-left'></span>"+
      "<div class='next-up-title'><span>"+prevName+"</span></div></a>";
    }
    if(!_.isUndefined(nextName)) {
      topFictionNavigation = topFictionNavigation + "<a href='"+nextLink+"' class='on-navigate nextlink'>"+
      "<span style='font-size:16px;' aria-hidden='true' class='fa fa-right fa-wp-darkgrey next-up-icon pull-right'></span>"+
      "<div class='next-up-title'><span>"+nextName+"</span></div></a>";
    }
    topFictionNavigation = topFictionNavigation + "</div>";

    if(!_.isUndefined(prevLink)){
      var bottomButton = '<a class="on-navigate" href="'+prevLink+'"><div class="orange bw_links_grey"><div class="next-up prev-part"><span>'+wp_better.translate("__MSG_contentPrevChapter_")+'</span><span class="fa fa-left fa-wp-white prev-up-icon" aria-hidden="true" style="font-size:16px;"></span></div></div></a>';
    }
    if(_.isUndefined($('.prev-up-icon')[0])) {
      $($('.part-navigation')[0]).append(bottomButton);
    }
    if(_.isUndefined($('#topFictionNavigation')[0])) {
      $($('header.panel-reading')[0]).append(topFictionNavigation);
    }
  },
  greaseMonkeyInitiation: function()
  {
    this.addStyleOnHead('ff', '#wb_reload_button{margin-bottom:10px;background:#F89B33;color:#fff}.navigationOnFiction{border-top:1px solid #ededed;border-bottom:1px solid #ededed;display:block;font-size:14px;font-weight:600;color:#717171;line-height:24px;width:80%;margin:auto;position:relative}#topFictionNavigation .next-up-icon,#topFictionNavigation .next-up-title{line-height:50px}#topFictionNavigation .next-up-title{padding:0 30px}#topFictionNavigation a{display:block;color:#717171}#topFictionNavigation a:hover{background-color:#ededed;text-decoration:none}#topFictionNavigation .prevlink{text-align:left;border-bottom:1px solid #ededed}#topFictionNavigation .nextlink{text-align:right}.navigationOnFiction .bw_links span{color:#717171;font-size:14px;padding-top:0}.part-title{margin-bottom:10px}.navigationOnFiction .bw_links{position:absolute;display:flex;width:auto;color:#717171;top:10px}div.meta{border-bottom:none!important}.bw_links .fa-right{position:absolute;right:0;top:4px}.bw_links .fa-left{position:absolute;left:0;top:4px}.bw_links_left .next-up-title{text-align:left!important;margin-left:20px}.bw_bottom_links,.bw_links_right{text-align:right}.bw_links_right .next-up-title{margin-right:20px}.bw_links_right{border-top:none!important;right:0}#story-reading #parts-container-new footer .orange.bw_links_grey{color:#444!important;background-color:#DDD;border-color:#DDD}.bw_links_left{left:0}.bw_bottom_links .next-up-title{text-align:right;width:97%}.prev-up-icon{position:absolute;left:-14px;top:16px}.bw_comment_contenair,.bw_comment_marker{position:absolute;left:100%;line-height:15px}.next-up-icon{right:-14px}.part-navigation .orange{margin-bottom:5px}.bw_comment_contenair{font-size:.8em;color:grey;font-style:italic;width:50%;padding:10px 10px 30px;display:none;z-index:100;background:#fff}.bw_overline_hover{background-color:#eee}.bw_comment_marker{cursor:pointer;padding-left:15px;z-index:110}.bw_comment_on_text{display:block}');
  },
  selection_enabled :function ()
  {
    $(".page").bind('copy', function(e) {
      e.stopPropagation();
    });
    $('.page').bind("contextmenu", function(e) {
      e.stopPropagation();
    });
    var elements = $('.panel-reading');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.MozUserSelect = 'text';
      elements[i].style.WebkitUserSelect = 'text';
      elements[i].style.MsUserSelect = 'text';
    }
    $('#inline-comments-modal').bind('copy', function(e) {
      e.stopPropagation();
    });
    $('#inline-comments-modal').bind("contextmenu", function(e) {
      e.stopPropagation();
    });
    var elements = $('.comments-modal-body');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.MozUserSelect = 'text';
      elements[i].style.WebkitUserSelect = 'text';
      elements[i].style.MsUserSelect = 'text';
    }
  },
  autoresize: function(selector){
    autosize($(selector));
  },
  addStyleOnHead : function(id, style)
  {
    var node = document.createElement('style');
    var css = document.createTextNode(style);
    node.setAttribute('id', id);
    node.appendChild(css);
    document.getElementsByTagName('head')[0].appendChild(node);
  },
  cleanLocalStorage: function (local_storage_key_to_find)
  {
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      if(localStorage.getItem( localStorage.key( i ) ) != null ){
        if(localStorage.key( i ).indexOf(local_storage_key_to_find) > -1)
        {
          localStorage.removeItem(localStorage.key(i));
        }
      }
    }
  },
  autolink: function(elements)
  {
    var link_plain_expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    elements.each(function(){
      if ($(this).prop("tagName") != "header" && $(this).prop("tagName") != "footer"){
        $(this).html(wp_better.urlify($(this).html(), link_plain_expression));
      }
    })
  },
  urlify : function(text, expression) {
    var regex = new RegExp(expression);
    if(text.match(regex)){
      var link_anchor_expression = /href="([^\'\"]+)/gi;
      var src_anchor_expression = /src="([^\'\"]+)/gi;
      if(!text.match(link_anchor_expression) && !text.match(src_anchor_expression)){
        return text.replace(regex, function (match) {
          return '<a target=\'_blank\' href=\'' + match.replace("&nbsp", "").trim() + '\'>' + match + '</a>';
        });
      }
    }
    return text;
  },
  translate: function(text){
    var regex = new RegExp(/(__MSG_)[^<]*(_)/g);
    if(navigator.sayswho.indexOf('Chrome') > -1)
    {
      if(text.match(regex)){
        return text.replace(regex, function (match) {
          var key = match.substring(0, match.length - 1).replace('__MSG_','');
          if(chrome.i18n.getMessage(key))
            return chrome.i18n.getMessage(key);
          else
            return "Error on translation data (WattPad Better Plugin). Please reload the page and contact plugin author if this bug persist";
        });
      }
      return text;
    } else if(navigator.sayswho.indexOf('Firefox') > -1 && !_.isUndefined(wpb_translations)) {
      if(text.match(regex)){
        return text.replace(regex, function (match) {
          var key = match.substring(0, match.length - 1).replace('__MSG_','');
          var lang = window.navigator.language;
          if(wpb_translations[lang])
            return (wpb_translations[lang][key])? wpb_translations[lang][key].message : 'undefined';
          else
            return (wpb_translations["en"][key])? wpb_translations["en"][key].message : 'undefined';
        });
      }
    }
  }
}
String.prototype.insertAt=function(index, string) {
  return this.substr(0, index) + string + this.substr(index);
}
String.prototype.strip_html=function() {

  return this.replace(/(<([^>]+)>)/ig, '');
}
navigator.sayswho= (function(){
  var ua= navigator.userAgent, tem,
  M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE '+(tem[1] || '');
  }
  if(M[1]=== 'Chrome'){
    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
    if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  return M.join(' ');
})();
$.extend(wp_better_config);
$.extend(wp_better);

wp_better_config.getConfiguration();

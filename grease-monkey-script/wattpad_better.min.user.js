// ==UserScript==
// @name         Better WattPad
// @namespace    http://cestdoncvrai.fr/
// @version      0.3
// @author       Alinoee
// @match        https://www.wattpad.com/*
// @grant        none
// ==/UserScript==

/*
	START CONFIGURATION
*/
var bw_ENABLE_JUSTIFY = true; // true -> justifie text on fiction // false -> default comportment
var bw_ENABLE_SELECT = true; // true -> enable selection on fiction // false -> default comportment
var bw_ENABLE_COMMENT_IN_BIG = true; // true -> auto-resize comment and other text fields // false -> default comportment (use scroll bar)
var bw_ENABLE_AUTO_LINK = true; // true -> make all links on fiction clikable // false -> default comportment
var bw_INDENT = 0; // 0 : no indentation (default comportement) // 1 : 1em indentation // 2 : 2em indentation ...etc.
var bw_ENABLE_BROADCAT_AUTO = true; // true -> check "notify my user" // false -> default comportment
var bw_ENABLE_LOCAL_STORAGE_GESTION=true;  // true display button to update notifications // false -> no button... no notifications !

/*
	START CORE - DO NOT MODIFIE
*/
// Addlibrary
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);c=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),f="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(f)&&(f=0),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,c=t,u&&(e.style.overflowY=t),o()}function o(){var t=window.pageYOffset,n=document.body.scrollTop,o=e.style.height;e.style.height="auto";var i=e.scrollHeight+f;return 0===e.scrollHeight?void(e.style.height=o):(e.style.height=i+"px",v=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;o();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==c&&n("visible"):"hidden"!==c&&n("hidden"),t!==e.style.height){var r=document.createEvent("Event");r.initEvent("autosize:resized",!0,!1),e.dispatchEvent(r)}}var d=void 0===arguments[1]?{}:arguments[1],s=d.setOverflowX,l=void 0===s?!0:s,a=d.setOverflowY,u=void 0===a?!0:a;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!r.has(e)){var f=null,c=null,v=e.clientWidth,p=function(){e.clientWidth!==v&&i()},h=function(t){window.removeEventListener("resize",p,!1),e.removeEventListener("input",i,!1),e.removeEventListener("keyup",i,!1),e.removeEventListener("autosize:destroy",h,!1),e.removeEventListener("autosize:update",i,!1),r["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",h,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i,!1),window.addEventListener("resize",p,!1),e.addEventListener("input",i,!1),e.addEventListener("autosize:update",i,!1),r.add(e),l&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function o(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var r="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),d=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(d=function(e){return e},d.destroy=function(e){return e},d.update=function(e){return e}):(d=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},d.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},d.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=d});

//Translations

function translate(text) {
  var regex = new RegExp(/(__MSG_)[^<]*(_)/g);
  if(text.match(regex)){
    return text.replace(regex, function (match) {
      var key = match.substring(0, match.length - 1).replace('__MSG_','');
      var lang = window.navigator.language;
      return (dic[lang][key])? dic[lang][key].message : 'undefined';
    });
  }
	return text;
}


var dic = {
  "en": {
    "contentRemoveNotificationStorage": {"message": "Load new notifications"},
    "contentRemoveCommentsStorage": {"message": "Load new comments"}
  },
  "fr": {
    "contentRemoveNotificationsStorage": {"message": "Charger les nouvelles notifications"},
    "contentRemoveCommentsStorage": {"message": "Charger les nouveaux commentaires"}
  }
}
bw_addStyleOnHead('wem_generality', '#wb_reload_button{margin-bottom:10px; background:#F89B33;color:#fff}');

//CORE
function profil_contoller(){bw_ENABLE_BROADCAT_AUTO&&document.getElementById("profile-messages")&&new MutationObserver(function(e,t){var n=document.querySelectorAll(".broadcast-checkbox");n.length>0&&(t.disconnect(),n[0].setAttribute("checked",!0))}).observe(document.getElementById("profile-messages"),{childList:!0,subtree:!0}),bw_ENABLE_COMMENT_IN_BIG&&document.getElementById("profile-messages")&&(launch_autoresize_mo("profile-messages","#profile-messages textarea"),launch_autoresize_mo_dynamic("#profile-messages .activity-feed div.collection","#profile-messages textarea"))}function local_storage_remove_button(e,t,n){if(!document.getElementById("wb_reload_button")){var o=document.createElement("button");o.setAttribute("id","wb_reload_button"),o.setAttribute("class","btn"),o.innerHTML=translate("__MSG_"+n+"_");var a=document.getElementById(e);a.insertBefore(o,a.childNodes[0]),o.addEventListener("click",function(e){local_storage_remove(t),window.location.reload()})}}function local_storage_remove(e){for(var t=0,n=localStorage.length;n>t;++t)null!=localStorage.getItem(localStorage.key(t))&&localStorage.key(t).indexOf(e)>-1&&localStorage.removeItem(localStorage.key(t))}function launch_autoresize_mo(e,t){new MutationObserver(function(e,n){autosize(document.querySelectorAll(t)),n.disconnect()}).observe(document.getElementById(e),{childList:!0,subtree:!0})}function launch_autoresize_mo_dynamic(e,t){var n=document.querySelectorAll(e);if(n.length>0)for(var o=0;o<n.length;o++)new MutationObserver(function(e,n){autosize(document.querySelectorAll(t))}).observe(n[o],{childList:!0})}function bw_is_listened_mutation(e,t,n){var t=t?t:"HTML BODY",n=n?n:"advertisement skyscraper";return e.target.className.indexOf(n)>-1?!0:t.indexOf(e.target.nodeName)>-1?!0:!1}function bw_addStyleOnHead(e,t){var n=document.createElement("style"),o=document.createTextNode(t);n.setAttribute("id",e),n.appendChild(o),document.getElementsByTagName("head")[0].appendChild(n)}function bw_hasClass(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>-1}function bw_countLink(e,t){var n=new RegExp(t);return e.match(n)?e.match(n).length:0}function bw_urlify(e,t){var n=new RegExp(t);return e.match(n)?e.replace(n,function(e){return"<a target='_blank' href='"+e+"'>"+e+"</a>"}):e}var bw_is_fiction_page=!1,bw_ignore_event=!1,bw_is_notif_page=!1,bw_is_profil_page=!1,better_wattpad_init=function(e,t){e.forEach(function(e){bw_listen_mutation=bw_is_listened_mutation(e),bw_is_fiction_page=bw_hasClass(document.getElementsByTagName("body")[0],"route-storyReading"),bw_is_profil_page=bw_hasClass(document.getElementsByTagName("body")[0],"route-userProfile"),bw_is_notif_page=bw_hasClass(document.getElementsByTagName("body")[0],"route-notifications")}),bw_ENABLE_LOCAL_STORAGE_GESTION&&bw_is_notif_page&&local_storage_remove("notifications"),bw_listen_mutation&&bw_is_fiction_page&&new MutationObserver(function(e,t){if(e.forEach(function(e){bw_listen_mutation2=bw_is_listened_mutation(e,"DIV","post-comment")}),bw_listen_mutation2&&document.getElementById("story-reading")){if(t.disconnect(),bw_ENABLE_SELECT)for(var n=document.getElementsByClassName("panel-reading"),o=0;o<n.length;o++)n[o].style.MozUserSelect="text",n[o].style.WebkitUserSelect="text",n[o].style.MsUserSelect="text";if(bw_ENABLE_AUTO_LINK)for(var a=/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi,i=/href="([^\'\"]+)/gi,r=document.getElementsByClassName("panel-reading"),o=0;o<r.length;o++)if("HEADER"!=r[o].nodeName&&"FOOTER"!=r[o].nodeName){var s=bw_countLink(r[o].innerHTML,a);s>0&&s>bw_countLink(r[o].innerHTML,i)&&(r[o].innerHTML=bw_urlify(r[o].innerHTML,a))}if(bw_ENABLE_JUSTIFY&&!document.getElementById("wem_justify")&&bw_addStyleOnHead("wem_justify","#story-reading .page p {text-align:justify}"),bw_INDENT>0&&!document.getElementById("wem_indent")&&bw_addStyleOnHead("wem_indent","#story-reading .page p {text-indent:"+bw_INDENT+"em!important;}"),bw_ENABLE_COMMENT_IN_BIG&&document.getElementById("comments")){launch_autoresize_mo("comments","#comments textarea");var l=document.querySelectorAll(".replies-list");if(l.length>0)for(var o=0;o<l.length;o++)new MutationObserver(function(e,t){bw_hasClass(e[0].target,"in")&&launch_autoresize_mo("comments","#comments textarea")}).observe(l[o],{attributes:!0,childList:!0,attributeFilter:["class"]})}bw_ENABLE_LOCAL_STORAGE_GESTION&&local_storage_remove_button("comments","comments","contentRemoveCommentsStorage")}}).observe(document.body,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["class"]}),bw_is_profil_page&&(profil_contoller(),new MutationObserver(function(e,t){profil_contoller()}).observe(document.getElementById("content"),{attributes:!0,childList:!0,attributeFilter:["class"]})),bw_ENABLE_COMMENT_IN_BIG&&document.getElementById("commentform")&&launch_autoresize_mo("commentform","#commentform textarea")};new MutationObserver(better_wattpad_init).observe(document.body,{attributes:!0,childList:!0,attributeFilter:["class"]});
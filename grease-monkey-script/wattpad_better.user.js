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

// CORE

var bw_is_fiction_page = false;
var bw_ignore_event = false;
var bw_is_notif_page = false;
var bw_is_profil_page = false;

var better_wattpad_init = function init(m, ob) {
  m.forEach(function (mutation) {
      bw_listen_mutation = bw_is_listened_mutation(mutation);
      bw_is_fiction_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-storyReading');
      bw_is_profil_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-userProfile');
      bw_is_notif_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-notifications');
  });
  if(bw_ENABLE_LOCAL_STORAGE_GESTION && bw_is_notif_page)
  {
      local_storage_remove('notifications');
  }
  if (bw_listen_mutation && bw_is_fiction_page)
  {
    new MutationObserver(function(m, ob) {
      m.forEach(function (mutation) {
          bw_listen_mutation2 = bw_is_listened_mutation(mutation, "DIV", "post-comment");
      });
      if(bw_listen_mutation2 && document.getElementById('story-reading'))
      {
        ob.disconnect();
        if (bw_ENABLE_SELECT)
        {
          var elements = document.getElementsByClassName('panel-reading');
          for (var i = 0; i < elements.length; i++) {
            elements[i].style.MozUserSelect = 'text';
            elements[i].style.WebkitUserSelect = 'text';
            elements[i].style.MsUserSelect = 'text';
          }
        }
        if (bw_ENABLE_AUTO_LINK)
        {
          var link_plain_expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
          var link_anchor_expression = /href="([^\'\"]+)/gi;
          var panels_readings = document.getElementsByClassName('panel-reading');
          for (var i = 0; i < panels_readings.length; i++) {
            if (panels_readings[i].nodeName != 'HEADER' && panels_readings[i].nodeName != 'FOOTER') {
              var count_plain_links = bw_countLink(panels_readings[i].innerHTML, link_plain_expression);
              if (count_plain_links > 0 && count_plain_links > bw_countLink(panels_readings[i].innerHTML, link_anchor_expression))
              {
                  panels_readings[i].innerHTML = bw_urlify(panels_readings[i].innerHTML, link_plain_expression);
              }
            }
          }
        }
        if (bw_ENABLE_JUSTIFY && !document.getElementById('wem_justify'))
        {
          bw_addStyleOnHead('wem_justify', '#story-reading .page p {text-align:justify}');
        }
        if (bw_INDENT > 0 && !document.getElementById('wem_indent'))
        {
          bw_addStyleOnHead('wem_indent', '#story-reading .page p {text-indent:' + bw_INDENT + 'em!important;}');
        }
        if (bw_ENABLE_COMMENT_IN_BIG)
        {
          if(document.getElementById('comments')) {
            launch_autoresize_mo("comments",'#comments textarea');
            //Lazy Loading on response
            var feeds = document.querySelectorAll(".replies-list");
            if(feeds.length > 0) {
              for (var i = 0; i< feeds.length; i++) {
                new MutationObserver(function(m, ob){
                  if(bw_hasClass(m[0].target, 'in'))
                  {
                      launch_autoresize_mo("comments",'#comments textarea');
                  }
                }).observe(feeds[i], {attributes:true,childList:true,attributeFilter :["class"]});
              }
            }
          }
        }
        if(bw_ENABLE_LOCAL_STORAGE_GESTION)
        {
          local_storage_remove_button('comments', 'comments', "contentRemoveCommentsStorage");
          //local_storage_remove('comments');
        }
      }
    }).observe(document.body, { attributes: true, childList:true, subtree:true, attributeFilter: ['class']});
  }
  if(bw_is_profil_page)
  {
    //on loading page
    profil_contoller();
    //On changing sub categorie
    new MutationObserver(function(m, ob){
      profil_contoller();
    }).observe(document.getElementById('content'), { attributes: true, childList:true, attributeFilter: ['class']});
  }
  if (bw_ENABLE_COMMENT_IN_BIG)
  {
    if(document.getElementById('commentform'))
    {
      launch_autoresize_mo("commentform",'#commentform textarea');
    }
  }
};

/*
 Launch observer
*/
new MutationObserver(better_wattpad_init).observe(document.body, {
  attributes: true,
  childList:true,
  attributeFilter: [
    'class'
  ]
});

function profil_contoller()
{
  if(bw_ENABLE_BROADCAT_AUTO)
  {
    if(document.getElementById('profile-messages')){
      new MutationObserver(function(m,ob) {
        var broadcast = document.querySelectorAll(".broadcast-checkbox");
        if(broadcast.length > 0)
        {
          ob.disconnect();
          broadcast[0].setAttribute('checked', true);
        }
      }).observe(document.getElementById('profile-messages'), {childList:true, subtree:true});
    }
  }
  if (bw_ENABLE_COMMENT_IN_BIG)
  {
    if(document.getElementById('profile-messages'))
    {
      launch_autoresize_mo("profile-messages",'#profile-messages textarea')
      launch_autoresize_mo_dynamic('#profile-messages .activity-feed div.collection','#profile-messages textarea')
    }
  }
}

/* UTILS FUNCTIONS */
function local_storage_remove_button(parent_contenair_id, local_storage_key_to_find, button_txt) {
    //Insert comment button
    if(!document.getElementById('wb_reload_button')) {
      var bw_button = document.createElement('button');
      bw_button.setAttribute('id', 'wb_reload_button');
      bw_button.setAttribute('class', 'btn');
      bw_button.innerHTML = translate("__MSG_"+button_txt+"_");
      var contenair = document.getElementById(parent_contenair_id);
      contenair.insertBefore(bw_button, contenair.childNodes[0]);
      bw_button.addEventListener("click", function(event) {
          local_storage_remove(local_storage_key_to_find);
          window.location.reload();
      });
    }
}
function local_storage_remove(local_storage_key_to_find)
{
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      if(localStorage.getItem( localStorage.key( i ) ) != null ){
        if(localStorage.key( i ).indexOf(local_storage_key_to_find) > -1)
        {
          localStorage.removeItem(localStorage.key(i));
        }
      }
    }
}
function launch_autoresize_mo(contenair_selector, field_selector)
{
  //On page initatio
    new MutationObserver(function(m, ob){
      autosize(document.querySelectorAll(field_selector));
      ob.disconnect();
  }).observe(document.getElementById(contenair_selector), {
    childList:true,
    subtree: true
  });
}
function launch_autoresize_mo_dynamic(contenair_selector, field_selector)
{
  //On content load
  var feeds = document.querySelectorAll(contenair_selector);
  if(feeds.length > 0) {
    for (var i = 0; i< feeds.length; i++) {
      new MutationObserver(function(m, ob){
          autosize(document.querySelectorAll(field_selector));
      }).observe(feeds[i], {
        childList:true
      });
    }
  }
}
function bw_is_listened_mutation(m, listen_element_mutation, class_name) {
  var listen_element_mutation = (listen_element_mutation) ? listen_element_mutation : "HTML BODY";
  var class_name = (class_name) ? class_name : "advertisement skyscraper";
  if(m.target.className.indexOf(class_name) > -1)
    return true
  if(listen_element_mutation.indexOf(m.target.nodeName) > -1)
    return true;
  return false;
}
function bw_addStyleOnHead(id, style)
{
  var node = document.createElement('style');
  var css = document.createTextNode(style);
  node.setAttribute('id', id);
  node.appendChild(css);
  document.getElementsByTagName('head') [0].appendChild(node);
}
function bw_hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > - 1;
}
function bw_countLink(text, expression)
{
  var regex = new RegExp(expression);
  if (text.match(regex)) {
    return text.match(regex).length;
  }
  return 0;
}
function bw_urlify(text, expression) {
  var regex = new RegExp(expression);
  if(text.match(regex)){
    return text.replace(regex, function (match) {
      return '<a target=\'_blank\' href=\'' + match + '\'>' + match + '</a>';
    });
  }
  return text;
}

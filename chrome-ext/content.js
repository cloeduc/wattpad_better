var bw_ENABLE_JUSTIFY = true;
var bw_ENABLE_SELECT = true;
var bw_ENABLE_COMMENT_IN_BIG = true;
var bw_ENABLE_AUTO_LINK = true;
var bw_ENABLE_BROADCAT_AUTO = true;
var bw_ENABLE_LOCAL_STORAGE_GESTION = true;
var bw_INDENT = 0;
var bw_ENABLE_ADDITIONNAL_LINK = true;

chrome.storage.sync.get("wattpad_enable_select", function(result) {
	bw_ENABLE_SELECT = result.wattpad_enable_select;
});

chrome.storage.sync.get("wattpad_enable_justify", function(result) {
	bw_ENABLE_JUSTIFY = result.wattpad_enable_justify;
});

chrome.storage.sync.get("wattpad_enable_big_comment", function(result) {
	bw_ENABLE_COMMENT_IN_BIG = result.wattpad_enable_big_comment;
});

chrome.storage.sync.get("wattpad_enable_links", function(result) {
	bw_ENABLE_AUTO_LINK = result.wattpad_enable_links;
});

chrome.storage.sync.get("wattpad_enable_alinea", function(result) {
	bw_INDENT = result.wattpad_enable_alinea;
});

chrome.storage.sync.get("wattpad_enable_auto_broadcast", function(result) {
  bw_ENABLE_BROADCAT_AUTO = result.wattpad_enable_auto_broadcast;
});

chrome.storage.sync.get("wattpad_enable_local_storage_gestion", function(result) {
  bw_ENABLE_LOCAL_STORAGE_GESTION = result.wattpad_enable_local_storage_gestion;
});

chrome.storage.sync.get("wattpad_enable_additional_links", function(result) {
  bw_ENABLE_ADDITIONNAL_LINK = result.wattpad_enable_additional_links;
});

function translate(text) {
  var regex = new RegExp(/(__MSG_)[^<]*(_)/g);
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
}

var bw_is_fiction_page = false;
var bw_ignore_event = false;
var bw_is_notif_page = false;
var bw_is_profil_page = false;
var previouslink = false;
var nextlink =false ;

var better_wattpad_init = function init(m, ob) {
  m.forEach(function (mutation) {
      bw_listen_mutation = bw_is_listened_mutation(mutation);
      bw_is_fiction_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-storyReading');
      bw_is_profil_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-userProfile');
      bw_is_notif_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-notifications');
  });
  //event on notification link

  var dropdownbutton = document.querySelectorAll('#profile-dropdown li a');
  for(var di =0; di < dropdownbutton.length; di++)
    {
      if(dropdownbutton[di].getAttribute('href')=="/notifications"){
        dropdownbutton[di].addEventListener('click', function() {local_storage_remove('notifications')});
      }
    }
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
        if(bw_ENABLE_ADDITIONNAL_LINK) {
          var alreadyLinked =  document.querySelectorAll('header.panel-reading a.next-part');
          if(alreadyLinked.length == 0) {
            var funbarlist = document.querySelectorAll('#funbar-story ul.table-of-contents li');
            var topOfFiction = document.querySelectorAll('header.panel-reading');
            topOfFiction = topOfFiction[0];

            var bottomOfFiction = document.querySelectorAll('#footer .next-part');
            bottomOfFiction = bottomOfFiction[0];
            for(var fi = 0; fi < funbarlist.length; fi++) {
              if(funbarlist[fi].className == "active") {
                previouslink = (funbarlist[fi-1])? funbarlist[fi-1] : false;
                nextlink = (funbarlist[fi+1])? funbarlist[fi+1] : false;
              }
            }
            if(previouslink || nextlink) {
              var topFictionNavigation = document.createElement('div');
              topFictionNavigation.setAttribute('id', 'topFictionNavigation');
              topOfFiction.appendChild(topFictionNavigation);
            }
            if(previouslink) {
              var topPrevElement = additionalLink(previouslink.children[0], "left");
              var bottomPrevElement = additionalLink(previouslink.children[0], "right", true);
              topFictionNavigation.appendChild(topPrevElement);
              document.getElementById('footer').insertBefore(bottomPrevElement, bottomOfFiction);
            }
            if(nextlink) {
              var toNextElement = additionalLink(nextlink.children[0], "right");
              topFictionNavigation.appendChild(toNextElement);
            }
          }
        }
        //On page loading
        if (bw_ENABLE_SELECT)
        {
          selection_enabled();
        }
        if (bw_ENABLE_AUTO_LINK)
        {
          autolink();
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
        //Observe lazyloading pages part
        var pages= document.querySelectorAll('div.part-content');
        for(var pi = 0; pi<pages.length; pi++) {
          if(pages[pi]){
          new MutationObserver(function(){
            if (bw_ENABLE_SELECT)
            {
              selection_enabled();
            }
            if (bw_ENABLE_AUTO_LINK)
            {
              autolink();
            }
            }).observe(pages[pi], {childList:true});
          }
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


if(window.location.href.indexOf("www.wattpad.com") > -1 ){
  new MutationObserver(better_wattpad_init).observe(document.body, {
    attributes: true,
    childList:true,
    attributeFilter: [
      'class'
    ]
  });
}

function additionalLink(inspirationLink, orientation, withtitle) {
  var element = document.createElement('a');
  element.setAttribute('href',  inspirationLink.getAttribute('href'));
  if(withtitle) {
    element.setAttribute('class', 'on-navigate next-up next-part bw_bottom_links');
    element.innerHTML = translate('<span style="font-size:16px;" aria-hidden="true" class="fa fa-left fa-wp-darkgrey next-up-icon pull-left"></span><div class="next-up-title"><div>__MSG_contentPrevChapter_</div><h6>'+previouslink.children[0].innerHTML+'</h6></div>')
  }
  else {
    element.setAttribute('class', 'on-navigate next-up next-part bw_links bw_links_'+orientation);
    element.innerHTML = '<span style="font-size:16px;" aria-hidden="true" class="fa fa-'+orientation+' fa-wp-darkgrey next-up-icon pull-'+orientation+'"></span><div class="next-up-title">'+inspirationLink.innerHTML+'</div>';
  }
  return element;
}

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

function selection_enabled()
{
  var elements = document.getElementsByClassName('panel-reading');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.MozUserSelect = 'text';
    elements[i].style.WebkitUserSelect = 'text';
    elements[i].style.MsUserSelect = 'text';
  }
}
function autolink()
{
  var link_plain_expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var link_anchor_expression = /href="([^\'\"]+)/gi;
  var src_anchor_expression = /src="([^\'\"]+)/gi;
  var panels_readings = document.getElementsByClassName('panel-reading');
  for (var i = 0; i < panels_readings.length; i++) {
    if (panels_readings[i].nodeName != 'HEADER' && panels_readings[i].nodeName != 'FOOTER') {
      var count_plain_links = bw_countLink(panels_readings[i].innerHTML, link_plain_expression);
      if (count_plain_links > 0 && count_plain_links > (bw_countLink(panels_readings[i].innerHTML, link_anchor_expression)+bw_countLink(panels_readings[i].innerHTML, src_anchor_expression)))
      {
          panels_readings[i].innerHTML = bw_urlify(panels_readings[i].innerHTML, link_plain_expression);
      }
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
      var imgregex = new RegExp(/\.(?:jpe?g|gif|png)$/);
      if(match.match(imgregex)) {
        var pages = document.getElementsByClassName('panel-reading');
        var mw = pages[0].offsetWidth - 20;
        return '<div style="display:block;width:100%;height:auto;padding-top:5px;padding-bottom:5px;"><img src="'+ match + '" style="max-width='+mw+';max-height=400"></div>';
      } else {
        return '<a target=\'_blank\' href=\'' + match + '\'>' + match + '</a>';
      }
    });
  }
  return text;
}
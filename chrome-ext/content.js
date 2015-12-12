var bw_ENABLE_JUSTIFY = false;
var bw_ENABLE_SELECT = false;
var bw_ENABLE_COMMENT_IN_BIG = false;
var bw_ENABLE_AUTO_LINK = false;
var bw_INDENT = 0;

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


var bw_is_fiction_page = false;
var bw_ignore_event = false;
var better_wattpad_init = function init(m, ob) {
  m.forEach(function (mutation) {
      bw_listen_mutation = bw_is_listened_mutation(mutation);
        bw_is_fiction_page = bw_hasClass(document.getElementsByTagName('body')[0], 'route-storyReading');
  });
  if (bw_listen_mutation && bw_is_fiction_page) {
    if (bw_ENABLE_JUSTIFY && !document.getElementById('wem_justify'))
    {
      bw_addStyleOnHead('wem_justify', '#story-reading .page p {text-align:justify}');
    }
    if (bw_INDENT > 0 && !document.getElementById('wem_indent'))
    {
      bw_addStyleOnHead('wem_indent', '#story-reading .page p {text-indent:' + bw_INDENT + 'em!important;}');
    }
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
            if (ob) {
              ob.disconnect();
              panels_readings[i].innerHTML = bw_urlify(panels_readings[i].innerHTML, link_plain_expression);
              ob.observe(document.body, {
                childList: true,
                subtree: true
              });
            }
          }
        }
      }
    }
  }
  if (bw_ENABLE_COMMENT_IN_BIG)
  {
    autosize(document.querySelectorAll('.message-replies textarea'));
    autosize(document.querySelectorAll('#commentform textarea'));
    autosize(document.querySelectorAll('#comments textarea'));
    autosize(document.querySelectorAll('.activity-feed textarea'));
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
/* UTILS FUNCTIONS */

function bw_is_listened_mutation(m) {
  var listen_element_mutation = "HTML BODY";
  if(m.target.className.indexOf("advertisement skyscraper") > -1)
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


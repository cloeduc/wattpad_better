String.prototype.toTitleCase = function() {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

jQuery(document).ready(function(){
  translate();
  var userLang = navigator.language || navigator.userLanguage;
  /*Load News*/
  $.ajax({
    dataType: "json",
    url: 'news.json',
    success: function(data){
      userLang = data[userLang]? userLang: "en";
      var langNews=data[userLang];
      for(var n in langNews.news)
      {
        var news = langNews.news[n];
        news.img = (news.img)?news.img:'img/default.png'
        $('#newsFeed').append('<article><h4>'+news.title+'<span class="subtitle">'+news.date+'</span></h4><img src="'+news.img+'" width="50" heigth="50">'+news.content+'</article>')
      }
      chrome.storage.sync.get("wb_"+userLang+"_last_news_date",function(item){
        if(item && item["wb_"+userLang+"_last_news_date"] != langNews.lastUpdate)
        {
          $('#lastNewsLink').css({"color":"#ff9912", "font-weight":"bold"});
        }
      });
    }
  });
  $('#lastNewsLink').on('click', function(){
    $.ajax({
      dataType: "json",
      url: 'news.json',
      success: function(data) {
        userLang = data[userLang]? userLang: "en";
        var newDate = {};
        newDate["wb_"+userLang+"_last_news_date"] = data[userLang].lastUpdate;
        chrome.storage.sync.set(newDate);
        $('#lastNewsLink').css({"color":"", "font-weight":"normal"});
      }
    });
  })
  $('#wattpad_enable_save').on('click', function(){
    save_options();
  });
  chrome.tabs.getSelected(null, function(tab) {
    if(tab.url.indexOf("chrome://extensions/") > -1 || tab.url.indexOf("opera://extensions") > -1){
      $('#pageContainer').css({'margin-top':"40px"});
      $('.tabcontent').addClass('hide');
      $('#wbcHeader .tab').addClass('hide');
      $('#tabOptions').removeClass('hide');
    }
    else if(tab.url.indexOf("wattpad.com") == -1) {
      $('.tabcontent').addClass('hide');
      $('#wbcHeader .tab').addClass('hide');
      $('#workOnWattpadDisclamer').removeClass('hide');
    }
  });
  $('#wattpad_enable_save').on('click', function(){
    save_options();
  });
  $('.tablinks').on('click', function(){
    $('.tabcontent').addClass('hide');
    $('.tablinks').removeClass('active');
    $($(event.target).attr('href')).removeClass('hide');
    $(event.target).addClass('active');
    return false;
  });
  $('.refresh').on('click', function(){
    chrome.tabs.getSelected(null, function(tab) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(tab.id, {code: code});
    });
  });
  $('li.alinea').on('click', function(){
    $('li.alinea').removeClass('enabled');
    var target = $(event.target).addClass('enabled');
  });
  $('li.option').on('click', function(){
    var target = $(event.target).toggleClass('enabled');
    var parent = target.parent().toggleClass('enabled');
  });
});

// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.get({
    wattpad_enable_select: true,
    wattpad_enable_big_comment: true,
    wattpad_enable_justify: true,
    wattpad_enable_links:true,
    wattpad_enable_alinea:0,
    wattpad_enable_auto_broadcast:false,
    wattpad_enable_local_storage_gestion:false,
    wattpad_enable_additional_links:false

  }, function(items) {
    var saving = {};
    for(var i in items) {
      switch(i){
        case 'wattpad_enable_alinea':
        saving[i]=parseInt($('#alineaChoice li.enabled').attr('value'));
        break;
        default:
        saving[i]=$('#'+i).hasClass('enabled');
      }
    }
    chrome.storage.sync.set(saving, function(){
      var status = document.getElementById('savedStatus');
      status.textContent = chrome.i18n.getMessage('optionsSaved');
      setTimeout(function() {
        status.textContent = 'La page va se recharger...';
        setTimeout(function(){
          status.textContent = '';
          chrome.tabs.getSelected(null, function(tab) {
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {code: code});
          });
        }, 750);
      }, 750);
    });
  });
}

function restore_options() {
  chrome.storage.sync.get({
    wattpad_enable_select: true,
    wattpad_enable_big_comment: true,
    wattpad_enable_justify: true,
    wattpad_enable_links:true,
    wattpad_enable_alinea:0,
    wattpad_enable_auto_broadcast:false,
    wattpad_enable_local_storage_gestion:false,
    wattpad_enable_additional_links:false

  }, function(items) {
    for(var i in items) {
      var translateKey = i.replace(new RegExp('_', 'g'), ' ').toTitleCase().replace('Wattpad', 'options').replace(new RegExp(' ', 'g'), '');
      switch(i){
        case 'wattpad_enable_alinea':
        var html = '<li><strong data-message="'+translateKey+'"></strong><ul id="alineaChoice">';
        var textIndent = ['optionsEnableAlineaNone', 'optionsEnableAlineaSimple', 'optionsEnableAlineaDouble'];
        for(var j in textIndent)
        {
          var classes = (parseInt(items[i])==j)?'alinea enabled':'alinea';
          html += '<li class="'+classes+'" value="'+j+'" data-message="'+textIndent[j]+'"></li>';
        }
        html += '</ul></li>';
        $('#tabOptions #options').append(html);
        break;
        default:
        var classes=(items[i])?'option enabled':'option';
        $('#tabOptions #options').append('<li class="'+classes+'"><i></i><a href="#" id="'+i+'" class="'+classes+'" data-message="'+translateKey+'"></a></li>');
      }
    }
  });
}
function init(){
  restore_options();
}

function translate() {
  var objects = document.getElementsByTagName('*'), i;
  for(i = 0; i < objects.length; i++) {
    if (objects[i].dataset && objects[i].dataset.message) {
      objects[i].innerHTML = chrome.i18n.getMessage(objects[i].dataset.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);

function getselectedradio(el)
{
  for (i in el) {
    if (el[i].checked) {
      return el[i].value;
    }
  }
}

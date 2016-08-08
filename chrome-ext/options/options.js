// Saves options to chrome.storage
function save_options() {
  var wattpad_enable_select = document.getElementById('wattpad_enable_select').checked;
  var wattpad_enable_big_comment = document.getElementById('wattpad_enable_big_comment').checked;
  var wattpad_enable_justify = document.getElementById('wattpad_enable_justify').checked;
  var wattpad_enable_links = document.getElementById('wattpad_enable_links').checked;
  var wattpad_enable_alinea =  getselectedradio(document.getElementsByName('wattpad_enable_alinea'));
  var wattpad_enable_auto_broadcast =  document.getElementById('wattpad_enable_auto_broadcast').checked;
  var wattpad_enable_local_storage_gestion =  document.getElementById('wattpad_enable_local_storage_gestion').checked;
  var wattpad_enable_additional_links = document.getElementById('wattpad_enable_local_storage_gestion').checked;
  var wattpad_enable_paragraphe_comments = document.getElementById('wattpad_enable_paragraphe_comments').checked;

  chrome.storage.sync.set({
    wattpad_enable_select: wattpad_enable_select,
    wattpad_enable_big_comment: wattpad_enable_big_comment,
    wattpad_enable_justify:wattpad_enable_justify,
    wattpad_enable_links:wattpad_enable_links,
    wattpad_enable_alinea:wattpad_enable_alinea,
    wattpad_enable_auto_broadcast:wattpad_enable_auto_broadcast,
    wattpad_enable_local_storage_gestion:wattpad_enable_local_storage_gestion,
    wattpad_enable_additional_links:wattpad_enable_additional_links,
    wattpad_enable_paragraphe_comments:wattpad_enable_paragraphe_comments

  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = chrome.i18n.getMessage('optionsSaved');
    setTimeout(function() {
      status.textContent = '';
    }, 750);
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
    wattpad_enable_additional_links:false,
    wattpad_enable_paragraphe_comments:false,

  }, function(items) {
    document.getElementById('wattpad_enable_select').checked = items.wattpad_enable_select;
    document.getElementById('wattpad_enable_big_comment').checked = items.wattpad_enable_big_comment;
    document.getElementById('wattpad_enable_justify').checked = items.wattpad_enable_justify;
    document.getElementById('wattpad_enable_links').checked = items.wattpad_enable_links;
    document.getElementById('wattpad_enable_auto_broadcast').checked = items.wattpad_enable_auto_broadcast;
    document.getElementsByName('wattpad_enable_alinea')[items.wattpad_enable_alinea].checked = true;
    document.getElementById('wattpad_enable_local_storage_gestion').checked = items.wattpad_enable_local_storage_gestion;
    document.getElementById('wattpad_enable_additional_links').checked = items.wattpad_enable_additional_links;
    document.getElementById('wattpad_enable_paragraphe_comments').checked = items.wattpad_enable_paragraphe_comments;
  });
}
function init(){
  translate();
  restore_options();
  document.getElementById('wattpad_enable_save').addEventListener('click',save_options);
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
        console.log(el[i].value);
          return el[i].value;
      }
  }
}
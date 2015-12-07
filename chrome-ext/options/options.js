// Saves options to chrome.storage
function save_options() {
  var wattpad_enable_select = document.getElementById('wattpad_enable_select').checked;
  var wattpad_enable_big_comment = document.getElementById('wattpad_enable_big_comment').checked;
  var wattpad_enable_justify = document.getElementById('wattpad_enable_justify').checked;
  var wattpad_enable_links = document.getElementById('wattpad_enable_links').checked;

  chrome.storage.sync.set({
    wattpad_enable_select: wattpad_enable_select,
    wattpad_enable_big_comment: wattpad_enable_big_comment,
    wattpad_enable_justify:wattpad_enable_justify,
    wattpad_enable_links:wattpad_enable_links
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
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
    wattpad_enable_links:true
  }, function(items) {
    document.getElementById('wattpad_enable_select').checked = items.wattpad_enable_select;
    document.getElementById('wattpad_enable_big_comment').checked = items.wattpad_enable_big_comment;
    document.getElementById('wattpad_enable_justify').checked = items.wattpad_enable_justify;
    document.getElementById('wattpad_enable_links').checked = items.wattpad_enable_links;
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
    console.log(objects[i]);
    if (objects[i].dataset && objects[i].dataset.message) {
      objects[i].innerHTML = chrome.i18n.getMessage(objects[i].dataset.message);
    }
  }
}
document.addEventListener('DOMContentLoaded', init);
